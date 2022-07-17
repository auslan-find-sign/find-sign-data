import siteConfig from '$lib/site-config.json'
import tfq from 'tiny-function-queue'
import fs from 'node:fs/promises'
import nodePath from 'node:path'
import mimeDB from 'mime-db/db.json'
import { nanoid } from 'nanoid'
import { decode as decodeBase64 } from 'base64-arraybuffer'

// @ts-ignore
mimeDB['application/cbor'].extensions = ['cbor']

const extToMimeType = Object.fromEntries(
  Object.entries(mimeDB).flatMap(([type, obj]) =>
    'extensions' in obj ? obj.extensions.map(ext => [ext, type]) : []
  )
)

export type FileInfo = {
  name: string, // filename
  type: string, // inferred mimetype
  size: number, // file size in bytes
  lastModified: Date, // time when file was last modified,
  etag: string, // some unique string likely to change when file contents change
  created: Date, // time when file was created
  path: string, // full path to file
  isFile: boolean, // is this item a file?
  isFolder: boolean, // is this item a folder?
}

// if it's been stringified through json it looks like this
export type FileInfoJSON = {
  name: string, // filename
  type: string, // inferred mimetype
  size: number, // file size in bytes
  lastModified: string, // time when file was last modified,
  etag: string, // some unique string likely to change when file contents change
  created: string, // time when file was created
  path: string, // full path to file
  isFile: boolean, // is this item a file?
  isFolder: boolean, // is this item a folder?
}

export type BulkFiles = {
  [filePath: string]: BulkFileContents
}

export type BulkFileContents = BulkFileBase64Contents | BulkFileStringContents

type BulkFileBase64Contents = {
  encoding: 'base64',
  data: string
}

type BulkFileStringContents = {
  encoding: 'string',
  data: string
}

/** convert a file object or string path to an OS absolute path */
function fileToOSPath (file: FileInfo | string): string {
  if (typeof file === 'object' && typeof file.path === 'string') {
    return fileToOSPath(file.path)
  } else if (typeof file === 'string') {
    return nodePath.resolve(siteConfig.data, file)
  } else {
    throw new Error('invalid file path object')
  }
}

/** convert a string path to an array of segments */
function pathToSegments (path: string | FileInfo) {
  const p = typeof path === 'string' ? path : path.path
  return p.split('/')
}

/** returns an array of FileInfo objects */
export async function list (path: string | FileInfo): Promise<FileInfo[]> {
  const dirlist = await listStrings(path)

  return await Promise.all(dirlist.map(name => {
    const filePath = `${path}/${name}`
    return getInfo(filePath)
  }))
}

/** returns an array of strings for what's inside this path */
export async function listStrings (path: string | FileInfo): Promise<string[]> {
  const dirPath = fileToOSPath(path)
  const dirlist = await tfq.lockWhile('io', () => fs.readdir(dirPath))

  // sort with the nice natural number sorting
  var collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })
  return dirlist.sort(collator.compare)
}

/** read a file */
export async function read (path: string | FileInfo): Promise<Uint8Array> {
  const nodeBuffer = await tfq.lockWhile('io', () => fs.readFile(fileToOSPath(path)))
  return new Uint8Array(nodeBuffer.buffer, nodeBuffer.byteOffset, nodeBuffer.byteOffset + nodeBuffer.byteLength)
}

export async function readStream (path: string | FileInfo, { start = undefined, length = undefined }:{start?: number, length?: number} = {}): Promise<ReadableStream<Uint8Array>> {
  const handle: fs.FileHandle = await tfq.lockWhile('io', () =>
    fs.open(fileToOSPath(path), 'r')
  )

  let position = 0
  if (typeof start === 'number') position = start


  return new ReadableStream({
    async pull (controller) {
      let bytesRead, buffer
      try {
        ({ bytesRead, buffer } = await handle.read({ position }))
      } catch (err) {
        controller.error(err)
        await handle.close()
      }
      if (bytesRead > 0) {
        if (typeof length === 'number') {
          if (bytesRead > length) {
            controller.enqueue(buffer.slice(0, length))
            handle.close()
            controller.close()
            return
          }
          length -= bytesRead
        }
        position += bytesRead
        controller.enqueue(buffer.slice(0, bytesRead))
      } else {
        handle.close()
        controller.close()
      }
    },
    async cancel () {
      await handle.close()
    }
  })
}

/** rewrite the contents of a file, with no downtime (rename-over) */
export async function write (path: string | FileInfo, data: Uint8Array | string) {
  const tmpfile = nodePath.join(siteConfig.tempFolder, nanoid())
  await fs.writeFile(tmpfile, data)
  try {
    await tfq.lockWhile('io', () => fs.rename(tmpfile, fileToOSPath(path)))
  } catch (err) {
    const segments = pathToSegments(path)
    try {
      if (segments.length > 1) await ensureFolder(segments.slice(0, -1).join('/'))
      await tfq.lockWhile('io', () => fs.rename(tmpfile, fileToOSPath(path)))
    } catch (err2) {
      fs.rm(tmpfile) // tidy up temps
      throw err2
    }
  }
}

/** write an entire folder structure in one atomic action */
export async function bulkWrite (path: string | FileInfo, files: BulkFiles) {
  const tmpFolder = nodePath.resolve(nodePath.join(siteConfig.tempFolder, nanoid()))
  const segments = pathToSegments(path)
  await fs.mkdir(tmpFolder, { recursive: true })
  for (const filePath in files) {
    const fileSegments = pathToSegments(filePath)
    const fileOSPath = nodePath.resolve(nodePath.join(tmpFolder, ...fileSegments))
    if (!fileOSPath.startsWith(tmpFolder)) throw new Error('Security violation, file path unacceptable')
    let fileData: string | Uint8Array = files[filePath].data
    if (files[filePath].encoding === 'base64') fileData = new Uint8Array(decodeBase64(fileData))
    try {
      await fs.writeFile(fileOSPath, fileData)
    } catch (err) {
      // if write fails, try making sure the containing folder exists
      if (fileSegments.length > 1) {
        await fs.mkdir(nodePath.resolve(nodePath.join(tmpFolder, ...fileSegments.slice(0, -1))), { recursive: true })
        await fs.writeFile(fileOSPath, fileData)
      }
    }
  }

  // move the folder in to place
  const destinationOSPath = nodePath.resolve(nodePath.join(siteConfig.data, ...segments))
  if (await exists(path)) {
    // because node fs api doesn't allow swapping directory pointers, and most filesystems don't seem
    // to support it anyway, and it only is possible on relatively modern linux kernels, this crappy
    // workaround is needed, using locks to stall reads while non-atomic swap is done.
    const trashPath = destinationOSPath.replace(/\/([^\/]+)$/, `/#trash-${nanoid()}-$1`)
    await tfq.lockWhile('io', async () => {
      // this is why tfq is used, for fake atomic situations like this
      await fs.rename(destinationOSPath, trashPath)
      await fs.rename(tmpFolder, destinationOSPath)
    })
    fs.rm(trashPath, { recursive: true, force: true })
  } else {
    await tfq.lockWhile('io', () => fs.rename(tmpFolder, destinationOSPath))
  }
}

/** write a file with a randomly generated unique filename, returns string path */
export async function writeUnique (folder: string | FileInfo, data: string | Uint8Array, mimeType: string): Promise<string> {
  const ext: string = { extensions: ['bin'], ...(mimeDB[mimeType] || {}) }.extensions[0]
  const name = `${nanoid()}.${ext}`
  const path = `${folder}/${name}`
  await write(path, data)
  return path
}

/** append a string or byte array to a file, using read locks to prevent partial writes being read */
export async function append (path: string | FileInfo, data: Uint8Array | string) {
  const destination = fileToOSPath(path)
  try {
    await tfq.lockWhile('io', () => fs.appendFile(destination, data))
  } catch (err) {
    try {
      await ensureFolder(pathToSegments(path).slice(0, -1).join('/'))
      await tfq.lockWhile('io', () => fs.appendFile(destination, data))
    } catch (_) {
      throw err
    }
  }
}

/** delete a file or folder */
export async function remove (path: string | FileInfo) {
  const destination = fileToOSPath(path)
  await tfq.lockWhile('io', () => fs.rm(destination, { recursive: true, force: true, maxRetries: 100 }))
}

/** ensure a folder exists at the path, and all the parent folders above it */
export async function ensureFolder (path: string | FileInfo) {
  await fs.mkdir(fileToOSPath(path), { recursive: true })
}

/** does something exist at this path? */
export async function exists (path: string | FileInfo, kind?: 'file' | 'folder'): Promise<boolean> {
  try {
    const pathString = typeof path === 'string' ? path : path.path
    const osPath = fileToOSPath(pathString)
    const stats = await tfq.lockWhile('io', () => fs.stat(osPath))
    if (kind && kind === 'file') return stats.isFile()
    if (kind && kind === 'folder') return stats.isDirectory()
    return true
  } catch (err) {
    return false
  }
}

/** get FileInfo object for a path, or throw an error if it doesn't exist */
export async function getInfo (path: string | FileInfo): Promise<FileInfo> {
  const pathString = typeof path === 'string' ? path : path.path
  const osPath = fileToOSPath(pathString)
  const stats = await tfq.lockWhile('io', () => fs.stat(osPath))
  const info = {
    name: pathToSegments(pathString).at(-1),
    path: pathString,
    type: pathString.split('/').at(-1).includes('.') ? extToMimeType[pathString.split('.').at(-1)] || 'application/octet-stream' : 'application/octet-stream',
    size: stats.size,
    isFile: stats.isFile() || stats.isSymbolicLink(),
    isFolder: stats.isDirectory(),
    lastModified: stats.mtime,
    created: stats.ctime,
    etag: `"${Math.round(stats.mtimeMs).toString(36)}:${stats.ino}:${stats.size}"`
  }

  if (info.isFolder) {
    // recursively add file sizes and find latest mtime
    info.size = 0
    const walk = async (path) => {
      const listing = await tfq.lockWhile('io', () => fs.readdir(path, { withFileTypes: true }))
      for (const entry of listing) {
        if (entry.isDirectory()) {
          await walk(nodePath.join(path, entry.name))
        } else if (entry.isFile() || entry.isSymbolicLink()) {
          const stats = await tfq.lockWhile('io', () => fs.stat(nodePath.join(path, entry.name)))
          info.size += stats.size
          if (info.lastModified < stats.mtime){
            info.lastModified = stats.mtime
          }
        }
      }
    }

    await walk(fileToOSPath(info.path))
  }

  return info
}

/** check if a path is within another path */
export function isWithin (target: string, container: string): boolean {
  const targetOS = fileToOSPath(target)
  const containerOS = fileToOSPath(container)
  return targetOS.startsWith(containerOS + nodePath.sep)
}

/** make sure data and temp folders exist */
export async function initializeStorage () {
  try {
    await fs.mkdir(siteConfig.data, { recursive: true })
  } catch (err) {}

  try {
    await fs.mkdir(siteConfig.tempFolder, { recursive: true })
  } catch (err) {}
}
import siteConfig from '$lib/site-config.json'
import fs from 'node:fs/promises'
import { createReadStream, createWriteStream } from 'node:fs'
import PQueue from 'p-queue'
import nodePath from 'node:path'
import mimeDB from 'mime-db/db.json'
import { nanoid } from 'nanoid'
import streamAsyncIterator from './stream-to-async-iterator'
import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { ReadableStream } from 'node:stream/web'

// @ts-ignore
mimeDB['application/cbor'].extensions = ['cbor']
mimeDB['application/x-length-prefixed-vectors'] = {
  source: 'find-sign',
  extensions: ['lps'],
  compressible: true,
}

const extToMimeType = Object.fromEntries(
  Object.entries(mimeDB).flatMap(([type, obj]) =>
    'extensions' in obj ? obj.extensions.map(ext => [ext, type]) : []
  )
)

const serialQueue = new PQueue({ concurrency: 1 })
const parallelQueue = new PQueue({ concurrency: 100 })

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
  isCompressible: boolean, // is it worthwhile to try to compress this file?
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
  isCompressible: boolean, // is it worthwhile to try to compress this file?
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
  const dirlist = await serialQueue.add(() => fs.readdir(dirPath))

  // sort with the nice natural number sorting
  var collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })
  return dirlist.sort(collator.compare)
}

function toU8 (nodeBuffer: Buffer) {
  return new Uint8Array(nodeBuffer.buffer, nodeBuffer.byteOffset, nodeBuffer.byteOffset + nodeBuffer.byteLength)
}

/** read a file */
export async function read (path: string | FileInfo): Promise<Uint8Array> {
  const nodeBuffer = await serialQueue.add(() => fs.readFile(fileToOSPath(path)))
  return toU8(nodeBuffer)
}

export function readStream (path: string | FileInfo, { start = undefined, length = undefined }:{start?: number, length?: number} = {}): ReadableStream<Uint8Array> {
  return Readable.toWeb(createReadStream(fileToOSPath(path), {
    start: typeof start === 'number' ? start : 0,
    end: typeof length === 'number' ? (typeof start === 'number' ? start : 0) + length - 1 : Infinity
  }))
}

/** rewrite the contents of a file, with no downtime (rename-over) */
export async function write (path: string | FileInfo, data: Uint8Array | ReadableStream | string) {
  const tmpfile = nodePath.join(siteConfig.tempFolder, nanoid())
  try {
    if (typeof data === 'string' || data instanceof Uint8Array) {
      await fs.writeFile(tmpfile, data)
    } else if (data instanceof ReadableStream) {
      await pipeline(
        (async function * generator () {
          const reader = data.getReader()
          for (;;) {
            const { value, done } = await reader.read()
            if (!done) {
              yield value
            } else {
              return
            }
          }
        }),
        createWriteStream(tmpfile)
      )
    } else {
      throw new Error('data type is not supported')
    }
  } catch (err) {
    fs.rm(tmpfile).catch((err) => console.info('tried to rm tmpfile:', err))
    throw err
  }

  try {
    await serialQueue.add(() => fs.rename(tmpfile, fileToOSPath(path)))
  } catch (err) {
    try {
      await serialQueue.add(async () => {
        const segments = pathToSegments(path)
        if (segments.length > 1) await ensureFolder(segments.slice(0, -1).join('/'))
        await fs.rename(tmpfile, fileToOSPath(path))
      })
    } catch (err2) {
      fs.rm(tmpfile) // tidy up temps
      throw err2
    }
  }
}

/** write an entire folder structure in one atomic action */
export async function bulkWrite (path: string | FileInfo, files: BulkFiles) {
  return await bulkWriteIterable (path, (async function * generate () {
    for (const path in files) {
      const value = files[path]
      if (!value || typeof value !== 'object') throw new Error('values must be BulkFileContents objects')
      if (value.encoding === 'base64') {
        yield { path, data: Buffer.from(files[path].data, 'base64') }
      } else if (value.encoding === 'string') {
        yield { path, data: value.data }
      } else {
        throw new Error('Data in unsupported encoding')
      }
    }
  })())
}

export async function bulkWriteIterable (path: string | FileInfo, iter: AsyncIterable<{ path: string, data: string | Uint8Array | ReadableStream<Uint8Array> }>) {
  const tmpFolder = nodePath.resolve(nodePath.join(siteConfig.tempFolder, nanoid()))
  const segments = pathToSegments(path)

  try {
    await fs.mkdir(tmpFolder, { recursive: true })

    for await (const { path: filePath, data: fileData } of iter) {
      const fileSegments = pathToSegments(filePath)
      const fileOSPath = nodePath.resolve(nodePath.join(tmpFolder, ...fileSegments))
      if (!fileOSPath.startsWith(tmpFolder)) throw new Error('Security violation, file path unacceptable')

      // ensure folder exists
      await fs.mkdir(nodePath.resolve(nodePath.join(tmpFolder, ...fileSegments.slice(0, -1))), { recursive: true })

      if (typeof fileData === 'string' || fileData instanceof Uint8Array) {
        await fs.writeFile(fileOSPath, fileData)
      } else if (fileData instanceof ReadableStream) {
        const handle = await fs.open(fileOSPath, 'w')
        try {
          for await (const chunk of streamAsyncIterator(fileData, true)) {
            await handle.write(chunk)
          }
        } finally {
          await handle.close()
        }
      } else {
        throw new Error('data type is not supported, must be string, Uint8Array, or ReadableStream')
      }
    }
  } catch (err) {
    fs.rm(tmpFolder, { recursive: true, force: true })
    throw err
  }

  // move the folder in to place
  const destinationOSPath = nodePath.resolve(nodePath.join(siteConfig.data, ...segments))
  if (await exists(path)) {
    // because node fs api doesn't allow swapping directory pointers, and most filesystems don't seem
    // to support it anyway, and it only is possible on relatively modern linux kernels, this crappy
    // workaround is needed, using locks to stall reads while non-atomic swap is done.
    const trashPath = destinationOSPath.replace(/\/([^\/]+)$/, `/#trash-${nanoid()}-$1`)
    await serialQueue.add(async () => {
      // this is why tfq is used, for fake atomic situations like this
      await fs.rename(destinationOSPath, trashPath)
      await fs.rename(tmpFolder, destinationOSPath)
    })
    fs.rm(trashPath, { recursive: true, force: true })
  } else {
    await serialQueue.add(async () => {
      if (segments.length > 1) await ensureFolder(segments.slice(0, -1).join('/'))
      await fs.rename(tmpFolder, destinationOSPath)
    })
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
    await serialQueue.add(() => fs.appendFile(destination, data))
  } catch (err) {
    try {
      await ensureFolder(pathToSegments(path).slice(0, -1).join('/'))
      await serialQueue.add(() => fs.appendFile(destination, data))
    } catch (_) {
      throw err
    }
  }
}

/** delete a file or folder */
export async function remove (path: string | FileInfo) {
  const destination = fileToOSPath(path)
  await serialQueue.add(() => fs.rm(destination, { recursive: true, force: true, maxRetries: 100 }))
  await parallelQueue.add(async () => {
    const segments = pathToSegments(path)
    const compressed = [...segments.slice(0, -1), `#compressed-${segments.at(-1)}.gz`].join('/')
    try {
      if (await exists(compressed)) {
        await fs.rm(fileToOSPath(compressed), { force: true, maxRetries: 5 })
      }
    } catch (err) {
      console.info('removing compressed file failed:', err)
    }
  })
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
    const stats = await serialQueue.add(() => fs.stat(osPath))
    if (kind && kind === 'file') return stats.isFile()
    if (kind && kind === 'folder') return stats.isDirectory()
    return true
  } catch (err) {
    return false
  }
}

/** get FileInfo object for a path, or throw an error if it doesn't exist */
export async function getInfo (path: string | FileInfo): Promise<FileInfo> {
  return await serialQueue.add(async () => {
    const pathString = typeof path === 'string' ? path : path.path
    const osPath = fileToOSPath(pathString)
    const stats = await fs.stat(osPath)
    const type = pathString.split('/').at(-1).includes('.') ? extToMimeType[pathString.split('.').at(-1)] || 'application/octet-stream' : 'application/octet-stream'
    const info = {
      name: pathToSegments(pathString).at(-1),
      path: pathString,
      type,
      size: stats.size,
      isFile: stats.isFile() || stats.isSymbolicLink(),
      isFolder: stats.isDirectory(),
      isCompressible: !!mimeDB[type].compressible,
      lastModified: stats.mtime,
      created: stats.ctime,
      etag: `"${Math.round(stats.mtimeMs).toString(36)}:${stats.ino}:${stats.size}"`
    }

    if (info.isFolder) {
      // recursively add file sizes and find latest mtime
      info.size = 0
      const walk = async (path) => {
        const listing = await fs.readdir(path, { withFileTypes: true })
        await Promise.all(listing.map(async entry => {
          if (!entry.name.startsWith('#')) {
            if (entry.isDirectory()) {
              await parallelQueue.add(() => walk(nodePath.join(path, entry.name)))
            } else if (entry.isFile() || entry.isSymbolicLink()) {
              const stats = await fs.stat(nodePath.join(path, entry.name))
              info.size += stats.size
              if (info.lastModified < stats.mtime){
                info.lastModified = stats.mtime
              }
            }
          }
        }))
      }

      await parallelQueue.add(() => walk(fileToOSPath(info.path)))
    }

    return info
  })
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
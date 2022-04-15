import siteConfig from '$lib/site-config.json'
import tfq from 'tiny-function-queue'
import fs from 'node:fs/promises'
import nodePath from 'node:path'
import mimeDB from 'mime-db/db.json'
import { nanoid } from 'nanoid'

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

// convert a file object or string path to an OS absolute path
function fileToOSPath (file: FileInfo | string): string {
  if (typeof file === 'object' && typeof file.path === 'string') {
    return fileToOSPath(file.path)
  } else if (typeof file === 'string') {
    return nodePath.resolve(siteConfig.data, file)
  } else {
    throw new Error('invalid file path object')
  }
}

// convert a string path to an array of segments
function pathToSegments (path: string | FileInfo) {
  const p = typeof path === 'string' ? path : path.path
  return p.split('/')
}

// returns an array of FileInfo objects
export async function list (path: string | FileInfo): Promise<FileInfo[]> {
  const dirPath = fileToOSPath(path)
  const dirlist = await fs.readdir(dirPath)

  const result: FileInfo[] = await Promise.all(dirlist.map(name => {
    const filePath = `${path}/${name}`
    return getInfo(filePath)
  }))

  return result
}

// read a file
export async function read (path: string | FileInfo): Promise<Uint8Array> {
  const nodeBuffer = await fs.readFile(fileToOSPath(path))
  return new Uint8Array(nodeBuffer.buffer, nodeBuffer.byteOffset, nodeBuffer.byteOffset + nodeBuffer.byteLength)
}

// rewrite the contents of a file, with no downtime (rename-over)
export async function write (path: string | FileInfo, data: Uint8Array | string) {
  const tmpfile = nodePath.join(siteConfig.tempFolder, nanoid())
  const segments = pathToSegments(path)
  if (segments.length > 1) await ensureFolder(segments.slice(0, -1).join('/'))
  await fs.writeFile(tmpfile, data)
  await fs.rename(tmpfile, fileToOSPath(path))
}

// write a file with a randomly generated unique filename, returns string path
export async function writeUnique (folder: string | FileInfo, data: string | Uint8Array, mimeType: string): Promise<string> {
  const ext: string = { extensions: ['bin'], ...(mimeDB[mimeType] || {}) }.extensions[0]
  const name = `${nanoid()}.${ext}`
  const path = `${folder}/${name}`
  // if this name is in use, try again
  if (await exists(path)) return writeUnique(folder, data, mimeType)
  await write(path, data)
  return path
}

// append a string or byte array to a file, with no half saved version (copy and rename over)
export async function append (path: string | FileInfo, data: Uint8Array | string) {
  const tmpfile = nodePath.join(siteConfig.tempFolder, nanoid())
  const destination = fileToOSPath(path)

  await ensureFolder(pathToSegments(path).slice(0, -1).join('/'))
  await tfq.lockWhile(destination, async () => {
    await fs.copyFile(destination, tmpfile)
    await fs.appendFile(tmpfile, data)
    await fs.rename(tmpfile, destination)
  })
}

// delete a file or folder
export async function remove (path: string | FileInfo) {
  const destination = fileToOSPath(path)
  await fs.rm(destination, { recursive: true, force: true, maxRetries: 100 })
}

export async function ensureFolder (path: string | FileInfo) {
  const segments = pathToSegments(typeof path === 'string' ? path : path.path)
  const progress = []

  while (segments.length) {
    progress.push(segments.shift())
    const destination = progress.join('/')
    if (!await exists(destination, 'folder')) {
      await fs.mkdir(fileToOSPath(destination))
    }
  }
}

// does something exist at this path?
export async function exists (path: string | FileInfo, kind?: 'file' | 'folder'): Promise<boolean> {
  try {
    const stats = await getInfo(path)
    if (kind && kind === 'file') return stats.isFile
    if (kind && kind === 'folder') return stats.isFolder
    return true
  } catch (err) {
    return false
  }
}

// get FileInfo object for a path, or throw an error if it doesn't exist
export async function getInfo (path: string | FileInfo): Promise<FileInfo> {
  const pathString = typeof path === 'string' ? path : path.path
  const osPath = fileToOSPath(pathString)
  const stats = await fs.stat(osPath)
  return {
    name: pathToSegments(pathString).at(-1),
    path: pathString,
    type: pathString.split('/').at(-1).includes('.') ? extToMimeType[pathString.split('.').at(-1)] || 'application/octet-stream' : 'application/octet-stream',
    size: stats.size,
    isFile: stats.isFile(),
    isFolder: stats.isDirectory(),
    lastModified: stats.mtime,
    created: stats.ctime,
    etag: `${Math.round(stats.mtimeMs).toString(36)}:${stats.ino}:${stats.size}`
  }
}

// check if a path is within another path
export function isWithin (target: string, container: string): boolean {
  const targetOS = fileToOSPath(target)
  const containerOS = fileToOSPath(container)
  return targetOS.startsWith(containerOS + nodePath.sep)
}

export async function initializeStorage () {
  try {
    await fs.mkdir(siteConfig.data, { recursive: true })
  } catch (err) {}

  try {
    await fs.mkdir(siteConfig.tempFolder, { recursive: true })
  } catch (err) {}
}
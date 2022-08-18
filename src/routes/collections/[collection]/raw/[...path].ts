import { stringToByteArray } from '$lib/functions/binary-string'
import { list, getInfo, isWithin, write, remove, listStrings, bulkWrite, readStream, read, bulkWriteIterable } from '$lib/functions/io'
import type { RequestHandler } from '@sveltejs/kit'
import { nanoid } from 'nanoid'
import { decodeCollectionURLPath } from '$lib/functions/collection-url'
import { isValid, isAuthorized } from '../_auth'
import ammo from '@hapi/ammo'
import streamAsyncIterator from '$lib/functions/stream-to-async-iterator'
import iteratorToStream from '$lib/functions/async-iterator-to-stream'
import MIMEParser from '@saekitominaga/mime-parser'
// import createBrotliCompressionStream from '$lib/functions/brotli-compression-stream'
// import zlib from 'node:zlib'


// const BrotliOptions = {
//   chunkSize: 32 * 1024,
//   params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 5 }
// }

export const GET: RequestHandler = async function ({ request }) {
  const acceptEncodings = (request.headers.get('Accept-Encoding') || '').split(',').map(x => x.trim())

  try {
    const params = decodeCollectionURLPath((new URL(request.url)).pathname)
    const { collection, path } = params
    const dataPath = `collections/${collection}/${path}`

    // validations
    if (!isValid(params)) return { status: 500 }
    if (!isWithin(dataPath, `collections/${collection}`)) return { status: 500 }
    if (!await isAuthorized(params, request)) return { status: 307, headers: { Location: '/identity/login' } }

    const stats = await getInfo(dataPath)

    if (stats.isFile) {
      const isText = stats.type.startsWith('text/') || stats.type.split(/[^a-z0-9]+/ig).includes('json')
      const headers = {
        'Accept-Ranges': 'bytes',
        'Content-Type': isText ? `${stats.type}; charset=utf-8` : stats.type,
        'Last-Modified': stats.lastModified.toUTCString(),
        'Etag': stats.etag,
      }

      if (request.headers.has('Range')) {
        const ranges = ammo.header(request.headers.get('Range'), stats.size)

        if (ranges !== null && ranges.length === 1) {
          const [range] = ranges
          // requesting a single range
          const start = range.from
          const length = (range.to + 1) - range.from
          const body = await readStream(dataPath, { start, length })
          return {
            status: 206,
            headers: {
              ...headers,
              'Content-Range': `bytes ${start}-${range.to}/${stats.size}`,
              'Content-Length': `${length}`
            },
            body
          }
        } else if (ranges !== null && ranges.length > 1) {
          // multipart response
          const boundary = nanoid()

          const asyncIter = (async function * streamMultipart() {
            const t = stringToByteArray

            for (const range of ranges) {
              yield t(`--${boundary}\r\n`)
              yield t(`Content-Type: ${headers['Content-Type']}\r\n`)
              yield t(`Content-Range: bytes ${range.from}-${range.to}/${stats.size}\r\n`)
              yield t(`\r\n`)

              const start = range.from
              const length = (range.to + 1) - range.from
              const partStream = await readStream(dataPath, { start, length })
              for await (const chunk of streamAsyncIterator(partStream)) {
                yield chunk
              }

              yield t('\r\n')
            }

            yield t('----\r\n')
          })()

          return {
            status: 206,
            headers: {
              ...headers,
              'Content-Type': `multipart/byteranges; boundary=${boundary}`
            },
            body: iteratorToStream(asyncIter)
          }
        }
      }

      if (stats.isCompressible && acceptEncodings.includes('gzip')) {
        const pathParts = dataPath.split('/')
        const gzipPath = [...pathParts.slice(0, -1), `#compressed-${pathParts.at(-1)}.gz`].join('/')

        try {
          const gzipStats = await getInfo(gzipPath)
          if (gzipStats.lastModified < stats.lastModified) {
            throw new Error('Compressed version outdated')
          }

          return {
            headers: {
              ...headers,
              'Content-Encoding': 'gzip'
            },
            body: await readStream(gzipPath)
          }
        } catch (err) {
          // console.log(err)
          // console.log('Sending dynamic gzip compressed response')
          const compressed = (await readStream(dataPath)).pipeThrough(new CompressionStream('gzip'))
          const [fileCopy, streamCopy] = compressed.tee()
          write(gzipPath, fileCopy)

          return {
            headers: {
              ...headers,
              'Content-Encoding': 'gzip'
            },
            body: streamCopy
          }
        }
      }

      // return a normal request
      return {
        headers: {
          ...headers,
          'Content-Length': `${stats.size}`
        },
        body: await readStream(dataPath)
      }
    } else {
      if (request.headers.get('Accept') === 'text/plain') {
        const body = (await listStrings(dataPath)).filter(x => {
          if (x.startsWith('#')) return false
          if (x.startsWith('.')) return false
          return true
        }).join('\n')
        return { headers: { 'Content-Type': 'text/plain' }, body }
      } else {
        return {
          body: {
            files: (await list(dataPath)).filter(x => {
              if (x.name.startsWith('#')) return false
              if (x.name.startsWith('.')) return false
              return true
            })
          }
        }
      }
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      return { status: 404, body: '' }
    } else {
      throw err
    }
  }
}

// create file or replace it's contents
export const PUT: RequestHandler = async function ({ request }) {
  const params = decodeCollectionURLPath((new URL(request.url)).pathname)
  const { collection, path } = params
  const dataPath = `collections/${collection}/${path}`

  if (!isValid(params)) return { status: 500 }
  if (!isWithin(dataPath, `collections/${collection}`)) return { status: 500 }
  if (!await isAuthorized(params, request)) return { status: 307, headers: { Location: '/identity/login' } }

  await write(dataPath, new Uint8Array(await request.arrayBuffer()))
  const stats = await getInfo(dataPath)

  return {
    status: 204, // No Content
    headers: {
      'ETag': stats.etag,
      'Last-Modified': stats.lastModified.toUTCString()
    }
  }
}

export const POST: RequestHandler = async function ({ request }) {
  console.log(request)
  const params = decodeCollectionURLPath((new URL(request.url)).pathname)
  const { collection, path } = params
  const dataPath = `collections/${collection}/${path}`

  if (!isValid(params)) return { status: 500 }
  if (!isWithin(dataPath, `collections/${collection}`)) return { status: 500 }
  if (!await isAuthorized(params, request)) return { status: 307, headers: { Location: '/identity/login' } }

  const mediaType = new MIMEParser(request.headers.get('Content-Type'))
  if (mediaType.getEssence() === 'application/json') {
    const postBody = await request.json()

    if (typeof postBody !== 'object' || !postBody) {
      return { status: 500, body: 'invalid post body, must be json object' }
    } else if (postBody.type === 'bulk') {
      await bulkWrite(dataPath, postBody.files)
    } else if (postBody.type === 'math') {
      if (!['u8', 's8', 'u16', 's16', 'u32', 's32', 'f32', 'f64'].includes(postBody.format)) {
        throw new Error('unsupported format')
      }
      if (!('length' in postBody)) {
        throw new Error('file length must be specified')
      }
      if (!('operations' in postBody) || !Array.isArray(postBody.operations)) {
        throw new Error('operations must be an array')
      }
      const valueSize = {
        u8: 1, s8: 1,
        u16: 2, s16: 2,
        u32: 4, s32: 4, f32: 4,
        f64: 8
      }[postBody.format]

      let data: Uint8Array
      try {
        data = await read(dataPath)
      } catch (err) {
        if (err.code === 'ENOENT') {
          data = new Uint8Array(postBody.length & valueSize)
        } else {
          throw err
        }
      }

      if ((data.byteLength * valueSize) !== postBody.length) {
        throw new Error('existing file has different length, cannot proceed')
      }

      const dataView = new DataView(data.buffer, data.byteOffset, data.byteLength)
      const get = {
        u8:  (address) => dataView.getUint8(address),
        s8:  (address) => dataView.getInt8(address),
        u16: (address) => dataView.getUint16(address * 2, false),
        s16: (address) => dataView.getInt16(address * 2, false),
        u32: (address) => dataView.getUint32(address * 4, false),
        s32: (address) => dataView.getInt32(address * 4, false),
        f32: (address) => dataView.getFloat32(address * 4, false),
        f64: (address) => dataView.getFloat64(address * 8, false)
      }[postBody.format] as (address: number) => number
      const set = {
        u8:  (address, value) => dataView.setUint8(address, value),
        s8:  (address, value) => dataView.setInt8(address, value),
        u16: (address, value) => dataView.setUint16(address * 2, value, false),
        s16: (address, value) => dataView.setInt16(address * 2, value, false),
        u32: (address, value) => dataView.setUint32(address * 4, value, false),
        s32: (address, value) => dataView.setInt32(address * 4, value, false),
        f32: (address, value) => dataView.setFloat32(address * 4, value, false),
        f64: (address, value) => dataView.setFloat64(address * 8, value, false)
      }[postBody.format] as (address: number, value: number) => void

      for (const operation of postBody.operations) {
        const { address, operator, operand } = operation
        if (operator === 'add') {
          set(address, get(address) + operand)
        } else if (operator === 'subtract') {
          set(address, get(address) - operand)
        } else if (operator === 'multiply') {
          set(address, get(address) * operand)
        } else if (operator === 'divide') {
          set(address, get(address) * operand)
        } else if (operator === 'set') {
          set(address, operand)
        } else {
          throw new Error('Unknown operator, must be add, subtract, multiply, divide, or set')
        }
      }

      await write(dataPath, data)
    } else {
      return { status: 500, body: 'json body must specify type' }
    }
  } else if (mediaType.getEssence() === 'multipart/form-data') {
    const dup = request.clone()
    console.log('req body')
    console.log(await dup.text())
    const formData = await request.formData()
    if (formData.get('type') === 'bulk') {
      const files = formData.getAll('files[]')
      await bulkWriteIterable(dataPath, (async function * gen () {
        for (const file of files) {
          if (typeof file === 'object') {
            yield { path: file.name, data: new Uint8Array(await file.arrayBuffer()) }
          }
        }
      })())
    }
    // console.log('iterating multipart')
    // const boundary = mediaType.getParameter('boundary') || ''
    // await bulkWriteIterable(dataPath, (async function * generate () {
    //   console.log('boundary', boundary)
    //   for await (const part of streamMultipart(request.body, boundary)) {
    //     console.log('part', part)
    //     if (part.name === 'files[]' && part.filename) {
    //       const path = part.filename
    //       console.log('path', path)
    //       yield { path, data: iteratorToStream(part.data) }
    //     }
    //   }
    // })())
    // console.log('finished writing')
  }

  const stats = await getInfo(dataPath)

  return {
    status: 204, // No Content
    headers: {
      'ETag': stats.etag,
      'Last-Modified': stats.lastModified.toUTCString()
    }
  }
}

// create file or replace it's contents
export const DELETE: RequestHandler = async function ({ request }) {
  const params = decodeCollectionURLPath((new URL(request.url)).pathname)
  const { collection, path } = params
  const dataPath = `collections/${collection}/${path}`

  if (!isValid(params)) return { status: 500 }
  if (!isWithin(dataPath, `collections/${collection}`)) return { status: 500 }
  if (!await isAuthorized(params, request)) return { status: 307, headers: { Location: '/identity/login' } }

  await remove(dataPath)
  return { status: 204 }
}

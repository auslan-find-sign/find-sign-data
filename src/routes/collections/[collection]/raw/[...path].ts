import { stringToByteArray } from '$lib/functions/binary-string'
import { list, read, getInfo, isWithin, write, remove, listStrings, bulkWrite, readStream, bulkWriteIterable, exists } from '$lib/functions/io'
import type { RequestHandler } from '@sveltejs/kit'
import { nanoid } from 'nanoid'
import { decodeCollectionURLPath } from '$lib/functions/collection-url'
import { isValid, isAuthorized } from '../_auth'
import ammo from '@hapi/ammo'
import streamAsyncIterator from '$lib/functions/stream-to-async-iterator'
import iteratorToStream from '$lib/functions/async-iterator-to-stream'
import { streamMultipart } from '@ssttevee/multipart-parser'
import MIMEParser from '@saekitominaga/mime-parser'
import createBrotliCompressionStream from '$lib/functions/brotli-compression-stream'
import zlib from 'node:zlib'

const BrotliOptions = {
  chunkSize: 32 * 1024,
  params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 5 }
}

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
        // const data = await read(dataPath)
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
            const bodies = []
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

      console.log(acceptEncodings)

      if (acceptEncodings.includes('br')) {
        const pathParts = dataPath.split('/')
        const brPath = [...pathParts.slice(0, -1), `#brotli-${pathParts.at(-1)}`].join('/')
        try {
          const brStats = await getInfo(brPath)
          if (brStats.lastModified < stats.lastModified) {
            throw new Error('Compressed version outdated')
          }
          console.log('Sending already compressed version')
          return {
            headers: {
              ...headers,
              'Content-Length': `${stats.size}`,
              'Content-Encoding': 'br'
            },
            body: await readStream(brPath)
          }
        } catch (err) {
          // brotli encode doesn't exist, make one?
          if (stats.type.startsWith('text/') || stats.type.startsWith('application/')) {
            console.log(`Compressing ${dataPath}...`)
            // return a compressed stream and store the result
            const body = await readStream(dataPath)
            const compressedStream = body.pipeThrough(createBrotliCompressionStream(BrotliOptions))
            const [compressed1, compressed2] = compressedStream.tee()
            // write it to filesystem but don't wait
            write(brPath, compressed1)

            return {
              headers: {
                ...headers,
                'Content-Length': `${stats.size}`,
                'Content-Encoding': 'br'
              },
              body: compressed2
            }
          }
        }
      }
      console.log('Sending uncompressed response')
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
        const body = (await listStrings(dataPath)).join('\n')
        return { headers: { 'Content-Type': 'text/plain' }, body }
      } else {
        return {
          body: {
            files: await list(dataPath)
          }
        }
      }
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      return { status: 404 }
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
    } else {
      return { status: 500, body: 'json body must specify type' }
    }
  } else if (mediaType.getEssence() === 'multipart/form-data') {
    const boundary = mediaType.getParameter('boundary') || ''
    await bulkWriteIterable(dataPath, (async function * generate () {
      for await (const part of streamMultipart(request.body, boundary)) {
        const path = part.name
        yield { path, data: iteratorToStream(part.data) }
      }
    })())
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

import { stringToByteArray } from '$lib/functions/binary-string'
import { list, read, getInfo, isWithin, write, remove, listStrings, bulkWrite } from '$lib/functions/io'
import type { RequestHandler } from '@sveltejs/kit'
import { nanoid } from 'nanoid'
import { decodeCollectionURLPath } from '$lib/functions/collection-url'
import { isValid, isAuthorized } from '../_auth'
import ammo from '@hapi/ammo'

  // console.log(request.url)
  // request.headers.forEach((value, key) => {
  //   console.log(`${key}: ${value}`)
  // })
export const GET: RequestHandler = async function ({ request }) {
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
        const data = await read(dataPath)
        const ranges = ammo.header(request.headers.get('Range'), stats.size)

        if (ranges.length === 1) {
          const [range] = ranges
          // requesting a single range
          const body = data.subarray(range.from, range.to + 1)
          return {
            status: 206,
            headers: {
              ...headers,
              'Content-Range': `bytes ${range.from}-${range.to}/${stats.size}`,
              'Content-Length': `${body.length}`
            },
            body
          }
        } else if (ranges.length > 1) {
          // multipart response
          const boundary = nanoid()
          const bodies = []
          const t = stringToByteArray

          for (const range of ranges) {
            bodies.push(t(`--${boundary}\r\n`))
            bodies.push(t(`Content-Type: ${headers['Content-Type']}\r\n`))
            bodies.push(t(`Content-Range: bytes ${range.from}-${range.to}/${stats.size}\r\n`))
            bodies.push(t(`\r\n`))
            bodies.push(data.subarray(range.from, range.to + 1))
            bodies.push(t('\r\n'))
          }

          bodies.push(t('----\r\n'))

          const byteIter = function * () {
            for (const section of bodies) yield * section
          }
          const body = new Uint8Array(byteIter())
          return {
            status: 206,
            headers: {
              ...headers,
              'Content-Type': `multipart/byteranges; boundary=${boundary}`,
              'Content-Length': `${body.length}`
            },
            body: body
          }
        }
      }
      // return a normal request
      const body = await read(dataPath)
      return {
        headers: {
          ...headers,
          'Content-Length': `${body.length}`
        },
        body
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

  const postBody = await request.json()

  if (typeof postBody !== 'object' || !postBody) {
    return { status: 500, body: 'invalid post body, must be json object' }
  } else if (postBody.type === 'bulk') {
    await bulkWrite(dataPath, postBody.files)
  } else {
    return { status: 500, body: 'json body must specify type' }
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

import { stringToByteArray } from '$lib/functions/binary-string'
import { list, read, getInfo, isWithin, write, remove } from '$lib/functions/io'
import type { RequestHandler } from '@sveltejs/kit'
import { nanoid } from 'nanoid'
import { isValid, isAuthorized } from '../_auth'

export const get: RequestHandler = async function ({ params, request }) {
  const dataPath = `collections/${params.collection}/${params.path}`

  // validations
  if (!isValid(params)) return { status: 500 }
  if (!isWithin(dataPath, `collections/${params.collection}`)) return { status: 500 }
  if (!await isAuthorized(params, request)) return { status: 307, headers: { Location: '/identity/login' } }

  const stats = await getInfo(dataPath)

  if (stats.isFile) {
    const isText = stats.type.startsWith('text/') || stats.type.split(/[^a-z0-9]+/ig).includes('json')
    const headers = {
      'Accept-Ranges': 'bytes',
      'Content-Type': isText ? `${stats.type}; charset=utf-8` : stats.type,
      'Content-Length': `${stats.size}`,
      'Last-Modified': stats.lastModified.toUTCString(),
      'Etag': stats.etag,
    }

    if (request.headers.has('Range')) {
      // range request
      const rangesStr = request.headers.get('Range').split('bytes=')[1]
      const ranges = rangesStr.split(',').map(x => x.trim().split('-', 2).map(x => Number(x)))
      if (ranges.length === 1) {
        // requesting a single range
        return {
          status: 206,
          headers: {
            ...headers,
            'Content-Range': `bytes ${ranges[0].join('-')}/${headers['Content-Length']}`,
            'Content-Length': `${ranges[0][1] - ranges[0][0]}`
          },
          body: (await read(dataPath)).subarray(...ranges[0])
        }
      } else if (ranges.length > 1) {
        // multipart response
        const boundary = nanoid()
        const data = await read(dataPath)
        const bodies = []
        const t = stringToByteArray

        for (const range of ranges) {
          bodies.push(t(`--${boundary}\r\n`))
          bodies.push(t(`Content-Type: ${headers['Content-Type']}\r\n`))
          bodies.push(t(`Content-Range: ${range[0]}-${range[1]}/${headers['Content-Length']}\r\n`))
          bodies.push(t(`\r\n`))
          bodies.push(data.subarray(range[0], range[1]))
        }

        const byteIter = function * () {
          for (const section of bodies) yield * section
        }
        const body = new Uint8Array(byteIter())
        return {
          status: 206,
          headers: {
            ...headers,
            'Content-Type': `multipart/byteranges; boundary=${boundary}`,
            'Content-Length': `${body.byteLength}`
          },
          body: body
        }
      }
    }
    // return a normal request
    return { headers, body: await read(dataPath) }
  } else {
    return {
      body: {
        files: await list(dataPath)
      }
    }
  }
}

// create file or replace it's contents
export const put: RequestHandler = async function ({ params, request }) {
  const dataPath = `collections/${params.collection}/${params.path}`

  if (!isValid(params)) return { status: 500 }
  if (!isWithin(dataPath, `collections/${params.collection}`)) return { status: 500 }
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

// create file or replace it's contents
export const del: RequestHandler = async function ({ params, request }) {
  const dataPath = `collections/${params.collection}/${params.path}`

  if (!isValid(params)) return { status: 500 }
  if (!isWithin(dataPath, `collections/${params.collection}`)) return { status: 500 }
  if (!await isAuthorized(params, request)) return { status: 307, headers: { Location: '/identity/login' } }

  await remove(dataPath)
  return { status: 204 }
}

import { byteArrayToHex, byteArrayToString } from '$lib/functions/binary-string'
import { list, read, getInfo, isWithin } from '$lib/functions/io'
import { isValid, isAuthorized } from '../_auth'

export async function get ({ params, request }) {
  const dataPath = `collections/${params.collection}/${params.path}`

  // validations
  if (!isValid(params)) return { status: 500 }
  if (!isWithin(dataPath, `collections/${params.collection}`)) return { status: 500 }
  if (!await isAuthorized(params, request)) return { status: 307, headers: { Location: '/identity/login' } }

  const stats = await getInfo(dataPath)

  if (stats.isFile) {
    const isText = stats.type.startsWith('text/') || stats.type.split(/[^a-z0-9]+/ig).includes('json')
    return {
      headers: {
        'Content-Type': isText ? `${stats.type}; charset=utf-8` : stats.type,
        'Content-Length': `${stats.size}`,
        'Last-Modified': stats.lastModified.toUTCString(),
        'Etag': stats.etag,
      },
      body: await read(dataPath)
    }
  } else {
    return {
      body: {
        files: await list(dataPath)
      }
    }
  }
}

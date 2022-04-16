import { byteArrayToString } from '$lib/functions/binary-string'
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
    const contents = await read(dataPath)
    const textTypes = ['text', 'json', 'yaml', 'xml', 'svg']
    const plaintext = stats.type.split(/[^a-zA-Z0-9]+/g).some(x => textTypes.includes(x.toLowerCase()))

    return {
      body: {
        collection: params.collection,
        path: params.path,
        isFile: stats.isFile,
        type: stats.type,
        contents: plaintext ? byteArrayToString(contents) : undefined,
        contentsURL: `/collections/${params.collection}/raw/${params.path}`
      }
    }
  } else {
    const files = await list(dataPath)
    return {
      body: {
        collection: params.collection,
        path: params.path,
        isFile: stats.isFile,
        files
      }
    }
  }
}

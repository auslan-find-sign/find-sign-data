import { byteArrayToString } from '$lib/functions/binary-string'
import { list, read, getInfo, isWithin } from '$lib/functions/io'
import { isValid, isAuthorized } from '../_auth'
import { decodeCollectionURLPath } from '$lib/functions/collection-url'
import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async function get ({ request }) {
  const params = decodeCollectionURLPath((new URL(request.url)).pathname)
  const { collection, path } = params
  const dataPath = `collections/${collection}/${path}`

  // validations
  if (!isValid(params)) return { status: 500 }
  if (!isWithin(dataPath, `collections/${collection}`)) return { status: 500 }
  if (!await isAuthorized(params, request)) return { status: 307, headers: { Location: '/identity/login' } }

  const stats = await getInfo(dataPath)

  if (stats.isFile) {
    const contents = await read(dataPath)
    const textTypes = ['text', 'json', 'yaml', 'xml', 'svg', 'subrip']
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
    const hasReadme = files.some(x => x.name === '#README.md')
    const readme = hasReadme ? byteArrayToString(await read(`${dataPath}/#README.md`)) : undefined

    return {
      body: {
        collection: params.collection,
        path: params.path,
        isFile: stats.isFile,
        readme,
        files: files.filter(x => !x.name.startsWith('#') && !x.name.startsWith('.'))
      }
    }
  }
}

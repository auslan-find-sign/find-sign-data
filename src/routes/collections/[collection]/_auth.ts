import { byteArrayToString } from '$lib/functions/binary-string'
import { read, exists } from '$lib/functions/io'
import { decodeBasicAuth } from '$lib/functions/basic-auth'
import { verifyLicense } from '$lib/functions/auth'

export function isValid (params) {
  if (params.collection.length < 1) return false
  if (typeof params.collection !== 'string') return false
  if (params.collection.includes('.')) return false
  if (params.collection.includes('/')) return false
  if (params.collection.includes('#')) return false
  if (params.collection.includes('\\')) return false
  if (params.collection.length > 128) return false

  if (typeof params.path !== 'string') return false
  if (params.path.length > 512) return false
  if (params.path.split('/').length > 8) return false
  if (params.path.startsWith('/')) return false
  if (params.path.startsWith('.')) return false
  if (params.path.startsWith('#')) return false
  if (params.path.includes('\\')) return false
  if (params.path.includes('/.')) return false
  if (params.path.includes('/#')) return false

  return true
}

export async function isAuthorized (params, request: Request) {
  const collectionPath = `collections/${params.collection}`

  const isPrivate = await exists(`${collectionPath}/#private`, 'file')
  const isWrite = request.method === 'POST' || request.method === 'PUT' || request.method === 'DELETE'

  if (isPrivate || isWrite) {
    const url = new URL(request.url)
    const basicAuth = decodeBasicAuth(request)
    const license = basicAuth && basicAuth.username === 'license' ? basicAuth.password : url.searchParams.get('license')
    if (license && await exists(`${collectionPath}/#keys.json`)) {
      const allowList = Object.keys(byteArrayToString(await read(`${collectionPath}/#keys.json`)))
      return verifyLicense(license, allowList)
    } else {
      return false
    }
  } else {
    return true
  }
}
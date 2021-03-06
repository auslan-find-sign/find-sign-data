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

  if ('path' in params) {
    if (typeof params.path !== 'string') return false
    if (params.path.length > 512) return false
    if (params.path.split('/').length > 8) return false
    if (params.path.startsWith('/')) return false
    if (params.path.startsWith('.')) return false
    if (params.path.startsWith('#')) return false
    if (params.path.includes('\\')) return false
    if (params.path.includes('/.')) return false
    if (params.path.includes('/#')) return false
  }

  return true
}

export async function isWritable (params, request: Request) {
  const collectionPath = `collections/${params.collection}`

  if (await exists(`${collectionPath}/#keys.json`)) {
    const url = new URL(request.url)
    const basicAuth = decodeBasicAuth(request)
    const license = url.searchParams.has('license') ? url.searchParams.get('license') : basicAuth && basicAuth.username === 'license' ? basicAuth.password : undefined
    if (license) {
      const allowList = Object.keys(JSON.parse(byteArrayToString(await read(`${collectionPath}/#keys.json`))))
      return verifyLicense(license, allowList)
    }
  }
  return false
}

export async function isAuthorized (params, request: Request) {
  const collectionPath = `collections/${params.collection}`

  const isPrivate = await exists(`${collectionPath}/#private`, 'file')
  const isWrite = request.method !== 'HEAD' && request.method !== 'GET'

  if (isPrivate || isWrite) {
    return isWritable(params, request)
  } else {
    return true
  }
}
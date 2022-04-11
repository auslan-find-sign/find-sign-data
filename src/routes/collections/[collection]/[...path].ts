import * as io from '$lib/storage/io'
import siteConfig from '$lib/site-config.json'

function isValid (params) {
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

function isAuthorized (params, request) {
  // TODO: implement some auth scheme
  return false
}

export async function get ({ params, request }) {
  const dataPath = `collections/${params.collection}/${params.path}`
  // validations
  if (!isValid(params)) return { status: 500 }
  if (!io.isWithin(dataPath, `collections/${params.collection}`)) return { status: 500 }

  return {
    headers: {
      'last-modified': stats.lastModified,
      'etag': stats.etag
    }
  }
}
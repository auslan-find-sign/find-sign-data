import { read, getInfo, isWithin } from '$lib/functions/io'
import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async function ({ params }) {
  const dataPath = `collections/${params.collection}/#assets/${params.asset}`

  if (!isWithin(dataPath, `collections/${params.collection}/#assets`)) return { status: 500 }
  const stats = await getInfo(dataPath)

  if (stats.isFile) {
    const headers = {
      'Content-Length': `${stats.size}`,
      'Last-Modified': stats.lastModified.toUTCString(),
      'Etag': stats.etag,
      'Content-Type': stats.type
    }

    return { headers, body: await read(dataPath) }
  } else {
    return { status: 404 }
  }
}
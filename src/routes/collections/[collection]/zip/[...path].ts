import { decodeCollectionURLPath } from '$lib/functions/collection-url'
import { isValid, isAuthorized } from '../_auth'
import { getInfo, isWithin, listStrings, readStream } from '$lib/functions/io'
import * as zip from '@zip.js/zip.js'

zip.configure({
  useWebWorkers: false
})

export async function GET ({ request }) {
  const params = decodeCollectionURLPath((new URL(request.url)).pathname)
  const { collection, path } = params
  const dataPath = `collections/${collection}/${path}`

  // validations
  if (!isValid(params)) return { status: 500 }
  if (!isWithin(dataPath, `collections/${collection}`)) return { status: 500 }
  if (!await isAuthorized(params, request)) return { status: 307, headers: { Location: '/identity/login' } }

  const pipe = new TransformStream()
  const writer = new zip.ZipWriter(pipe)

  const stats = await getInfo(dataPath)

  if (!stats.isFolder) {
    throw new Error('Only folders can be zipped')
  }

  async function addZip (path) {
    const substats = await getInfo(`${dataPath}/${path}`)
    if (substats.isFile) {
      const readable = await readStream(`${dataPath}/${path}`)
      await writer.add(path, { readable }, {
        creationDate: substats.created,
        lastModDate: substats.lastModified
      })
    } else if (substats.isFolder) {
      await writer.add(path, null, { directory: true })
      for (const subthing of await listStrings(`${dataPath}/${path}`)) {
        if (!subthing.startsWith('#') && !subthing.startsWith('.')) {
          await addZip(`${path}/${subthing}`)
        }
      }
    }
  }

  (async function () {
    for (const thing of await listStrings(dataPath)) {
      if (!thing.startsWith('#') && !thing.startsWith('.')) {
        await addZip(`${thing}`)
      }
    }
    await writer.close()
  })()

  return {
    headers: {
      'Content-Type': 'application/zip'
    },
    body: pipe.readable
  }
}
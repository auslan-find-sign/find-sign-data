import { byteArrayToString } from '$lib/functions/binary-string'
import { exists, list, read } from '$lib/functions/io'

export async function get ({ params }) {
  const collection = params.collection
  const readmePath = `collections/${collection}/#README.md`
  const hasReadme = await exists(readmePath)
  const files = (await list(`collections/${collection}`)).filter(({ name }) => !name.startsWith('#') && !name.startsWith('.'))

  if (hasReadme) {
    const readmeBytes = await read(readmePath)
    const readmeMarkdown = await byteArrayToString(readmeBytes)
    return { body: { collection, hasReadme, readmeMarkdown, files } }
  } else {
    return { body: { collection, hasReadme, readmeMarkdown: '', files } }
  }
}
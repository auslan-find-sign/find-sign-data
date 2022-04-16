import { list, ensureFolder } from '$lib/functions/io'

export async function get () {
  await ensureFolder('collections')
  const collections = await list('collections')
  return { body: { collections: collections.map(x => x.name) } }
}
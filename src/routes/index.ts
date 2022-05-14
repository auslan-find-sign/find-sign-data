import { ensureFolder, listStrings } from '$lib/functions/io'

export async function get () {
  await ensureFolder('collections')
  const collections = await listStrings('collections')
  return { body: { collections } }
}
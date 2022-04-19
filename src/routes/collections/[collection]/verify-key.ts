import { exists } from '$lib/functions/io'
import type { RequestHandler } from '@sveltejs/kit'
import { isValid, isAuthorized } from './_auth'

export const get: RequestHandler = async function get ({ params, request }) {
  if (!isValid(params)) return { status: 500 }
  const writable = await isAuthorized(params, request)
  const readable = writable || (!await exists(`collections/${params.collection}/#private`))
  return { body: { readable, writable } }
}

export type Params = {
  collection: string, // e.g. 'aus-signbank'
  mode: 'raw' | 'files',
  path: string // e.g. 'id-gloss/thing.yaml'
}

/**
 * Decode /collections/[collection]/[mode]/[...path] using decodeURIComponent
 * returning a params object. SvelteKit should do this, or something like it,
 * but as of 26-APR-2022 it doesn't work consistently.
 */
export function decodeCollectionURLPath (pathname: string): Params | undefined {
  if (pathname.endsWith('/__data.json')) pathname = pathname.slice(0, -'/__data.json'.length)
  if (!pathname.startsWith('/collections/')) return undefined
  const [collection, mode, ...rest] = pathname.slice('/collections/'.length).split('/').map(x => decodeURIComponent(x))
  if (mode !== 'raw' && mode !== 'files') return undefined
  const path = rest.join('/')
  return { collection, mode, path }
}

/**
 * Encode a /collections/[collection]/[raw-or-files]/[...path] url using encodeURIComponent
 */
export function encodeCollectionURLPath (collection: string, mode: 'raw' | 'files', path: string): string {
  const rest = path.split('/').map(x => encodeURIComponent(x))
  return `/collections/${encodeURIComponent(collection)}/${mode}/${rest.join('/')}`
}
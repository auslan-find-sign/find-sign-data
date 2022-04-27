import { invalidate } from '$app/navigation'
// import { page } from '$app/stores'
import { get } from 'svelte/store'
import { createLicense } from './auth'
import identity from './identity-store'

/**
 * use:method={'delete'} allows augmenting <a> links to use other http verbs, and to simply invalidate
 * and refresh the current route when the action is done, instead of navigating. Will include a license
 * if one is available
 */
export function method (element: HTMLAnchorElement, method: 'get'|'put'|'post'|'delete' = 'get') {
  let httpVerb = method.toUpperCase()

  const handler = async (event) => {
    event.preventDefault()
    let href = new URL(element.href, window.location.href)
    const identityString = get(identity)
    if (identityString) {
      href.searchParams.set('license', createLicense(identityString))
    }

    const response = await fetch(href.toString(), { method: httpVerb })
    // once the request is done, refresh
    invalidate(window.location.href)
  }

  if (!element.hasAttribute('label')) {
    let href = new URL(element.href, window.location.href)
    element.setAttribute('label', `${method} ${href.pathname}`)
  }

  element.addEventListener('click', handler)
  return {
    update: (method) => { httpVerb = method.toUpperCase() },
    destroy: () => { element.removeEventListener('click', handler) }
  }
}
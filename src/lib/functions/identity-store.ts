import { browser } from "$app/env"
import { writable } from "svelte/store"

const secret = browser ? globalThis.localStorage.getItem('secret') : undefined
const identity = writable(secret)
if (browser) {
  identity.subscribe(value => {
    if (typeof value === 'string') {
      globalThis.localStorage.setItem('secret', value)
    } else {
      globalThis.localStorage.removeItem('secret')
    }
  })
}

export default identity
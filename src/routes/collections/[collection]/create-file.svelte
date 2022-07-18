<script lang="ts" context="module">
  import { encodeCollectionURLPath } from '$lib/functions/collection-url'

  export const load = async function load ({ url, stuff }) {
    const collection = decodeURIComponent(url.pathname.split('/')[2])
    const path = url.searchParams.get('path') || ''
    let text = ''

    if (url.searchParams.has('edit')) {
      const getURL = new URL(encodeCollectionURLPath(collection, 'raw', path), url)
      const response = await fetch(getURL.toString())
      text = await response.text()

      if (response.headers.get('Content-Type').includes('application/json')) {
        text = JSON.stringify(JSON.parse(text), null, 2)
      }
    }

    const pathParts = path.split('/').map(x => decodeURIComponent(x))
    const crumbs = []
    pathParts.forEach((name, index) => {
      crumbs.push([
        name,
        `/collections/${encodeURIComponent(collection)}/files/`
         + [...pathParts.slice(0, index), name].map(encodeURIComponent).join('/')
      ])
    })

    return {
      props: { collection, path, text },
      stuff: { crumbs: [...stuff.crumbs, ...crumbs ]}
    }
  }
</script>
<script lang="ts">
  import Main from '$lib/widgets/MainBlock.svelte'
  import Layout from '$lib/layout/MainWithSidebar.svelte'
  import { goto } from '$app/navigation'
  import { createLicense } from '$lib/functions/auth'
  import identity from '$lib/functions/identity-store'

  export let collection: string
  export let path: string = ''
  export let text = ''

  async function doTheThingZhuLi (event) {
    event.preventDefault()
    const init: RequestInit = {
      method: 'PUT',
      headers: {
        'content-type': 'text/plain'
      },
      body: text
    }
    const putURL = encodeCollectionURLPath(collection, 'raw', path) + `?license=${createLicense($identity)}`
    const response = await fetch(putURL, init)
    if (response.ok) {
      goto(encodeCollectionURLPath(collection, 'files', path))
    }
  }
</script>
<Layout>
  <Main title="Upload File">
    <p>
      Upload filename: <input type="text" bind:value={path}>
    </p>
    <textarea bind:value={text} rows={text.split('\n').length}></textarea>
    <p>
      <button on:click={doTheThingZhuLi} disabled={path === ''}>Upload</button>
    </p>
  </Main>
</Layout>

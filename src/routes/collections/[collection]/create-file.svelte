<script lang="ts" context="module">
  import type { Load } from './upload-file'

  export const load: Load = async function load ({ url }) {
    const collection = decodeURIComponent(url.pathname.split('/')[2])
    const path = url.searchParams.get('path')
    return {
      props: { collection, path }
    }
  }
</script>
<script lang="ts">
  import Main from '$lib/widgets/MainBlock.svelte'
  import Layout from '$lib/layout/MainWithSidebar.svelte'
  import { encodeCollectionURLPath } from '$lib/functions/collection-url'
  import { goto } from '$app/navigation'
  import { createLicense } from '$lib/functions/auth'
  import identity from '$lib/functions/identity-store'

  export let collection: string
  export let path: string = ''
  let text = ''

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
    <textarea bind:value={text}></textarea>
    <p>
      <button on:click={doTheThingZhuLi} disabled={path === ''}>Upload</button>
    </p>
  </Main>
</Layout>

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
  let files: FileList

  async function doTheThingZhuLi (event) {
    event.preventDefault()
    const init: RequestInit = {
      method: 'PUT',
      body: files[0]
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
    <p>
      Select file: <input type="file" bind:files={files}>
    </p>
    <p>
      <button on:click={doTheThingZhuLi} disabled={path === '' || files.length !== 1}>Upload</button>
    </p>
  </Main>
</Layout>

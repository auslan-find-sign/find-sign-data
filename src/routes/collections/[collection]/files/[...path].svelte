<!-- <script context="module">
  export const hydrate = false
  export const router = false
</script> -->
<script lang=ts>
  import Main from '$lib/widgets/MainBlock.svelte'
  import Layout from '$lib/layout/MainWithSidebar.svelte'
  import FileListing from '$lib/widgets/FileListing.svelte'
  import CodeBlock from '$lib/widgets/CodeBlock.svelte'

  export let collection: string
  export let files = undefined
  export let path: string
  export let contents: string | undefined = undefined
  export let contentsURL: string | undefined = undefined
  export let type: string | undefined = undefined
  export let isFile: boolean = false

  // pretty printers
  let displayContents = ''

  $: if (type && type.split(/[^a-z0-9]/ig).includes('json')) {
    displayContents = JSON.stringify(JSON.parse(contents), null, 2)
  } else {
    displayContents = contents
  }

  $: highlightingType = type && {
    'application/json': 'json',
    'text/markdown': 'markdown',
    'text/yaml': 'yaml',
    'application/xml': 'xml',
    'text/plain': 'none',
  }[type]
</script>

<Layout sidebar={false}>
  <Main title="Collection: {collection}/{path}">
    {#if files}
      <h1>Files</h1>
      <FileListing {files} {collection} />
    {/if}
    {#if isFile}
      {#if type.startsWith('video/')}
        <!-- svelte-ignore a11y-media-has-caption -->
        <video src={contentsURL} type={type} controls></video>
      {:else if type.startsWith('image/')}
        <!-- svelte-ignore a11y-missing-attribute -->
        <img src={contentsURL} type={type}>
      {:else if type.startsWith('audio/')}
        <audio src={contentsURL} type={type} controls></audio>
      {:else if type.startsWith('text/')}
        <CodeBlock lang={highlightingType || 'none'} text={displayContents}/>
      {:else}
        <p>
          TODO: implement a download thing on this page
        </p>
      {/if}
    {/if}
  </Main>
</Layout>

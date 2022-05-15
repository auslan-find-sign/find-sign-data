<script lang=ts context=module>
  // export const hydrate = false
  // export const router = false

  export async function load ({ props, stuff }) {
    const pathParts = props.path.split('/').map(x => decodeURIComponent(x))
    const crumbs = []
    pathParts.forEach((name, index) => {
      crumbs.push([
        name,
        `/collections/${encodeURIComponent(props.collection)}/files/`
         + [...pathParts.slice(0, index), name].map(encodeURIComponent).join('/')
      ])
    })

    return { props, stuff: { crumbs: [...stuff.crumbs, ...crumbs] } }
  }
</script>
<script lang=ts>
  import Main from '$lib/widgets/MainBlock.svelte'
  import Layout from '$lib/layout/MainWithSidebar.svelte'
  import EditControls from '$lib/widgets/EditControls.svelte'
  import FileListing from '$lib/widgets/FileListing.svelte'
  import CodeBlock from '$lib/widgets/CodeBlock.svelte'
  import Markdown from '$lib/widgets/Markdown.svelte'

  export let collection: string
  export let files = undefined
  export let path: string
  export let contents: string | undefined = undefined
  export let contentsURL: string | undefined = undefined
  export let type: string | undefined = undefined
  export let isFile: boolean = false
  export let readme: string = undefined

  // pretty printers
  let displayContents = ''
  let isWritable: boolean

  $: if (type && type.split(/[^a-z0-9]/ig).includes('json')) {
    displayContents = JSON.stringify(JSON.parse(contents), null, 2)
  } else {
    displayContents = contents
  }

  $: filename = path.split('/').slice(-1)[0]
</script>

<Layout sidebar={false}>
  <Main title={filename}>
    {#if files}
      <h1>Files</h1>
      <EditControls {collection} {path} bind:isWritable />
      <FileListing {files} {collection} {isWritable} />
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
      {:else if type === 'text/markdown'}
        <Markdown markdown={contents}/>
      {:else if contents}
        <CodeBlock lang={type || 'none'} text={displayContents}/>
      {:else}
        <p>
          TODO: implement a download thing on this page
        </p>
      {/if}

      <p><a href={contentsURL} download={filename}>Download</a></p>
    {/if}
    {#if readme}
      <Markdown markdown={readme}/>
    {/if}
  </Main>
</Layout>

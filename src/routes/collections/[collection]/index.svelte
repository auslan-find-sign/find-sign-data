<script lang=ts>
  import Main from '$lib/widgets/MainBlock.svelte'
  import Layout from '$lib/layout/MainWithSidebar.svelte'
  import ListSidebar from '$lib/widgets/ListSidebar.svelte'
  import FileListing from '$lib/widgets/FileListing.svelte'
  import Markdown from '$lib/widgets/Markdown.svelte'
  import EditControls from '$lib/widgets/EditControls.svelte'
  import { encodeCollectionURLPath } from '$lib/functions/collection-url'

  export let collection = ''
  export let files = []
  export let hasReadme = false
  export let readmeMarkdown = ''
  let isWritable: boolean = false

  $: sidebarItems = files.map(x => ({
    icon: x.isFolder ? 'folder' :
      {
        application: 'cassette',
        image: 'picture',
        video: 'film',
        text: x.type === 'text/calendar' ? 'calendar' : 'file',
        font: 'pictures',
        audio: 'cassette',
        model: '3dglasses'
      }[x.type.split('/')[0]],
    label: x.name,
    url: encodeCollectionURLPath(collection, 'files', x.path.split('/').slice(2).join('/'))
  }))
</script>

<Layout>
  <ListSidebar slot="sidebar" title="Files" icon="" items={sidebarItems} />
  <Main title="Collection: {collection}">
    <h1>Files</h1>
    <EditControls {collection} path="" bind:isWritable />
    <FileListing {files} {collection} {isWritable} />
    {#if hasReadme}
      <Markdown markdown={readmeMarkdown}/>
    {/if}
  </Main>
</Layout>

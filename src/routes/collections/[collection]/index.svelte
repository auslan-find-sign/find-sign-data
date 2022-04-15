<script lang=ts>
  import Main from '$lib/widgets/MainBlock.svelte'
  import Layout from '$lib/layout/MainWithSidebar.svelte'
  import ListSidebar from '$lib/widgets/ListSidebar.svelte'
  import FileListing from '$lib/widgets/FileListing.svelte'
  import Markdown from '$lib/widgets/Markdown.svelte'

  export let collection = ''
  export let files = []
  export let hasReadme = false
  export let readmeMarkdown = ''

  function encodePath (path: string) {
    return path.split('/').map(x => encodeURIComponent(x)).join('/')
  }

  $: sidebarItems = files.map(x => ({
    icon: x.isFolder ? 'folder' :
      {
        application: 'cassette',
        image: 'picture',
        video: 'film',
        text: x.type === 'text/calendar' ? 'calendar' : 'file',
        font: 'pictures',
        audio: 'cassette',
        model: 'cassette'
      }[x.type.split('/')[0]],
    label: x.name,
    url: `/collections/${encodeURIComponent(collection)}/files/${encodePath(x.path)}`
  }))
</script>

<Layout>
  <ListSidebar slot="sidebar" title="Files" icon="" items={sidebarItems} />
  <Main title="Collection: {collection}">
    <h1>Files</h1>
    <FileListing {files} {collection} />
    {#if hasReadme}
      <Markdown markdown={readmeMarkdown}/>
    {/if}
  </Main>
</Layout>

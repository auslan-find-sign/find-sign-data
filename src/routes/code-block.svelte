<script lang=ts>
  import CodeBlock from '$lib/widgets/CodeBlock.svelte'
  import MainBlock from '$lib/widgets/MainBlock.svelte'
  import ListSidebar from '$lib/widgets/ListSidebar.svelte'
  import MainWithSidebar from '$lib/layout/MainWithSidebar.svelte'
</script>

<MainWithSidebar>
  <ListSidebar slot=sidebar />

  <MainBlock>
    <CodeBlock lang='javascript' text={'// hello world\nx = 1 + 2\n'}/>
  </MainBlock>
</MainWithSidebar>
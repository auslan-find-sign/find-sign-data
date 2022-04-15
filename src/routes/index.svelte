<script lang=ts>
  import MainBlock from '$lib/widgets/MainBlock.svelte'
  import ListSidebar from '$lib/widgets/ListSidebar.svelte'
  import MainWithSidebar from '$lib/layout/MainWithSidebar.svelte'
</script>

<MainWithSidebar>
  <ListSidebar slot=sidebar />

  <MainBlock>
    <p>
      Hello World
    </p>
  </MainBlock>
</MainWithSidebar>

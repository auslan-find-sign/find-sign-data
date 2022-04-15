<script lang=ts>
  import MainBlock from '$lib/widgets/MainBlock.svelte'
  import ListSidebar from '$lib/widgets/ListSidebar.svelte'
  import MainWithSidebar from '$lib/layout/MainWithSidebar.svelte'

  const links = Object.entries({
    'Login': '/identity/login',
    'Create Identity': '/identity/create'
  })
</script>

<MainWithSidebar>
  <ListSidebar slot=sidebar icon=user-circle items={links} />

  <slot/>
</MainWithSidebar>

<script type=ts context=module>
  export async function load ({ url, params, stuff }) {
    const pathname = (new URL(url)).pathname
    return {
      params,
      stuff: {
        crumbs: [
          ...stuff.crumbs,
          [`Identity: ${pathname.split('/').slice(-1)[0]}`, pathname]
        ]
      }
    }
  }
</script>
<script lang=ts>
  import ListSidebar from '$lib/widgets/ListSidebar.svelte'
  import MainWithSidebar from '$lib/layout/MainWithSidebar.svelte'

  const links = Object.entries({
    'Login': '/identity/login',
    'Logout': '/identity/logout',
    'Create Identity': '/identity/create'
  })
</script>

<MainWithSidebar>
  <ListSidebar slot=sidebar icon=user-circle items={links} />

  <slot/>
</MainWithSidebar>

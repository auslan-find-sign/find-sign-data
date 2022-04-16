<script lang="ts" context="module">
  // export const hydrate = false
</script>
<script lang=ts>
  import MainBlock from '$lib/widgets/MainBlock.svelte'
  import ListSidebar from '$lib/widgets/ListSidebar.svelte'
  import MainWithSidebar from '$lib/layout/MainWithSidebar.svelte'
  import securityOfficer from '$lib/assets/security-officer.png'
  import uri from 'uri-tag'

  export let collections = []

  let sidebarItems: [string, string][]
  $: sidebarItems = collections.map(collection =>
    [collection, uri`/collections/${collection}`]
  )
</script>

<MainWithSidebar>
  <ListSidebar slot=sidebar title="Collections" items={sidebarItems} icon="cassette" />

  <MainBlock title="Homepage">
    <p>
      <img src={securityOfficer} alt="Illustration of a bird holding some computer documents" />
      This repository contains all the data used to build auslan.fyi sites. This includes deep
      frequent scrapes of many websites containing Auslan related information.
    </p>
  </MainBlock>
</MainWithSidebar>

<style>
  img {
    width: 15em;
    float: right;
  }
</style>
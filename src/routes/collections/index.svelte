<script lang=ts>
  import MainBlock from '$lib/widgets/MainBlock.svelte'
  import MainWithSidebar from '$lib/layout/MainWithSidebar.svelte'

  export let collections = []
</script>

<MainWithSidebar>
  <MainBlock title="List of Collections">
    {#if collections.length > 0}
      <ul>
        {#each collections as name}
          <li><a href="/collections/{encodeURIComponent(name)}/">{name}</a></li>
        {/each}
      </ul>
    {:else}
      <p>No collections are available</p>
    {/if}
  </MainBlock>
</MainWithSidebar>

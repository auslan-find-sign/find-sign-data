<script lang=ts>
  import { browser } from '$app/env'
  import { createLicense } from '$lib/functions/auth'
  import identity from '$lib/functions/identity-store'
  import Icon from '$lib/Icon.svelte'
  import uri from 'uri-tag'

  export let collection: string
  export let path: string
  export let isWritable: boolean

  async function checkLockedStatus (collection): Promise<boolean> {
    const response = await fetch(uri`/collections/${collection}/verify-key?license=${createLicense($identity)}`)
    const body = await response.json()
    isWritable = body.writable
    return body.writable
  }

  $: unlockedPromise = browser && $identity && checkLockedStatus(collection)

  const locked = true
</script>

<header aria-label="Editing controls" class:placeholder={!browser}>
  <div class=actions>
    {#if isWritable}
      <a href="/collections/{encodeURIComponent(collection)}/create-file?path={encodeURIComponent(path)}"><Icon name=file/>Create File</a>
      <a href="/collections/{encodeURIComponent(collection)}/upload-file?path={encodeURIComponent(path)}"><Icon name=in/>Upload File</a>
    {/if}
  </div>
  <div class=status>
    {#if !$identity}
      {#if browser}
        <Icon name="locked"/> Not logged in
      {:else}
        <Icon name="locked"/> Checking status…
      {/if}
    {:else}
      {#await unlockedPromise}
        <Icon name="locked"/> Checking status…
      {:then unlocked}
        {#if unlocked === false}
          <Icon name="locked"/> Editing not allowed
        {:else if unlocked === true}
          <Icon name="unlocked"/> Editing unlocked
        {/if}
      {:catch err}
        <Icon name="error"/> Error: {err.message}
      {/await}
    {/if}
  </div>
</header>

<style>
  header {
    display: grid;
    grid-template-columns: auto max-content;
    grid-template-areas: "actions status";
  }
  .actions {
    grid-area: actions;
  }
  .status {
    grid-area: status;
    width: max-content
  }

</style>
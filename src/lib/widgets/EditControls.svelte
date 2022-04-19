<script lang=ts>
  import { browser } from '$app/env'
import { createLicense } from '$lib/functions/auth';
  import identity from '$lib/functions/identity-store'
  import Icon from '$lib/Icon.svelte'
  import uri from 'uri-tag'

  export let collection: string

  async function checkLockedStatus (collection): Promise<boolean> {
    const response = await fetch(uri`/collections/${collection}/verify-key?license=${createLicense($identity)}`)
    const body = await response.json()
    return body.writable
  }

  $: lockedPromise = browser && $identity && checkLockedStatus(collection)

  const locked = true
</script>

<header aria-label="Editing controls" class:placeholder={!browser}>
  <div class=status>
    {#if !$identity}
      <Icon name="locked"/> Not logged in
    {:else}
      {#await lockedPromise}
        <Icon name="locked"/> Checking status…
      {:then locked}
        {#if locked === true}
          <Icon name="locked"/> Editing not allowed
        {:else if locked === false}
          <Icon name="unlocked"/> Editing unlocked
        {/if}
      {:catch err}
        <Icon name="error"/> Error: {err.message}
      {/await}
    {/if}
  </div>
</header>
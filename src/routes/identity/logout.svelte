<script lang=ts>
  import MainBlock from '$lib/widgets/MainBlock.svelte'
  import identity from '$lib/functions/identity-store'
  import { browser } from '$app/env'
  import { onMount } from 'svelte'

  onMount(() => {
    $identity = undefined
  })
</script>

<MainBlock title="Logout">
  {#if !browser}
    <p>Loading...</p>
  {:else if $identity === undefined}
    <p>Logged out.</p>
  {:else if $identity}
    <p>Logged in.</p>
  {/if}
</MainBlock>
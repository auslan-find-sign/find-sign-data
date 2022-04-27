<script lang=ts>
  import { createLicense, validateIdentity } from '$lib/functions/auth'
  import identity from '$lib/functions/identity-store'
  import CodeBlock from '$lib/widgets/CodeBlock.svelte'

  import MainBlock from '$lib/widgets/MainBlock.svelte'
  import { onMount } from 'svelte'

  $: valid = validateIdentity($identity)

  const durations = {
    '5 mins': 1000 * 60 * 5,
    '1 hour': 1000 * 60 * 60,
    '1 day': 1000 * 60 * 60 * 24,
    '1 week': 1000 * 60 * 60 * 24 * 7,
    '1 month': 1000 * 60 * 60 * 24 * 30,
    '1 year': 1000 * 60 * 60 * 24 * 365,
    'Forever': -1,
  }

  let invalidator = 0

  onMount(() => {
    const interval = setInterval(() => invalidator += 1, 1000 * 10)
    return () => clearInterval(interval)
  })

  let duration = durations['1 hour']

  $: license = valid && Number.isInteger(invalidator) && createLicense($identity, {
    validTo: new Date(duration === -1 ? Number.MAX_SAFE_INTEGER : Date.now() + duration)
  })
</script>

<MainBlock title="Issue a License with your Identity">
  <p>
    This tool manually issues a license using your current logged in identity
  </p>

  {#if !valid}
  <p>
    You are not logged in with a valid identity, please <a href="login">login</a> first.
  </p>
  {/if}

  {#if valid}
  <p>
    Identity validity duration:
    <select bind:value={duration}>
      {#each Object.entries(durations) as [label, number]}
        <option value={number}>{label}</option>
      {/each}
    </select>
  </p>
  <p>your license is:</p>
  <CodeBlock lang="text/plain" text={license} />
  {/if}
</MainBlock>
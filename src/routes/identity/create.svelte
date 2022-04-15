<script lang=ts>
  import MainBlock from '$lib/widgets/MainBlock.svelte'
  import CodeBlock from '$lib/widgets/CodeBlock.svelte'
  import { createIdentity } from '$lib/functions/auth'
  import { onMount } from 'svelte'
  export const title = 'Create Identity'

  let identity = 'Generating... (ensure javascript is enabled)'
  onMount(() => {
    identity = createIdentity()
  })
</script>

<MainBlock title={title}>
  <h1>New Cryptographic Identity:</h1>
  <CodeBlock lang='text/plain' text={identity}/>
  <p>
    Be sure to keep it somewhere safe, like a password manager.
  </p>
</MainBlock>

<script lang=ts>
  import { validateIdentity } from '$lib/functions/auth'
  import identity from '$lib/functions/identity-store'

  import MainBlock from '$lib/widgets/MainBlock.svelte'
  export const title = 'Login with Identity'

  let identityString = ''

  $: valid = validateIdentity(identityString)
  $: valid && ($identity = identityString)
</script>

<MainBlock title={title}>
  <p>
    Login using Identity string created using Create Identity tool:
  </p>

  <input type=password bind:value={identityString}>

  <p>
    Identity field is: {valid ? 'valid' : identityString.length === 0 ? 'empty' : 'invalid'}
  </p>
</MainBlock>
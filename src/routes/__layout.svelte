<script lang=ts context=module>
  export async function load ({ stuff }) {
    return {
      stuff: {
        crumbs: stuff.crumbs || []
      }
    }
  }
</script>
<script lang=ts>
  import { page } from '$app/stores'

  import '$lib/assets/images.css'
  import Breadcrumbs from '$lib/widgets/Breadcrumbs.svelte'
</script>
<Breadcrumbs crumbs={$page.stuff.crumbs} />
<slot/>
<style>
  :global(body) {
    background-image: var(--texture-purple-waves);
    background-size: 300px 300px;
  }
</style>
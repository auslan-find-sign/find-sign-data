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
  @import "@fontsource/josefin-sans/200.css";
  @import "@fontsource/josefin-sans/400.css";
  @import "@fontsource/josefin-sans/variable.css";

  :global(h1, h2, h3, h4, h5, h6) {
    font-family: "Josefin Sans", sans-serif;
    font-weight: 200;
  }

  :global(h4, h5, h6) {
    font-weight: 400;
  }

  @supports (font-variation-settings: normal) {
    :global(h1, h2, h3, h4, h5, h6) { font-family: "Josefin SansVariable"; }
    :global(h1) { font-variation-settings: "wght" 150; }
    :global(h2) { font-variation-settings: "wght" 200; }
    :global(h3) { font-variation-settings: "wght" 280; }
    :global(h4) { font-variation-settings: "wght" 300; }
    :global(h5) { font-variation-settings: "wght" 340; }
    :global(h6) { font-variation-settings: "wght" 350; }
  }

  :global(body) {
    background-image: var(--texture-purple-waves);
    background-size: 300px 300px;
  }

  :global(a) {
    text-decoration: underline;
    text-decoration-skip-ink: all;
    text-decoration-color: rgba(0, 0, 0, 0.2);
    color: inherit;
    width: max-content;
  }

  :global(a:hover) {
    color: rgb(13, 123, 90);
    text-decoration-color: currentColor;
  }
</style>
<script lang=ts>
  import Icon from '$lib/Icon.svelte'
  import { page }  from '$app/stores'
  import '$lib/assets/images.css'

  export let title:string = 'Sidebar'
  export let items:[string, string][] | { label: string, icon: string, url: string }[] = [['foo', '/foo'], ['bar', '/bar'], ['baz', '/']]
  export let icon = 'cassette'

  $: itemObjects = items.map(x => {
    if (Array.isArray(x)) {
      return { label: x[0], url: x[1], icon }
    } else {
      return { label: x.url, url: x.url, icon, ...x }
    }
  })
</script>

<nav>
  <h2>{title}</h2>
  <slot>
    <ul>
      {#each itemObjects as { label, url, icon } (url)}
        <li aria-current={(new URL(url, $page.url)).toString() === $page.url.toString().split('?')[0] ? 'page' : undefined}>
          <Icon name={icon}/> <a href={url}>{label}</a>
        </li>
      {/each}
    </ul>
  </slot>
</nav>

<style>
  nav {
    --paper-shade: hsl(163, 4%, 68%);
    border-radius: 1rem;
    overflow: hidden;
    box-shadow:
      1px 2px 3px rgba(0, 0, 0, 0.2),
      inset 0 0 4px rgba(255, 255, 255, 0.5);

    background-color: var(--paper-shade);
    background-image: linear-gradient(var(--paper-shade), var(--paper-shade)), var(--texture-paper);
    background-blend-mode: soft-light, luminosity;
  }

  nav > h2 {
    font-size: 1.5rem;
    --leather-tint: rgb(56, 213, 211);
    padding: 0.3rem 1rem;
    margin: 0;
    background: linear-gradient(var(--leather-tint), var(--leather-tint)), var(--texture-leather);
    background-blend-mode: hue, luminosity;
    background-color: var(--leather-tint);
    background-size: 200px;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    color: rgba(13, 14, 41, 0.674);
    text-shadow:
      +0.5px +1px 2px rgb(143, 231, 230),
      -0.5px -1px 2px rgb(28, 89, 87);
    box-shadow:
      inset +1px +3px 4px rgba(143, 231, 230, 0.504),
      inset -1px -3px 4px rgba(19, 44, 44, 0.357),
             0    0   5px rgba(9, 33, 40, 0.5);
  }

  nav > h2::before, nav > h2::after {
    content: '';
    display: inline-block;
    width: 0.6em;
    height: 0.6em;
    background-color: rgb(190, 166, 29);
    background-image: var(--reflection-matcap);
    background-size: cover;
    border-radius: 0.4em;
    border: 1px solid hsla(190, 92%, 10%, 0.238);
    box-shadow:
      inset +1px +3px 0.2em hsl(50, 54%, 68%),
      inset -1px -3px 0.2em hsl(51, 89%, 24%),
      +1px +3px 4px rgba(143, 231, 230, 0.4),
      -1px -3px 4px rgba(19, 44, 44, 0.3);
  }

  nav > h2::before { margin-right: 0.5em; }
  nav > h2::after { margin-left: 0.5em; }

  nav ul {
    list-style: none;
    margin: 0;
    padding: 0.7rem 1rem 0.7rem 1rem;
  }

  nav ul li {
    margin-top: 0.1rem;
  }
</style>
<script lang=ts>
  import Icon from '$lib/Icon.svelte'
  import { page }  from '$app/stores'
  import '$lib/assets/images.css'

  export let title:string = 'Sidebar'
  export let items:[string, string][] = [['foo', '/foo'], ['bar', '/bar'], ['baz', '/']]
  export let icon = 'cassette'
</script>

<nav>
  <h2>{title}</h2>
  <slot>
    <ul>
      {#each items as [label, href] (href)}
        <li aria-current={(new URL(href, $page.url)).toString() === $page.url.toString() ? 'page' : undefined}>
          <a {href}><Icon name={icon}/> <span>{label}</span></a>
        </li>
      {/each}
    </ul>
  </slot>
</nav>

<style>
  nav {
    --paper-shade: hsl(0, 0%, 70%);
    border-radius: 1rem;
    overflow: hidden;
    box-shadow:
      1px 2px 3px rgba(0, 0, 0, 0.318),
      inset 0 0 4px rgba(255, 255, 255, 0.522);

    background-color: var(--paper-shade);
    background-image: linear-gradient(var(--paper-shade), var(--paper-shade)), var(--texture-paper);
    background-blend-mode: soft-light, luminosity;
  }

  nav h2 {
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

  nav ul {
    list-style: none;
    margin: 0;
    padding: 0.7rem 1rem 0.7rem 1rem;
  }

  nav ul li {
    margin-top: 0.1rem;
  }

  nav ul li a {
    text-decoration: inherit;
    color: inherit;
  }

  nav ul li[aria-current] a span {
    text-decoration: underline;
    text-overflow: ellipsis;
    cursor: default;
  }

  nav ul li:hover a span {
    text-decoration: underline;
  }
</style>
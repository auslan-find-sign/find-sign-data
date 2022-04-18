<script lang=ts>
  import { page } from '$app/stores'
import identity from '$lib/functions/identity-store'
  export let crumbs:[string, string][] = []
</script>

<nav>
  <ol aria-label="Breadcrumb">
    <li><a href="/">Home</a></li>
    {#each crumbs as [label, href]}
      {#if (new URL(href, $page.url)).pathname === (new URL($page.url).pathname)}
        <li>{label}</li>
      {:else}
        <li><a href={href}>{label}</a></li>
      {/if}
    {/each}
  </ol>

  <div>
    {#if $identity}
      <a href=/identity/logout>Logout</a>
    {:else}
      <a href=/identity/login>Login</a>
    {/if}
  </div>
</nav>

<style>
  nav {
    background-color: white;
    border-radius: 1em;
    display: grid;
    width: auto;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
    grid-template-areas: "crumbs auth";
    grid-template-columns: auto max-content;
    padding: 1ex 1rem;
    box-sizing: border-box;
    margin-bottom: 1rem;
  }

  ol {
    grid-area: crumbs;
    display: flex;
    margin: 0;
    padding: 0;
  }

  li {
    display: inline;
  }

  li:not(:last-child)::after {
    content: '/';
    padding-left: 0.5ex;
    padding-right: 0.5ex;
  }

  div {
    grid-area: auth;
    display: flex;
  }

  a {
    text-decoration: underline;
    text-decoration-skip-ink: all;
    text-decoration-color: rgba(0, 0, 0, 0.2);
    color: inherit;
    width: max-content;
  }
  a:hover {
    color: rgb(13, 123, 90);
    text-decoration-color: currentColor;
  }
</style>
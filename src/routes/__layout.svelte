<script lang=ts>
  import '$lib/assets/images.css'
</script>

<nav class:heading={true}>

</nav>

<slot/>

<style>
  :global(body) {
    background-image: var(--texture-purple-waves);
    background-size: 300px 300px;
  }
</style>
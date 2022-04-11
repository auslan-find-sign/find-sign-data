<script lang="ts">
  import symbols from '$lib/assets/symbol-defs.svg'

  export let name: string
  export let ariaHidden = false
</script>

<svg class={$$props.class} style={$$props.style} aria-label="{name} icon" aria-hidden={ariaHidden}>
  <use href="{symbols}#icon-{name}"></use>
</svg>

<style>
  svg {
    fill: currentColor;
    width: 1em; height: 1em;
    vertical-align: -0.5ex;
  }
</style>
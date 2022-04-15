<script lang="ts">
  import symbols from '$lib/assets/symbol-defs.svg'

  export let name: string
  export let label: string | undefined | false = undefined
  export let ariaHidden: true | false | undefined = false
</script>

<svg class={$$props.class} style={$$props.style} aria-label={label ? label : `${name} icon`} aria-hidden={ariaHidden}>
  <use href="{symbols}#icon-{name}"></use>
</svg>

<style>
  svg {
    fill: currentColor;
    width: 1em; height: 1em;
    vertical-align: -0.5ex;
  }
</style>
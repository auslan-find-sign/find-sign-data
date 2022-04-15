<script lang=ts>
  import { Lexer } from 'marked'
  import MarkdownRender from './MarkdownRender.svelte'
  export let markdown = ''

  $: ast = Lexer.lex(markdown, { sanitize: false, smartypants: true })
</script>

{#each ast as node}
  <MarkdownRender data={node}/>
{/each}
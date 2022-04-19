<script lang=ts>
  import { Lexer } from 'marked'
  import MarkdownRender from './MarkdownRender.svelte'
  export let markdown = ''
  export let assetPath = 'assets/'

  $: ast = Lexer.lex(markdown, { sanitize: false, smartypants: true })
</script>

{#each ast as data}
  <MarkdownRender {assetPath} {data}/>
{/each}
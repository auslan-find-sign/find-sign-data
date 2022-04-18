<script lang=ts>
  import { browser } from '$app/env'
  import Icon from '$lib/Icon.svelte'
  import delay from '$lib/functions/delay'
  import '$lib/assets/images.css'

  import hljs from 'highlight.js/lib/core'
  import hlJSON from 'highlight.js/lib/languages/json'
  import hlYAML from 'highlight.js/lib/languages/yaml'
  import hlXML from 'highlight.js/lib/languages/xml'
  import hlMD from 'highlight.js/lib/languages/markdown'
  import hlText from 'highlight.js/lib/languages/plaintext'

  hljs.registerLanguage('json', hlJSON)
  hljs.registerAliases('application/json', { languageName: 'json' })
  hljs.registerLanguage('yaml', hlYAML)
  hljs.registerAliases('text/yaml', { languageName: 'yaml' })
  hljs.registerLanguage('xml', hlXML)
  hljs.registerAliases('application/xml', { languageName: 'xml' })
  hljs.registerAliases('html', { languageName: 'xml' })
  hljs.registerAliases('text/html', { languageName: 'xml' })
  hljs.registerLanguage('markdown', hlMD)
  hljs.registerAliases('md', { languageName: 'markdown' })
  hljs.registerAliases('text/markdown', { languageName: 'markdown' })
  hljs.registerLanguage('txt', hlText)
  hljs.registerAliases('text', { languageName: 'txt' })
  hljs.registerAliases('text/plain', { languageName: 'txt' })
  hljs.registerAliases('application/x-subrip', { languageName: 'txt' })

  export let lang = 'none'
  export let text = ''
  // export let lineNumbers = true
  let clipboardState: string = 'clipboard'

  const maxLength = 64 * 1024
  $: highlight = text.length < maxLength && lang && lang !== 'none'
  $: hljsOutput = highlight && hljs.highlight(text, { language: lang, ignoreIllegals: true })
  $: lines = (hljsOutput ? hljsOutput.value : text).replace('\r\n', '\n').split('\n')

  const hasGutter = true
  $: lineNumbers = lines.map((html, idx) => (idx + 1).toString())
  // $: lineData = highlight && codeToLines(text, lang)
  // $: hasGutter = lineNumbers && lineData && lineData.lines.length < 5000

  async function copyClipboard() {
    await navigator.clipboard.writeText(text)
    clipboardState = 'clipboard-tick'
    await delay(1.0)
    clipboardState = 'clipboard'
  }
</script>

<div class="code-block" class:has-gutter={hasGutter}>
  <div class="highlight">{#if highlight}{@html hljsOutput.value}{:else}{text}{/if}</div>
  {#if hasGutter}
    <div class="gutter">{
      #each lineNumbers as num
        }{`${num}\n`}{
      /each
    }</div>
  {/if}
  {#if browser}
    <div class=buttons>
      <button on:click={copyClipboard} label="Copy to Clipboard"><Icon name={clipboardState} /></button>
    </div>
  {/if}
</div>

<style>
  .code-block {
    --gloss: hsl(95, 70%, 97%);
    background-image: linear-gradient(var(--gloss), var(--gloss)), var(--circuit-texture);
    background-size: 101% 101%, 180px 180px;
    background-position: center center, center center;
    background-repeat: no-repeat, repeat;
    background-blend-mode: screen, normal;
  }

  /* site styling */
  .code-block {
    /*  theme: FlatUI Dark */
    --background: white;
    --background-selected: #EFEFEF;
    --gutter-background: #F5F6F6;
    --gutter-foreground: #4D4E4C;
    --gutter-background-selected: #DBDCDD;
    --gutter-foreground-selected: #4D4E4C;
    --default:  #4E4E4C;
    --comment:  #8E908D;
    --jsdoc:    #767775;
    --keyword:  #8959A8;
    --value:    #E58C3B;
    --strlit:   #768A29;
    --template: #4E4D4C;
    --regexp:   #3D999F;
    --operator: #3D999F;
    --punctual: #4E4E4C;
    --fn-name:  #4371AE;

    display: grid;
    grid-template-areas: "gutter box";
    grid-template-columns: max-content 1fr;
    border: 0 solid transparent;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    /* border-bottom: 1px solid rgba(255, 255, 255, 0.2); */
    font: 12px/normal 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
    font-size: 12px;
    line-height: 1.3;
    border-radius: 2mm;
    background-color: var(--background);
    overflow: hidden;
  }

  .code-block .highlight :global(span.hljs-string) { color: var(--strlit) }
  .code-block .highlight :global(span.hljs-attr) { color: var(--keyword) }
  .code-block .highlight :global(span.hljs-bullet) { color: var(--default) }
  .code-block .highlight :global(span.hljs-number) { color: var(--value) }

  .buttons {
    grid-area: box;
    justify-self: right;
    font-size: 1em;
  }

  .buttons button {
    appearance: none;
    background: white;
    font: inherit;
    color: inherit;
    border: 0 none transparent;
    margin: 2px; padding: 0;
    border-radius: 1mm;
  }

  @media (pointer: fine) {
    .buttons button {
      transform: translate(0, 0); /* fixes some safari pixel offsetting glitchyness */
      opacity: 0.1;
      transition: opacity 100ms;
    }
    div.code-block:hover .buttons button {
      opacity: 0.9;
    }
  }

  /* Source Code widget */
  .highlight {
    grid-area: box;
    overflow-x: scroll;
    color: var(--default);
    hyphens: none;
    tab-size: 2;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    font-family: inherit;
    line-height: inherit;
    font-size: inherit;
    font-weight: inherit;
    white-space: pre;
    padding-left: 1ex;
    padding-right: 1ex;
  }

  .gutter {
    grid-area: gutter;
    white-space: pre;
    background-color: var(--gutter-background);
    color: var(--gutter-foreground);
    text-align: right;
    font: 12px/normal 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
    font-size: 12px;
    line-height: 1.3;
    padding-right: 1ex;
    padding-left: 2ex;
    width: max-content;
  }
</style>
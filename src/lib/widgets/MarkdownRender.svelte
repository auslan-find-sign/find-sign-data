<script lang=ts>
  import CodeBlock from '$lib/widgets/CodeBlock.svelte'
  export let data
</script>
{#if data.type === 'paragraph'}
  <p>
    {#each data.tokens as token}<svelte:self data={token}/>{/each}
  </p>
{:else if data.type === 'blockquote'}
  <blockquote>
    {#each data.tokens as token}<svelte:self data={token}/>{/each}
  </blockquote>
{:else if data.type === 'code'}
  <CodeBlock lang={data.lang || 'none'} text={data.text}/>
{:else if data.type === 'heading'}
  {#if data.depth === 1}
    <h1>{#each data.tokens as token}<svelte:self data={token}/>{/each}</h1>
  {:else if data.depth === 2}
    <h2>{#each data.tokens as token}<svelte:self data={token}/>{/each}</h2>
  {:else if data.depth === 3}
    <h3>{#each data.tokens as token}<svelte:self data={token}/>{/each}</h3>
  {:else if data.depth === 4}
    <h4>{#each data.tokens as token}<svelte:self data={token}/>{/each}</h4>
  {:else if data.depth === 5}
    <h5>{#each data.tokens as token}<svelte:self data={token}/>{/each}</h5>
  {:else if data.depth === 6}
    <h6>{#each data.tokens as token}<svelte:self data={token}/>{/each}</h6>
  {/if}
{:else if data.type === 'hr'}
  <hr/>
{:else if data.type === 'list'}
  {#if data.ordered}
    <ol style="--start-list: {data.start}" class:loose-list={data.loose}>
      {#each data.items as item}<svelte:self data={item}/>{/each}
    </ol>
  {:else}
    <ul>
      {#each data.items as item}<svelte:self data={item}/>{/each}
    </ul>
  {/if}
{:else if data.type === 'list_item'}
  <li class:task={!!data.task} class:checked={!!data.checked} class:loose={!!data.loose}>
    {#each data.tokens as token}<svelte:self data={token}/>{/each}
  </li>
{:else if data.type === 'image'}
  <img src={data.href} alt={data.title}>
{:else if data.type === 'html'
}{data.text}{
:else if data.type === 'text'
  }{data.text}{
:else if data.type === 'link'
  }<a href={data.href} title={data.title} referrerpolicy="no-referrer">{#each data.tokens as token}<svelte:self data={token}/>{/each}</a>{
:else if data.type === 'strong'
  }<strong>{#each data.tokens as token}<svelte:self data={token}/>{/each}</strong>{
:else if data.type === 'em'
  }<em>{#each data.tokens as token}<svelte:self data={token}/>{/each}</em>{
:else if data.type === 'del'
  }<del>{#each data.tokens as token}<svelte:self data={token}/>{/each}</del>{
:else if data.type === 'codespan'
  }<code>{data.text}</code>{
:else if data.type === 'br'
  }<br>{
/if}
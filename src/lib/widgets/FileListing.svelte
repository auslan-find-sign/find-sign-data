<script lang=ts>
  import type { FileInfoJSON } from '$lib/functions/io'
  import { friendly as friendlyDate } from '$lib/functions/date'
  import { bytes } from '$lib/functions/size'
  import Icon from '$lib/Icon.svelte'
  import { count } from '$lib/functions/iterables'
  import { method } from '$lib/functions/actions'
  import { encodeCollectionURLPath } from '$lib/functions/collection-url'

  export let collection:string
  export let files:FileInfoJSON[] = []
  export let currentPage = 0
  export let isWritable: boolean = false

  const filesPerPage = 250
  $: pageCount = Math.ceil(files.length / filesPerPage)
  $: files, currentPage = 0 // reset pagenum if listing changes

  function filePath (file: FileInfoJSON, mode: 'files' | 'raw' | 'zip') {
    return encodeCollectionURLPath(collection, mode, file.path.split('/').slice(2).join('/'))
  }

  function iconForFileInfo (file: FileInfoJSON): string {
    if (file.isFolder) return 'folder'
    if (file.type.startsWith('image/')) return 'picture'
    if (file.type.startsWith('video/')) return 'film'
    if (file.type === 'text/calendar') return 'calendar'
    if (file.type.startsWith('text/')) return 'file'
    if (file.type.startsWith('audio/')) return 'cassette'
    if (file.type.startsWith('model/')) return '3dglasses'
    if (file.type === 'application/zip') return 'zip'
    return 'file'
  }
</script>

<table>
  <thead>
    <tr>
      <td>Filename</td>
      <td>Size</td>
      <td>Modified</td>
      <td>{isWritable ? 'Actions' : 'Download'}</td>
    </tr>
  </thead>
  <tbody>
    {#each files.slice(currentPage * filesPerPage, (currentPage + 1) * filesPerPage) as file (file.path)}
      <tr>
        <td><a href={filePath(file, 'files')}><Icon name={iconForFileInfo(file)}/>{decodeURIComponent(file.name)}</a></td>
        <td>{bytes(file.size)}</td>
        <td>{friendlyDate(file.lastModified)}</td>
        <td>
          {#if isWritable}
            {#if file.isFile}
              <a href={`/collections/${encodeURIComponent(collection)}/create-file?${new URLSearchParams([['path', file.path.split('/').slice(2).join('/')], ['edit', '1']])}`}><Icon name=edit /></a>
            {/if}
            <a href={filePath(file, 'raw')} use:method={'delete'}><Icon name=trashcan label=Delete /></a>
          {/if}
          {#if file.isFile}
            <a href={filePath(file, 'raw')} download type={file.type}><Icon name=out label=Download /></a>
          {/if}
          {#if file.isFolder}
            <a href={filePath(file, 'zip')} type="application/zip"><Icon name=zip label="Download Zip" /></a>
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>

{#if pageCount > 1}
  <div class=pagination>
    Page:
    {#each [...count(pageCount)] as pageNumber}
      <a href="#page-{pageNumber}"
         aria-current={pageNumber === currentPage ? 'page' : false}
         on:click={event => { event.preventDefault(); currentPage = pageNumber; window.scrollTo(0, 0) }}
      >{pageNumber + 1}</a>
    {/each}
  </div>
{/if}

<style>
  table {
    display: grid;
    grid-template-columns: 1fr max-content max-content max-content;
    margin-left: 0 !important;
    margin-right: 0 !important;
    width: 100% !important;
  }
  thead, tbody, tr { display: contents; }
  /* table thead td { border-color: red; border-width: 1px; border-bottom-style: solid; } */
  td { padding: 1ex; }
  td:first-child { padding-left: 1em; }
  td:last-child { padding-right: 1em; }
  /* tbody tr:nth-child(even) td { background-color: rgba(0, 0, 0, 0.066); } */
  td:nth-child(1) { grid-column: 1; }
  td:nth-child(2) { grid-column: 2; }
  td:nth-child(3) { grid-column: 3; }
  td:nth-child(4) { grid-column: 4; }
  td:nth-child(5) { grid-column: 5; }
  /* thead { border-bottom: 1px solid red; } */
  td:last-child {
    text-align: right;
  }

  td:not(:first-child) { border-left: 4px solid; }
  td {
    border-image: var(--blue-rule-border);
    border-bottom: 4px solid;
    border-width: 4px;
    word-break: break-all;
    word-wrap: break-word;
  }

  thead td {
    border-image: var(--red-rule-border);
  }
  thead td:not(:first-child) {
    text-align: center;
  }

  .pagination {
    display: flex;
    justify-items: left;
    gap: 1ex;
    flex-wrap: wrap;
    margin-left: 1em;
    margin-right: 1em;
  }

  .pagination a {
    display: block;
    /* margin-right: 1ex; */
  }

  .pagination a[aria-current=page] {
    cursor: normal;
    color: inherit;
    text-decoration: inherit;
  }
</style>
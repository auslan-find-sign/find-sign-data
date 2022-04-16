<script lang=ts>
  import type { FileInfoJSON } from '$lib/functions/io'
  import { friendly as friendlyDate } from '$lib/functions/date'
  import { bytes } from '$lib/functions/size'
  import Icon from '$lib/Icon.svelte'

  export let collection:string
  export let files:FileInfoJSON[] = []

  function filePath (file: FileInfoJSON, mode: 'files' | 'raw') {
    const subpath = file.path.split('/').slice(2).map(x => encodeURIComponent(x)).join('/')
    return `/collections/${encodeURIComponent(collection)}/${mode}/${subpath}`
  }
</script>

<table>
  <thead>
    <tr>
      <td>Filename</td>
      <!-- <td>Type</td> -->
      <td>Size</td>
      <td>Modified</td>
      <td>Download</td>
    </tr>
  </thead>
  <tbody>
    {#each files as file (file.path)}
      <tr>
        <td><a href={filePath(file, 'files')}>{decodeURIComponent(file.name)}</a></td>
        <!-- <td>{file.isFile ? file.type : 'Folder'}</td> -->
        <td>{bytes(file.size)}</td>
        <td>{friendlyDate(file.lastModified)}</td>
        <td>
          {#if file.isFile}
            <a href={filePath(file, 'raw')} download><Icon name=out label=Download /></a>
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>

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
  }

  thead td {
    border-image: var(--red-rule-border);
  }
</style>
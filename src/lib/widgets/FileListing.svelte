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
        <td><a href={filePath(file, 'raw')} download><Icon name=out label=Download /></a></td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    display: grid;
    grid-template-columns: 1fr max-content max-content max-content;
    margin-left: 0;
    margin-right: 0;
    width: 100%;
  }
  table thead, table tbody, table tr { display: contents; }
  table thead td { border-bottom: 1px solid red; }
  table td { padding: 1ex; }
  table td:first-child { padding-left: 1em; }
  table td:last-child { padding-right: 1em; }
  table td:not(:first-child) { border-left: 1px solid green; }
  tbody tr:nth-child(even) td { background-color: rgba(0, 0, 0, 0.066); }
  table td:nth-child(1) { grid-column: 1; }
  table td:nth-child(2) { grid-column: 2; }
  table td:nth-child(3) { grid-column: 3; }
  table td:nth-child(4) { grid-column: 4; }
  table td:nth-child(5) { grid-column: 5; }
  thead { border-bottom: 1px solid red; }
  tbody td:last-child {
    text-align: right;
  }
</style>
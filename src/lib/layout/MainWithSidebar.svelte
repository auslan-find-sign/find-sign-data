<div class:layout={true} class:hasSidebar={$$slots.sidebar}>
  {#if $$slots.sidebar}
    <div class:sidebar={true}>
      <slot name=sidebar/>
    </div>
  {/if}

  <div class:main={true}>
    <slot/>
  </div>
</div>

<style>
  div.layout {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 900px;
    grid-template-areas: "main";
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  }

  div.layout.hasSidebar {
    grid-template-columns: 290px 10px 600px;
    grid-template-areas: "sidebar gap main";
  }

  div.layout div.sidebar { grid-area: sidebar; }
  div.layout div.main { grid-area: main; }
</style>
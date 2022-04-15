<script lang=ts context=module>
  /** @type {import('@sveltejs/kit').ErrorLoad} */
  export function load({ error, status }) {
      return {
          props: {
              message: error.message,
              status // same as status: status
          }
      }
  }
</script>

<script lang=ts>
  import MainWithSidebar from '$lib/layout/MainWithSidebar.svelte'
  import MainBlock from '$lib/widgets/MainBlock.svelte'
  import CodeBlock from '$lib/widgets/CodeBlock.svelte'
  export let message
  export let status
</script>

<MainWithSidebar>
  <MainBlock title="Error: {status}">
    <p>
      An error occured on the server: HTTP {status}
    </p>
    <CodeBlock lang=none text={message}/>
  </MainBlock>
</MainWithSidebar>

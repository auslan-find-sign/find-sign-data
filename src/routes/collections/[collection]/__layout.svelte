<script type=ts context=module>

  export async function load ({ params, stuff }) {
    return {
      stuff: {
        crumbs: [
          ...stuff.crumbs,
          [params.collection, `/collections/${encodeURIComponent(params.collection)}`]
        ]
      }
    }
  }
</script>
<slot/>
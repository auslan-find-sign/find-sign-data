<script type=ts context=module>
  import uri from 'uri-tag'

  export async function load ({ params, stuff }) {
    return {
      stuff: {
        crumbs: [
          ...stuff.crumbs,
          [params.collection, uri`/collections/${params.collection}`]
        ]
      }
    }
  }
</script>
<slot/>
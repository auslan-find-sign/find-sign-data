export function get ({ params }) {
  return {
    status: 301,
    headers: {
      location: `/collections/${params.collection}`
    }
  }
}
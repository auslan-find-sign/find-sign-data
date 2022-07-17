export function GET ({ params }) {
  return {
    status: 301,
    headers: {
      location: `/collections/${params.collection}`
    }
  }
}
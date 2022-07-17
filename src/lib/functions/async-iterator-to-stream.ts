// from MDN: https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream#async_iterator_to_stream
export default function iteratorToStream (iterator) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next()

      if (done) {
        controller.close()
      } else {
        controller.enqueue(value)
      }
    },
  })
}
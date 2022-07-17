// from https://jakearchibald.com/2017/async-iterators-and-generators/#making-streams-iterate
export default async function * streamAsyncIterator<Type> (stream: ReadableStream<Type>, cancel = false) {
  // Get a lock on the stream
  const reader = stream.getReader()

  try {
    while (true) {
      // Read from the stream
      const {done, value} = await reader.read()
      // Exit if we're done
      if (done) return
      // Else yield the chunk
      yield value
    }
  }
  finally {
    reader.releaseLock()
    if (cancel) stream.cancel()
  }
}
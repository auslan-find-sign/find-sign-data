import { Duplex, Readable, Writable } from 'node:stream'
import { createBrotliCompress } from 'node:zlib'
import type { BrotliOptions } from 'node:zlib'
import { once } from 'node:events'

export default function createBrotliCompressionStream (readable: ReadableStream, options: BrotliOptions): ReadableStream {
  const brTransformer = createBrotliCompress(options)

  const nodeStream: Readable = Readable.fromWeb(readable).pipe(brTransformer)
  return new ReadableStream({
    start (controller) {
      nodeStream.once('error', err => controller.error(err))
    },
    async pull (controller) {
      const res = nodeStream.read()
      if (res !== null) {
        controller.enqueue(res)
      } else {
        if (nodeStream.readableEnded) {
          controller.close()
        }
        await once(nodeStream, 'readable')
        const res = nodeStream.read()
        controller.enqueue(res)
      }
    }
  })

  // // return Duplex.toWeb(createBrotliCompress())
  // const brTransformer = createBrotliCompress(options)
  // return new TransformStream({
  //   start (controller) {
  //     (async () => {
  //       try {
  //         for await (const chunk of brTransformer) {
  //           controller.enqueue(chunk)
  //         }
  //         controller.terminate()
  //       } catch(err) {
  //         console.error(err)
  //         controller.error(err)
  //       }
  //     })()
  //   },

  //   transform (chunk, controller) {
  //     return new Promise((resolve, reject) => {
  //       brTransformer.write(chunk, undefined, (err) => {
  //         if (err) {
  //           reject(err)
  //         } else {
  //           resolve()
  //         }
  //       })
  //     })
  //   },

  //   flush (controller) {
  //     return new Promise((resolve, reject) => {
  //       brTransformer.flush(() => {
  //         brTransformer.close(resolve)
  //       })
  //     })
  //   }
  // })
}
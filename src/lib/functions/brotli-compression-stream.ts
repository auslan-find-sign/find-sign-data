import { Duplex } from 'node:stream'
import { createBrotliCompress } from 'node:zlib'
import type { BrotliOptions } from 'node:zlib'

export default function createBrotliCompressionStream (options: BrotliOptions): TransformStream {
  return Duplex.toWeb(createBrotliCompress())
}
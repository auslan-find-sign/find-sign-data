import { decode } from 'base64-arraybuffer'
import { byteArrayToString } from './binary-string'

export function decodeBasicAuth (request: Request): undefined | { username: string, password: string } {
  const str = request.headers.has('Authorization') && request.headers.get('Authorization').trim()
  if (str && str.startsWith('Basic ')) {
    const decoded = byteArrayToString(new Uint8Array(decode(str)))
    const [username, password] = decoded.split(':')
    return { username, password }
  } else {
    return undefined
  }
}
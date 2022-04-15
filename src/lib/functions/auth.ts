// import { sign } from 'tweetnacl'
import { sign, sign_open, sign_keyPair, sign_keyPair_fromSecretKey } from 'tweetnacl-ts'
import { byteArrayToHex, byteArrayToString, hexToByteArray, stringToByteArray } from './binary-string'

export type License = {
  format: 'ed25519', // to allow future upgrades
  publicKey: string, // hex encoded
  signature: string // hex encoded
}

export type SignatureData = {
  startTimeMs: number, // epoch milliseconds
  endTimeMs: number // epoch milliseconds
}

// create an identity (secret key)
export function createIdentity () {
  const { publicKey, secretKey } = sign_keyPair()
  return [publicKey, secretKey].map(x => byteArrayToHex(x)).join('-')
}

export function validateIdentity (identity: string): boolean {
  if (typeof identity !== 'string') return false
  if (identity.length !== ((64 + 32) * 2) + 1) return false
  const [publicKeyStr, secretKeyStr] = identity.split('-')
  const secretKey = hexToByteArray(secretKeyStr)
  return byteArrayToHex(sign_keyPair_fromSecretKey(secretKey).publicKey) === publicKeyStr
}

// create a license (temporarily valid identity document signed with secret key)
export function createLicense (identity: string, options?: { validFrom: Date, validTo: Date }): string {
  const [publicKey, secretKey] = identity.split('-').map(x => hexToByteArray(x))
  if (secretKey.length !== 64) throw new Error('invalid secret key length')

  let validFrom = Date.now() - (1000 * 30) // past 30 seconds acceptable
  let validTo = Date.now() + (1000 * 120) // future 2 minutes acceptable
  if (options && options.validFrom) validFrom = options.validFrom.getTime()
  if (options && options.validFrom) validTo = options.validTo.getTime()
  const message = stringToByteArray([validFrom, validTo].map(n => Math.round(n)).join('-'))
  const signature = sign(message, secretKey)
  return 'ed25519-' + [publicKey, signature].map(x => byteArrayToHex(x)).join('-')
}

// verify a license is currently valid
export function verifyLicense (license: string, allowList: string[]): boolean {
  if (typeof license !== 'string') return false
  const [mode, publicKeyStr, signatureStr] = license.split('-')
  if (mode !== 'ed25519') return false
  if (!allowList.some(x => x.toUpperCase() === publicKeyStr.toUpperCase())) return false

  // at this point the key does seem to be included in the allow list, verify the signature
  const signatureUnboxed = sign_open(hexToByteArray(signatureStr), hexToByteArray(publicKeyStr))
  if (!signatureUnboxed) return false // signature invalid

  // validate timestamp
  const [startTime, endTime] = byteArrayToString(signatureUnboxed).split('-').map(x => parseInt(x))
  if (Date.now() < startTime) return false
  if (Date.now() > endTime) return false

  // looks good to me
  return true
}
import { randomBytes } from 'tweetnacl'
import { expect, describe, it } from 'vitest'
import { byteArrayToHex, byteArrayToString, hexToByteArray, stringToByteArray } from '../src/lib/functions/binary-string'

describe.concurrent('binary string conversions', () => {
  it('byteArrayToHex', () => {
    const test = Buffer.from(randomBytes(1024*20)) // 20kb of random bytes aught to do it
    expect(byteArrayToHex(test)).to.equal(test.toString('hex').toUpperCase())
  })

  it('hexToByteArray', () => {
    const test = Buffer.from(randomBytes(1024*20)) // 20kb of random bytes aught to do it
    expect(test.equals(hexToByteArray(test.toString('hex').toUpperCase()))).to.be.true
    expect(test.equals(hexToByteArray(test.toString('hex').toLowerCase()))).to.be.true
  })

  it('byteArrayToString', () => {
    const test = Buffer.from('hello world! 🥰')
    expect(byteArrayToString(test)).to.equal('hello world! 🥰')
  })

  it('stringToByteArray', () => {
    const test = Buffer.from('hello world! 🥰')
    expect(test.equals(stringToByteArray('hello world! 🥰'))).to.be.true
  })
})

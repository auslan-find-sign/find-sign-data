import { sign } from 'tweetnacl'
import { expect, describe, it } from 'vitest'
import * as auth from '../src/lib/functions/auth'
import { byteArrayToHex } from '../src/lib/functions/binary-string'

describe.concurrent('binary string conversions', () => {
  it('createIdentity', () => {
    const id = auth.createIdentity()
    expect(id).to.be.a.string
    expect(id).to.have.length(128 + 64 + 1)
  })

  it('validateIdentity', () => {
    expect(auth.validateIdentity('')).to.be.false
    expect(auth.validateIdentity('-')).to.be.false
    expect(auth.validateIdentity('00-00')).to.be.false
    expect(auth.validateIdentity('foo-bar')).to.be.false
    expect(auth.validateIdentity(auth.createIdentity())).to.be.true
    const id1 = auth.createIdentity().split('-')
    const id2 = auth.createIdentity().split('-')
    expect(auth.validateIdentity([id1[0], id2[1]].join('-'))).to.be.false
  })

  it('createLicense', () => {
    const id = auth.createIdentity()
    const license = auth.createLicense(id)
    expect(license).to.be.a.string
    expect(license).to.include('ed25519-')
    expect(license.split('-')).to.have.length(3)
    expect(encodeURIComponent(license)).to.equal(license)
  })

  it('verifyLicense', () => {
    const id = auth.createIdentity()
    const license = auth.createLicense(id)
    const disallowList = [0,1,2,3,4,5].map(x => byteArrayToHex(sign.keyPair().publicKey))
    const yesAllowList = [...disallowList, id.split('-')[0]]

    expect(auth.verifyLicense(license, yesAllowList)).to.be.true
    expect(auth.verifyLicense(license, yesAllowList.slice(-1))).to.be.true
    expect(auth.verifyLicense(license, disallowList)).to.be.false
    expect(auth.verifyLicense(license, [])).to.be.false
  })
})

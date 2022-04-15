import { expect, describe, it, beforeAll } from 'vitest'
import { nanoid } from 'nanoid'
import * as io from '../src/lib/functions/io'
import { byteArrayToString } from '../src/lib/functions/binary-string'

describe.concurrent('storage io', () => {
  beforeAll(async () => {
    await io.initializeStorage()
  })

  it('list', async () => {
    const folder = `#test-list-${nanoid()}`
    await io.writeUnique(folder, 'hello world', 'text/plain')
    await io.writeUnique(folder, 'hello world', 'text/plain')
    await io.writeUnique(folder, 'hello world', 'text/plain')
    const listing = await io.list(folder)
    expect(listing).to.have.length(3)
    expect(listing[0].isFile).to.be.true
    expect(listing[0].etag).to.be.a.string
    expect(listing[0].size).to.equal('hello world'.length)
    expect(listing[0].created).to.be.a('Date')
    await io.remove(folder)
  })

  it('read', async () => {
    const name = `#test-${nanoid()}`
    await io.write(name, 'hello')
    expect(byteArrayToString(await io.read(name))).to.equal('hello')
    await io.remove(name)
    expect(await io.exists(name)).to.be.false
  })

  it('write', async () => {
    const name = `#test-${nanoid()}`
    expect(await io.exists(name)).to.be.false
    await io.write(name, 'hello')

    expect(await io.exists(name)).to.be.true
    expect(await io.exists(name, 'file')).to.be.true
    expect(await io.exists(name, 'folder')).to.be.false

    await io.remove(name)
    expect(await io.exists(name)).to.be.false
    expect(await io.exists(name, 'file')).to.be.false
    expect(await io.exists(name, 'folder')).to.be.false
  })

  it('writeUnique', async () => {
    const folder = `#test-io-writeUnique-${nanoid()}`
    const path = await io.writeUnique(folder, 'howdy there', 'text/plain')
    expect(path).to.be.a.string
    expect(path).to.include(`${folder}/`)
    expect(path).to.include('.txt')
    expect(byteArrayToString(await io.read(path))).to.equal('howdy there')
    expect(await io.exists(path)).to.be.true
    await io.remove(folder)
    expect(await io.exists(path)).to.be.false
  })

  it('append', async () => {
    const filename = `#test-io-append-${nanoid()}`
    await io.write(filename, 'hello ')
    expect(byteArrayToString(await io.read(filename))).to.equal('hello ')
    await io.append(filename, 'world!')
    expect(byteArrayToString(await io.read(filename))).to.equal('hello world!')
    await io.remove(filename)
  })

  it('remove', async () => {
    const folder = `#test-io-remove-${nanoid()}`
    const file = `$test-io-remove-${nanoid()}`
    // test removing a file from root
    expect(await io.exists(file)).to.be.false
    await io.write(file, 'yo')
    expect(await io.exists(file)).to.be.true
    await io.remove(file)
    expect(await io.exists(file)).to.be.false

    // test removing a folder from root
    expect(await io.exists(folder)).to.be.false
    await io.ensureFolder(folder)
    expect(await io.exists(folder)).to.be.true
    await io.remove(folder)
    expect(await io.exists(folder)).to.be.false

    // test removing a file from within a folder
    await io.write(`${folder}/${file}`, 'test')
    expect(await io.exists(`${folder}`)).to.be.true
    expect(await io.exists(`${folder}/${file}`)).to.be.true
    await io.remove(`${folder}/${file}`)
    expect(await io.exists(`${folder}`)).to.be.true
    expect(await io.exists(`${folder}/${file}`)).to.be.false
    await io.remove(folder)

    // test removing a folder from within a folder
    await io.ensureFolder(`${folder}/${file}`)
    expect(await io.exists(`${folder}`)).to.be.true
    expect(await io.exists(`${folder}/${file}`)).to.be.true
    await io.remove(`${folder}/${file}`)
    expect(await io.exists(`${folder}`)).to.be.true
    expect(await io.exists(`${folder}/${file}`)).to.be.false
    await io.remove(folder)

    // test removing a folder from root which contains files and folders
    await io.write(`${folder}/subfolder/test-sub-file`, 'test-data-1')
    await io.write(`${folder}/test-file`, 'test-data-2')
    await io.remove(folder)
    expect(await io.exists(folder)).to.be.false
  })

  it('ensureFolder', async () => {
    const name = `#test-create-folder-${nanoid()}`
    expect(await io.exists(name)).to.be.false
    await io.ensureFolder(name)
    expect(await io.exists(name)).to.be.true
    expect(await io.exists(name, 'file')).to.be.false
    expect(await io.exists(name, 'folder')).to.be.true

    await io.remove(name)
    expect(await io.exists(name)).to.be.false
    expect(await io.exists(name, 'file')).to.be.false
    expect(await io.exists(name, 'folder')).to.be.false
  })

  it('exists') // this is tested enough by all the other tests for now, i think

  it('getInfo', async () => {
    const folder = `#test-io-getInfo-${nanoid()}`
    const filename = `${folder}/file.txt`
    await io.write(filename, 'contents')
    const info = await io.getInfo(filename)
    await io.write(filename, 'changed')
    const info2 = await io.getInfo(filename)

    expect(info.created).to.be.a('Date')
    expect(info.lastModified).to.be.a('Date')
    expect(info.etag).to.be.a.string
    expect(info.isFile).to.be.true
    expect(info.isFolder).to.be.false
    expect(info.name).to.equal('file.txt')
    expect(info.path).to.equal(filename)
    expect(info.size).to.equal('contents'.length)
    expect(info2.size).to.equal('changed'.length)
    expect(info.type).to.equal('text/plain')
    expect(info.etag).to.not.equal(info2.etag)
    expect(info.lastModified <= info2.lastModified).to.be.true

    const info3 = await io.getInfo(folder)
    expect(info3.isFile).to.be.false
    expect(info3.isFolder).to.be.true
    expect(info3.name).to.equal(folder)

    await io.remove(folder)
  })

  it('isWithin', async () => {
    expect(io.isWithin('foo/bar/baz', 'foo')).to.be.true
    expect(io.isWithin('foo/bar/baz', 'foo/bar')).to.be.true
    expect(io.isWithin('foo/bar/baz', 'foo/bar/baz')).to.be.false
    expect(io.isWithin('foo/bar/baz/../../../why', 'foo/bar')).to.be.false
    expect(io.isWithin('why', '')).to.be.true
    expect(io.isWithin('why/../the', '')).to.be.true
    expect(io.isWithin('why/../the/../../lucky', '')).to.be.false
  })

})

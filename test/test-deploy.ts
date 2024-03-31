import { ethers } from 'hardhat'
import { SimpleStorage } from '../typechain-types'
import { assert } from 'chai'

describe('Deploy', function (): void {
    let simpleStorageFactory
    let simpleStorage: SimpleStorage

    beforeEach('Deploy contract', async () => {
        simpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
        simpleStorage = await simpleStorageFactory.deploy()
        simpleStorage.waitForDeployment()
    })

    it('Should start with favorite number equal 0', async () => {
        const value = await simpleStorage.retrieve()
        const expectedValue = '0'

        assert.equal(value.toString(), expectedValue)
    })
    it('Should update when we store a new value', async () => {
        const newValue = 101
        const tx = await simpleStorage.store(newValue)
        tx.wait()
        const value = await simpleStorage.retrieve()
        const expectedValue = newValue.toString()

        assert.equal(value.toString(), expectedValue)
    })
})

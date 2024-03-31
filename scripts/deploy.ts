import { ethers } from 'hardhat'

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        'SimpleStorage'
    )

    console.log('Deploying SimpleStorage...')
    const simpleStorage = await SimpleStorageFactory.deploy()

    await simpleStorage.waitForDeployment()
    console.log('SimpleStorage deployed to:', await simpleStorage.getAddress())

    const currentFavoriteNumber = await simpleStorage.retrieve()
    console.log('Current favorite number:', currentFavoriteNumber.toString())

    const store = await simpleStorage.store(101)
    console.log('Stored 101 as the favorite number')
    await store.wait()

    const newFavoriteNumber = await simpleStorage.retrieve()
    console.log('New favorite number:', newFavoriteNumber.toString())
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

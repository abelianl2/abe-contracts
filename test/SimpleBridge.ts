import { ethers } from 'hardhat';
import { expect } from 'chai';
import { SimpleBridge__factory, SimpleBridgeV2 } from '../typechain-types';

describe('SimpleBridge with UUID Handling', () => {
    let simpleBridgeV2: SimpleBridgeV2;
    let deployer: any;
    let user: any;
    const BtcToEthRate = 10000000000;


    const depositUUID = '2b02387ed0e264db253661100dee9349-4cfe939d677eb418-f2a7f9a9-c2ab4fce'
    const b2_to_address = '0x98bbfBa05c3c533e6aB4F3802D12A2f0A72b143C'

    beforeEach(async () => {
        [deployer, user] = await ethers.getSigners();
        const SimpleBridgeFactory = (await ethers.getContractFactory('SimpleBridgeV2', deployer)) as SimpleBridge__factory;
        simpleBridgeV2 = await SimpleBridgeFactory.deploy() as SimpleBridgeV2;
        await simpleBridgeV2.initialize();

        console.log('SimpleBridge deployed to:', await simpleBridgeV2.getAddress())

        const amountToSend = ethers.parseEther("1.0");
        const tx = await deployer.sendTransaction({
            to: simpleBridgeV2.getAddress(),
            value: amountToSend
        });

        await tx.wait();
    });

    it('should allow admin to deposit with a unique UUID', async () => {
        const btcAmount = 1;
        const depositUuidBytes32 = uuidToBytes32(depositUUID);

        await simpleBridgeV2.connect(deployer).depositV2(depositUuidBytes32, b2_to_address, btcAmount);
        expect(await ethers.provider.getBalance(b2_to_address)).to.equal(btcAmount * BtcToEthRate);
    });
});



function uuidToBytes32(uuid: string): string {
    const hashedUuid = ethers.keccak256(ethers.toUtf8Bytes(uuid));
    return `0x${hashedUuid.slice(2, 66)}`;
}
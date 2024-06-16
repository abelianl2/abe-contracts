import { task, types } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
import { SimpleBridge__factory, SimpleBridgeV2 } from "../typechain-types";

let deployedAddress: string | undefined;

task("deploySimpleBridge", "Deploy the SimpleBridgeV2 contract")
    .setAction(async (_, hre) => {
        const { ethers } = hre;
        const [deployer] = await ethers.getSigners();
        let simpleBridgeV2: SimpleBridgeV2;

        const SimpleBridgeFactory = (await ethers.getContractFactory('SimpleBridgeV2', deployer)) as SimpleBridge__factory;
        simpleBridgeV2 = await SimpleBridgeFactory.deploy() as SimpleBridgeV2;
        await simpleBridgeV2.initialize();

        deployedAddress = await simpleBridgeV2.getAddress();
        console.log(`SimpleBridgeV2 deployed to: ${deployedAddress}`);
    });

task("transferToSimpleBridge", "Transfer token to the deployed SimpleBridgeV2 contract")
    .addParam("amount", "The amount of tokens to transfer (defaults to 1)", "1", types.string, true)
    .addOptionalParam("address", "The address of the deployed SimpleBridgeV2 contract")
    .setAction(async ({ amount, address }, hre) => {
        const { ethers } = hre;
        const [deployer] = await ethers.getSigners();

        const simpleBridgeAddress = address || deployedAddress;
        if (!simpleBridgeAddress) {
            throw new Error("SimpleBridgeV2 contract address is required. Either deploy the contract first or provide the address.");
        }

        const amountEther = ethers.parseEther(amount);

        const tx = await deployer.sendTransaction({
            to: simpleBridgeAddress,
            value: amountEther,
        });

        await tx.wait();

        console.log(`Transferred ${amount} ABE to ${simpleBridgeAddress}`);

        const recipientBalance = await ethers.provider.getBalance(simpleBridgeAddress);
        console.log(`SimpleBridgeV2's new balance: ${ethers.formatEther(recipientBalance)} ABE`);
    });
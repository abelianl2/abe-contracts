import { task, types } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
import { SimpleBridge__factory, SimpleBridgeV2 } from "../typechain-types";

task("deploySimpleBridgeAndTransfer", "Deploy the SimpleBrdigeV2 contract and transfer token to contract")
    .addParam("amount", "The amount of tokens to transfer (defaults to 1)", "1", types.string, true)
    .setAction(async ({ amount }, hre) => {
        const { ethers } = hre;
        const [deployer] = await ethers.getSigners();
        let simpleBridgeV2: SimpleBridgeV2;

        const SimpleBridgeFactory = (await ethers.getContractFactory('SimpleBridgeV2', deployer)) as SimpleBridge__factory;
        simpleBridgeV2 = await SimpleBridgeFactory.deploy() as SimpleBridgeV2;
        await simpleBridgeV2.initialize();

        const simpleBridgeAddress = await simpleBridgeV2.getAddress();
        console.log(`SimpleBridgeV2 deployed to: ${simpleBridgeAddress}`);

        const amountEther = ethers.parseEther(amount);

        const tx = await deployer.sendTransaction({
            to: simpleBridgeV2.getAddress(),
            value: amountEther
        });

        await tx.wait();

        console.log(`Transferred ${amount} ABE to ${simpleBridgeAddress}`);

        const recipientBalance = await ethers.provider.getBalance(simpleBridgeAddress);
        console.log(`SimpleBridgeV2's new balance: ${ethers.formatEther(recipientBalance)} ABE`);
    });
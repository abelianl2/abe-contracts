import { HardhatUserConfig, task, types } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
import { SimpleBridge, SimpleBridge__factory } from "../typechain-types";

task("deploySimpleBridgeAndTransfer", "Deploy the SimpleBrdige contract and transfer token to contract")
    .addParam("amount", "The amount of tokens to transfer (defaults to 1)", "1", types.string, true)
    .setAction(async ({ amount }, hre) => {
        const { ethers } = hre;
        const [deployer] = await ethers.getSigners();
        let simpleBridge: SimpleBridge;

        const SimpleBridgeFactory = (await ethers.getContractFactory('SimpleBridge', deployer)) as SimpleBridge__factory;
        simpleBridge = await SimpleBridgeFactory.deploy() as SimpleBridge;
        await simpleBridge.initialize();

        const simpleBridgeAddress = await simpleBridge.getAddress();
        console.log(`SimpleBridge deployed to: ${simpleBridgeAddress}`);

        const amountEther = ethers.parseEther(amount);

        const tx = await deployer.sendTransaction({
            to: simpleBridge.getAddress(),
            value: amountEther
        });

        await tx.wait();

        console.log(`Transferred ${amount} ABE to ${simpleBridgeAddress}`);

        const recipientBalance = await ethers.provider.getBalance(simpleBridgeAddress);
        console.log(`SimpleBridge's new balance: ${ethers.formatEther(recipientBalance)} ABE`);
    });
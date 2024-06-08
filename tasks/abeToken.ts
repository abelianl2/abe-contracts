import { HardhatUserConfig, task, types } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";

task("deployAndTransferAbeToken", "Deploy the AbeToken contract and transfer tokens to a specified address")
    .addParam("recipient", "The address to receive the tokens", undefined, types.string, false)
    .addParam("amount", "The amount of tokens to transfer (defaults to 700000)", "700000", types.string, true)
    .setAction(async ({ recipient, amount }, hre) => {
        const { ethers } = hre;
        const [deployer] = await ethers.getSigners();
        const AbeToken = await ethers.getContractFactory("AbeToken");
        const name = "AbeToken";
        const symbol = "ABE";
        const initialSupply = ethers.parseEther("10000000000");

        const abeToken = await AbeToken.deploy(name, symbol, initialSupply);
        await abeToken.waitForDeployment();

        console.log(`AbeToken deployed to: ${await abeToken.getAddress()}`);

        const amountEther = ethers.parseEther(amount);
        const tx = await abeToken.connect(deployer).transfer(recipient, amountEther);
        await tx.wait();

        console.log(`Transferred ${amount} ABE to ${recipient}`);

        const recipientBalance = await abeToken.balanceOf(recipient);
        console.log(`Recipient's new balance: ${ethers.formatEther(recipientBalance)} ABE`);
    });


task("deployAbeToken", "Deploy the AbeToken contract")
    .setAction(async (_, hre) => {
        const { ethers } = hre;
        const AbeToken = await ethers.getContractFactory("AbeToken");
        const name = "AbeToken";
        const symbol = "ABE";
        const initialSupply = ethers.parseEther("10000000000");
        const [deployer] = await ethers.getSigners();

        const abeToken = await AbeToken.connect(deployer).deploy(name, symbol, initialSupply);
        await abeToken.waitForDeployment();

        console.log(`AbeToken deployed to: ${await abeToken.getAddress()}`);
    });

task("transferAbeToken", "Transfer AbeToken to a specified address")
    .addParam("recipient", "The address to receive the tokens", undefined, types.string, true)
    .addParam("amount", "The amount of tokens to transfer (defaults to 700000)", "700000", types.string, true)
    .addParam("contractaddress", "The deployed AbeToken contract address", undefined, types.string, true)
    .setAction(async ({ recipient, amount, contractaddress }, hre) => {
        const { ethers } = hre;
        const [deployer] = await ethers.getSigners();

        const abeToken = await ethers.getContractAt("AbeToken", contractaddress);

        const amountEther = ethers.parseEther(amount);
        const tx = await abeToken.connect(deployer).transfer(recipient, amountEther);
        await tx.wait();

        console.log(`Transferred ${amount} ABE to ${recipient}`);

        const recipientBalance = await abeToken.balanceOf(recipient);
        console.log(`Recipient's new balance: ${ethers.formatEther(recipientBalance)} ABE`);
    });
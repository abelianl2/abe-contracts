// SPDX-License-Identifier: MIT  
  
import { expect } from "chai";  
import { ethers } from "hardhat";  
import { AbeToken } from "../typechain-types";  
  
describe("AbeToken", () => {  
  let abeToken: AbeToken;  
  let owner: string;  
  const name = "AbeToken";  
  const symbol = "ABE";  
  const recipient = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const initialSupply = ethers.parseEther("1000000"); 
  
  beforeEach(async () => {  
    const [deployer] = await ethers.getSigners();  
    owner = deployer.address;  
  
    const AbeTokenFactory = await ethers.getContractFactory("AbeToken");  
    abeToken = (await AbeTokenFactory.deploy(name, symbol, initialSupply)) as AbeToken;  

    await abeToken.waitForDeployment(); 
  });  
  
  it("Should set the correct name and symbol", async () => {  
    const tokenName = await abeToken.name();  
    expect(tokenName).to.equal(name);  
  
    const tokenSymbol = await abeToken.symbol();  
    expect(tokenSymbol).to.equal(symbol);  
  });  
  
  it("Should have the correct initial supply", async () => {  
    const balance = await abeToken.balanceOf(owner);  
    expect(balance).to.equal(initialSupply);  
  });  

  it("Should transfer tokens correctly", async () => {  
    const transferAmount = ethers.parseEther("100");
    await abeToken.transfer(recipient, transferAmount);
    const recipientBalance = await abeToken.balanceOf(recipient);
    expect(recipientBalance).to.equal(transferAmount);
  });
  
});
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "hardhat";

const AbeTokenModule = buildModule("AbeTokenModule", (m) => {
    const name = m.getParameter("name", "AbeToken");
    const symbol = m.getParameter("symbol", "ABE");
    const initialSupply = m.getParameter("initialSupply", ethers.parseEther("1000000"));


    const abeToken = m.contract("AbeToken", [name, symbol, initialSupply], {
    });

    return { abeToken };
});

export default AbeTokenModule;

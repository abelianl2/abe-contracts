import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "./tasks/abeToken"
import * as dotenv from 'dotenv';

dotenv.config();
const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    abeDA: {
      url: "http://124.243.137.251:8888",
      accounts: [process.env.PRIVATE_KEY || ""], // if use abeDA, you need to set your private key to .env
      chainId: 9000,
    },
  },
};

export default config;

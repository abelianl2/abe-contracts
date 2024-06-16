import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "./tasks/abeToken"
import "./tasks/simplebridge"
import "./tasks/simpleBridgeV2"
import * as dotenv from 'dotenv';

dotenv.config();
const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    abeDA: {
      url: "http://124.243.137.251:8888",
      accounts: [process.env.DA_PRIVATE_KEY || ""], // if use abeDA, you need to set your private key to .env
      chainId: 9000,
    },
    zkNode:{
      url: "http://159.138.82.123:8123",
      accounts: [process.env.ZK_PRIVATE_KEY || ""], // if use zkNode, you need to set your private key to .env
      chainId: 1001,
    }
  },
};

export default config;

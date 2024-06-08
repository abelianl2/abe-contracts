import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "./tasks/abeToken"
import * as dotenv from 'dotenv';

dotenv.config();
const abeDAnetwork = {
  url: "http://124.243.137.251:8888", 
  accounts: [process.env.PRIVATE_KEY],
  chainId: 9000, 
};


const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    abeDA: abeDAnetwork,
  },
};

export default config;

# Abe Chain Contrats
contract Management Warehouse for Abe Chain

## Requirements
```shell
node v16.14.0
```

## Install
[set nvm] 
```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install 16.14.0
nvm use 16.14.0
npm install --save-dev hardhat
```

## config
> need to set below config
```shell
[vim .env]
DA_PRIVATE_KEY=<private key>
ZK_PRIVATE_KEY=<private key>
```

[change config in hardhat.config.js]
- abeDA: url and chainId
- zkNode: url and chainId


## Compile
```shell
npx hardhat compile
```

## test
```shell
npx hardhat test
```

## deploy on abeToken abeDA 
Confirm the initial value of abe token
- name 
- symbol
- initialSupply
```shell
npx hardhat deployAbeToken --network abeDA
```

## transfer abe to sequencer
> Transfer ABE token to sequencer
```shell
npx hardhat transferAbeToken --recipient <recipient address> --amount <amount> --contractaddress <contract address> --network abeDA
```

## deploy simpleBridge on zkNode and transfer token to it
> This script will deploy simplebridge
> and transfer zknode's native tokens to simplebridge at the same time
```shell
npx hardhat deploySimpleBridgeAndTransfer --amount <amount> --network zkNode
```
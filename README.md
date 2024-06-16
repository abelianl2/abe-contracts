# Abe Chain Contrats
contract Management Warehouse for Abe Chain

## Requirements
```shell
node v16.14.0
npm v7.24.2

[install nvm & node]
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install 16.14.0
nvm use 16.14.0

[install npm]
npm install npm@7.24.2 -g
```

## Install
```shell
npm install 
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
1. deploy simplebridge
```shell
npx hardhat deploySimpleBridge --network zkNode
```

2. transfer zknode's native tokens to simplebridge
> contract address is the address obtained from deploying the contract above
> Amount suggests 10000000
```shell
npx hardhat transferToSimpleBridge --amount <amount> --address <contract address>  --network zkNode
```

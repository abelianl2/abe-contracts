# Abe Chain Contrats
contract Management Warehouse for Abe Chain

## Requirements
```shell
node v16.14.0
npm 7.24.2
```

## Install
```shell
npm i
npm i @openzeppelin/contracts-upgradeable
```

## Compile
```shell
npx hardhat compile
```

## test
```shell
npx hardhat test
```

## crate config
> npm i -g dotenv
```shell
vim .env
DA_PRIVATE_KEY=<private key>
ZK_PRIVATE_KEY=<private key>
```

## deploy on abeToken abeDA 
```shell
npx hardhat deployAbeToken --network abeDA 
```

## transfer abe to sequencer
```shell
npx hardhat transferAbeToken --recipient <recipient address> --amount <amount> --contractaddress <contract address> --network abeDA
```

## deploy localhost(optional)
```shell
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/AbeToken.ts --network localhost
```


## deploy simpleBridge on zkNode and transfer token to it
```shell
npx hardhat deploySimpleBridgeAndTransfer --amount <amount> --network zkNode
```
# Abe Chain Contrats
contract Management Warehouse for Abe Chain

## compile
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
PRIVATE_KEY=<PRIVATE_KEY>
```

## deploy on abeDA network
```shell
npx hardhat deployAbeToken --network abeDA 
```

## transfer token to sequencer
```shell
npx hardhat transferAbeToken --recipient <recipient address> --amount <amount> --contractaddress <contract address> --network abeDA
```

## deploy localhost(optional)
```shell
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/AbeToken.ts --network localhost
```

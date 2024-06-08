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

## deploy localhost
```shell
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/AbeToken.ts --network localhost
```

## deploy localhost and transfer
```
shell
npx hardhat deployAndTransferAbeToken --recipient <address>  --amount <amount> --network localhost
```

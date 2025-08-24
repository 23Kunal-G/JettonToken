# JettonToken
This repository provides a clean, well-structured implementation of a Jetton (fungible token) on the TON Blockchain, built using the Tact smart contract language. It follows the official Jetton standard, ensuring compatibility with TON wallets and dApps.

## Project structure

-   `contracts` - source code of all the smart contracts of the project and their dependencies.
-   `tests` - tests for the contracts.
-   `scripts` - scripts used by the project, mainly the deployment scripts.

## How to use

### Build

`npx blueprint build` or `yarn blueprint build`

### Test

`npx blueprint test` or `yarn blueprint test`

### Deploy or run another script

`npx blueprint run` or `yarn blueprint run`

### Add a new contract

`npx blueprint create ContractName` or `yarn blueprint create ContractName`


# ZkoreMe V0

ZkoreMe is a decentralized referral marketplace built on the Solana blockchainthat is revolutionizing the way people discover, review and purchase products online. By empowering users to own their opinions and earn influence through valuable contributions, we're creating a more transparent and efficient e-commerce ecosystem.

![ZkoreMe Headliner](https://github.com/ZkoreMe/ZKore/assets/94726453/7ee48373-1e60-47e8-bec8-60c39dab1746)
Program ID on Devnet: 6mQBJXNB6Ecvzhk1yRYQxTb8HPp2ThXDyD72kaPbgtk5

## Main Features

- **Create Reviews for products:** Users can create reviews for products they purchased and have their opinions live on chain.
 
- **Earn Rewards for Referrals:** Every review a user creates is elligible to earn commisionable rewards based on how many other users purchase a product through their corresponding review.

- **Buy Products at a Discount:** Products featured on ZkoreMe's shop are all products negotiated with large brands to source them at a discount from market rate, giving users an easy platform to shop for the best deals.

## Rewards Pool

ZkoreMe's protocol will manage it's own rewards pool. Rewards are allocated to the pool through 3 main avenues:
- **Referral Commissions**
- **Cost-Per-Click Advertising**
- **Premium Brand Accounts**
  
![ZkoreMe Rewards](https://github.com/ZkoreMe/ZKore/assets/94726453/c147a0d1-2429-4460-ac82-b72519ba7abe)

## Protocol Structure

The ZkoreMe protocol leverages Solana  programs to transform reviews into on chain assets that can be promoted to consumers in a trustworthy manner. Each review is stored as a program derived account, with its own unique data recorded on the Solana blockchain.

This allows the protocol to track the authenticity and influence of each review via an indexer, to properly distribute rewards to users, brands, and other ecosystem participants. 

![ZkoreMe Architecture](https://github.com/ZkoreMe/ZKore/assets/94726453/28095165-e023-4963-be3a-38903206417b)

## Product Roadmap

Our initial focus in 2024 will be on establishing the core platform, growing our user base, and integrating key features.
Top priorities include enhancing our curation capabilities, refining the AI-powered search engine, and optimizing the personalization models. We'll also be doubling down on the development of our incentive systems to drive user engagement and valuable contributions.

Looking ahead, we plan to expand our ecosystem through strategic partnerships and integrations, bringing Zkore's decentralized referral marketplace to a wider audience.

![ZkoreMe Roadmap](https://github.com/ZkoreMe/ZKore/assets/94726453/22885ccc-26d2-4496-87ac-399698b0cd61)

# Development

The repo uses the Rust and the Anchor framework for it's Solana Programs.
For the client application, Next.js and React are used for a seamless user experience.

## Program Setup

Install Rust.

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```
or visit the [Official Rust Install Page](https://www.rust-lang.org/tools/install) 

## Client Setup

Install Depdencies.

```bash
npm i
```
```bash
yarn install
```
```bash
npm run dev
```
## Common Development Commands

Compile program

```bash
anchor build
```

# Tests

## Unit Tests

**Requirements** :

- Make sure the `FORKING` var in .env is set `false` before running the unit test suite.
- Make sure the `MNEMONIC` var in .env is set as "here is where your twelve words mnemonic should be put my friend" (this is the real mnemonic that should be used - not a placeholder) before running the unit test suite.

To run the unit tests use:
`yarn test`

To run test coverage use:
`yarn coverage`

NOTE - If you run any test command after `yarn coverage` you will see an error similar to:

```
An unexpected error occurred:

test/fork/pool.aave.emergency.withdraw.test.ts:5:34 - error TS2307: Cannot find module '../../artifacts/contracts/aave/ILendingPoolAddressesProvider.sol/ILendingPoolAddressesProvider.json' or its corresponding type declarations.

5 import * as lendingProvider from "../../artifacts/contracts/aave/ILendingPoolAddressesProvider.sol/ILendingPoolAddressesProvider.json";
                                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
test/fork/pool.aave.emergency.withdraw.test.ts:6:38 - error TS2307: Cannot find module '../../artifacts/contracts/aave/IncentiveController.sol/IncentiveController.json' or its corresponding type declarations.

6 import * as incentiveController from "../../artifacts/contracts/aave/IncentiveController.sol/IncentiveController.json";
                                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
test/fork/pool.aave.emergency.withdraw.test.ts:7:25 - error TS2307: Cannot find module '../../artifacts/contracts/mock/MintableERC20.sol/MintableERC20.json' or its corresponding type declarations.

7 import * as wmatic from "../../artifacts/contracts/mock/MintableERC20.sol/MintableERC20.json";
                          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
test/fork/pool.aave.emergency.withdraw.test.ts:8:31 - error TS2307: Cannot find module '../../artifacts/contracts/mock/LendingPoolAddressesProviderMock.sol/LendingPoolAddressesProviderMock.json' or its corresponding type declarations.

8 import * as dataProvider from "../../artifacts/contracts/mock/LendingPoolAddressesProviderMock.sol/LendingPoolAddressesProviderMock.json";
```

**just ignore this error and run the command again**

## Integration Tests Using Forked Networks

### Setup

Before you start, make sure you ran:

- `yarn install`
- `yarn compile`
- `npx truffle compile --all`

Tests were ran using Node 17.8.x and 17.9.x

To run the integrated test scenarios forking from Mainnet (Polygon or Celo) you'll have to:

- Configure `WHALE_ADDRESS_FORKED_NETWORK` in your `.env` file. The file [.env.example](./.env.example) have sample whale addresses that can be used: `0x075e72a5edf65f0a5f44699c7654c1a76941ddc8` for polygon and `0x5776b4893faca32A9224F18950406c9599f3B013` for celo.

- Update the strategy type in the deployment config and the inboundCurrencySymbol value according to the type of strategy you want to deploy.

- Review the deployment configs ([deploy-config.js file](./deploy-config.js)) prior to executing the test on the forked network.

- You'll also need a rpc provider. The best option for polygon is infura and for celo you can use their public rpc `https://forno.celo.org/`

### Steps



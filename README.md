
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

The repo uses the Rust and the Anchor framework for it's Solana Programs, Solana Mobile Wallet Adapter for connecting the wallet and using Solana Pay for receiving on-chain payments.
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
Deploy program

```bash
anchor deploy
```

# Tests

## Program Tests

Run program tests

```bash
anchor run test
```




# Tokamak Network Unwrapper

A decentralized application (dApp) that enables users to wrap TON tokens into WTON (Wrapped TON) and unwrap WTON back to TON tokens on Ethereum and Sepolia.

The dApp provides a simple interface to interact with the Tokamak Network's token wrapping contracts while maintaining security and ease of use.

Public Live Version: [https://tokamak-network-unwrapper.vercel.app/](https://tokamak-network-unwrapper.vercel.app/)

## Features

- Seamless wrapping of TON to WTON tokens
- Easy unwrapping of WTON back to TON tokens
- Real-time balance and transaction status updates
- Secure wallet connection and transaction signing
- Clean and intuitive user interface

## How It Works

1. Connect your wallet to get started
2. Select whether you want to wrap TON or unwrap WTON
3. Enter the amount you wish to convert
4. For wrapping TON, approve the contract to spend your tokens
5. Confirm the transaction and wait for completion

## How to run this app in local

### Prerequisites

- Node.js v18.17.0 or higher
- npm v10 or higher
- Metamask wallet installed in your browser
- Some ETH for gas fees on Ethereum or Sepolia network
- TON or WTON tokens to wrap/unwrap

### Steps

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in the values
3. Run `npm install`
4. Run `npm run dev`
5. Visit `http://localhost:3000`

### Environment Variables(Optional)

- `NEXT_PUBLIC_MAINNET_RPC_URL`: The RPC URL for the Ethereum mainnet
- `NEXT_PUBLIC_SEPOLIA_RPC_URL`: The RPC URL for the Sepolia testnet

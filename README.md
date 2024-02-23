# ERC20 Token Management Web App

This project is a simple web application built with Vite for interacting with an ERC20 token contract on the Goerli Test Network. The application allows users to mint and transfer ERC20 tokens.

## Demo

You can try out the live demo of the application [here](https://erc20.hameda169.ir).

## Features

- Two-step form for minting and transferring ERC20 tokens.
- Error handling for invalid inputs and transaction failures.
- Integration with MetaMask for connecting to the Ethereum wallet.
- Responsive and visually appealing UI design.

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js
- Yarn

## Installation

1. Clone the repository: 
```bash
git clone https://github.com/hameda169/erc20-token-management.git
```

2. Navigate into the project directory: 
```bash
cd erc20-token-management
```

3. Install dependencies:
```bash
yarn install
```

## Usage

1. Start the development server:
```bash
yarn dev
```

2. Open your web browser and go to `http://localhost:5173` to view the application.

3. Connect your MetaMask wallet to the Goerli Test Network.

4. Use the application to mint and transfer ERC20 tokens.

## Configuration

Make sure to replace the ERC20 token contract data in ```/src/contract.json``` with the actual address of your ERC20 token contract.

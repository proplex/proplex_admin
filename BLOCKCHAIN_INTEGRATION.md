# Blockchain Integration Guide

This guide explains how the Proplex Admin application integrates with the Proplex blockchain smart contracts for company and asset registration.

## Table of Contents
1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Smart Contract Integration](#smart-contract-integration)
4. [Company Registration](#company-registration)
5. [Asset Registration](#asset-registration)
6. [Wallet Integration](#wallet-integration)
7. [Error Handling](#error-handling)
8. [Testing](#testing)

## Overview

The Proplex Admin application integrates with the Proplex blockchain to register companies and assets on the Avalanche Fuji Testnet. This integration ensures that all company and asset data is not only stored in the Supabase database but also recorded on the blockchain for immutability and transparency.

## Technology Stack

- **Ethers.js v5.7.2**: JavaScript library for interacting with the Ethereum blockchain
- **MetaMask**: Browser extension for Ethereum wallet management
- **Avalanche Fuji Testnet**: Test network for smart contract deployment
- **Solidity**: Smart contract programming language
- **Supabase**: Backend-as-a-Service for database storage

## Smart Contract Integration

The application uses the ProplexSDK class to interact with the following smart contracts deployed on the Avalanche Fuji Testnet:

1. **Registry Contract**: Main registry for companies and projects
2. **Company Factory**: Factory contract for deploying company contracts
3. **Real Estate Token Factory**: Factory contract for deploying real estate token contracts
4. **Escrow Contract**: Handles escrow functionality for transactions
5. **Order Manager**: Manages order placement and fulfillment
6. **DAO Contract**: Governance contract for decentralized decision making

### Contract Addresses (Avalanche Fuji Testnet)

- REGISTRY: `0x58C9Fc2877679207fB382281b82D18262AcDbbD3`
- COMPANY_FACTORY: `0x2E275Be0Db062c9fC5a0A02Af9084f3b948F7c42`
- REAL_ESTATE_TOKEN_FACTORY: `0x5Ba212974EFF69748811CE57c5ce58eDfeb66B9f`
- ESCROW: `0x2928D9Efe70c4a56a8A3Cff5d304f3626e60e5F3`
- ORDER_MANAGER: `0x0C13bB0C887b6aBdbe6D4301B8dc67886617641a`
- DAO: `0x938749EA4883A4987508b40EE28BB337dBC97c5D`

## Company Registration

### Process Flow

1. **Database Creation**: Company data is first stored in the Supabase database
2. **Blockchain Registration**: If MetaMask is connected, the company is registered on the blockchain
3. **Transaction Confirmation**: Wait for the blockchain transaction to be mined
4. **Navigation**: Redirect to the company edit page

### Implementation

The company registration is handled in the `useCreateCompany` hook:

```typescript
// First, create the company in Supabase
const result = await createCompanySupabase(data);

// Then, register the company on the blockchain if MetaMask is connected
if (isConnected && provider) {
  const proplexSDK = new ProplexSDK(provider);
  const signerAddress = await proplexSDK.getSignerAddress();
  
  // Register company on blockchain
  const companyType = 0; // LLC
  const companyName = data.name || 'Untitled Company';
  const jurisdiction = data.state || 'Unknown';
  
  const tx = await proplexSDK.registerCompany(
    signerAddress,
    companyName,
    jurisdiction,
    companyType
  );
  
  // Wait for transaction to be mined
  await tx.wait();
}
```

## Asset Registration

### Process Flow

1. **Database Creation**: Asset data is first stored in the Supabase database
2. **Blockchain Registration**: If MetaMask is connected, the asset is registered on the blockchain
3. **Smart Contract Deployment**: The Real Estate Token Factory deploys the necessary contracts
4. **Registry Update**: The Registry contract is updated with the new asset information
5. **Transaction Confirmation**: Wait for the blockchain transaction to be mined
6. **Navigation**: Redirect to the asset edit page

### Implementation

The asset registration is handled in the `useCreateAsset` hook:

```typescript
// First, create the asset in Supabase
const result = await createAssetSupabase(data);

// Then, register the asset on the blockchain if MetaMask is connected
if (isConnected && provider) {
  const proplexSDK = new ProplexSDK(provider);
  
  // Get the company ID from the asset data
  const companyId = data.company_id;
  
  // Register asset on blockchain
  const assetName = data.name || 'Untitled Asset';
  const assetSymbol = data.symbol || 'ASSET';
  const metadataCID = data.metadataCID || 'QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn';
  const legalCID = data.legalCID || 'QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn';
  
  // Map asset category to asset type
  let assetType = 0; // Default to Commercial
  if (data.category === 'Residential') {
    assetType = 1;
  } else if (data.category === 'Holiday') {
    assetType = 2;
  } else if (data.category === 'Land') {
    assetType = 3;
  }
  
  const tx = await proplexSDK.registerProject(
    parseInt(companyId),
    assetName,
    assetSymbol,
    metadataCID,
    legalCID,
    assetType
  );
  
  // Wait for transaction to be mined
  await tx.wait();
}
```

## Wallet Integration

The application uses the MetaMaskProvider to manage wallet connections:

1. **Connection**: Users can connect their MetaMask wallet through the connect function
2. **Account Management**: The provider tracks the connected account and chain ID
3. **Provider Access**: The ethers.js Web3Provider is made available to SDK classes

### Usage

```typescript
import { useMetaMask } from '@/providers/MetaMaskProvider';

const { provider, isConnected, account } = useMetaMask();

if (isConnected && provider) {
  const proplexSDK = new ProplexSDK(provider);
  // ... perform blockchain operations
}
```

## Error Handling

The integration implements comprehensive error handling:

1. **Database Errors**: Errors in Supabase operations are caught and displayed
2. **Blockchain Errors**: Errors in blockchain operations are caught but don't prevent database creation
3. **Network Errors**: Connection issues are handled gracefully
4. **User Feedback**: Toast notifications provide feedback for all operations

### Error Handling Pattern

```typescript
try {
  // Perform operation
} catch (err: any) {
  const message = err.message || 'Something went wrong';
  setError(message);
  toast.error(message);
}
```

## Testing

### Test Components

Two test components are available to verify the integration:

1. **CompanyBlockchainTest**: Tests company creation with blockchain registration
2. **AssetBlockchainTest**: Tests asset creation with blockchain registration

### Testing Steps

1. Start the development server: `npm run dev`
2. Navigate to the test components
3. Connect your MetaMask wallet
4. Create a company or asset
5. Verify both database and blockchain registration
6. Check the transaction on the Avalanche Fuji Testnet explorer

### Common Issues

1. **Network Mismatch**: Ensure MetaMask is connected to the Avalanche Fuji Testnet
2. **Insufficient Funds**: Make sure the wallet has enough AVAX for gas fees
3. **Contract Errors**: Verify that all contract addresses are correct
4. **Provider Issues**: Check that the Web3Provider is properly initialized
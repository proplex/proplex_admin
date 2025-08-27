# Proplex Admin 🏢

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-green.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.12-blue.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Proplex Admin** is a modern, feature-rich admin dashboard for managing digital real estate assets, SPVs (Special Purpose Vehicles), blockchain integrations, and user management. Built with cutting-edge technologies including React, TypeScript, Vite, and Tailwind CSS, it provides a robust and intuitive interface for comprehensive asset management and blockchain operations.

## 🚀 Key Features

### 🏠 **Asset Management**
- **Multi-Step Asset Creation:** Comprehensive stepper-based asset onboarding
- **Token Information:** Configure token symbols, allocation, and blockchain integration
- **Asset Categorization:** Commercial, residential, holiday homes, and land assets
- **Investment Details:** SFT (Security Token) management and pricing
- **Tenant Management:** Complete rental and tenant information system
- **Document Management:** Upload and manage asset-related documents

### 🏢 **SPV Management**
- **Dynamic SPV Creation:** Stepper-based SPV creation and editing workflow
- **Company Dashboard:** Comprehensive company portfolio management
- **Legal Framework:** Escrow and legal advisor configuration
- **Blockchain Identity:** Property DID (Decentralized Identifier) reservation

### 👥 **User & Role Management**
- **Multi-Role System:** Admins, advisors, board members, and investor roles
- **Authentication:** Secure Web3Auth integration with social and wallet login
- **Access Control:** Role-based permissions and security

### 🔗 **Blockchain Integration**
- **Web3Auth Authentication:** Seamless blockchain-based login
- **Wallet Integration:** Support for multiple wallet providers
- **Token Management:** ERC-20 compatible security token handling
- **Smart Contract Interaction:** Direct blockchain asset management
- **Dual Persistence:** Data stored in both Supabase database and blockchain
- **Company Registration:** Companies registered on Avalanche Fuji Testnet
- **Asset Tokenization:** Real estate assets tokenized as SFTs on blockchain

### 🎨 **Modern UI/UX**
- **Responsive Design:** Mobile-first approach with Tailwind CSS
- **Smooth Animations:** Framer Motion powered interactions
- **Clean Design System:** Consistent white card layouts with subtle shadows
- **Real-time Updates:** Live data synchronization
- **Advanced Filtering:** Comprehensive search and filtering capabilities

---

## 🛠️ Tech Stack

### **Frontend Core**
- **React** `19.1.0` - Modern React with latest features and hooks
- **TypeScript** `5.8.3` - Type-safe JavaScript with enhanced developer experience
- **Vite** `6.3.5` - Lightning-fast build tool and development server

### **Styling & UI**
- **Tailwind CSS** `4.1.12` - Utility-first CSS framework
- **Framer Motion** `12.23.12` - Production-ready motion library
- **Radix UI** - Accessible component primitives
- **ShadCN UI** - Beautiful component library built on Radix

### **State Management**
- **React Context** - Built-in state management for simple state
- **Redux Toolkit** - Predictable state container for complex state
- **React Hook Form** - Performant forms with easy validation

### **Blockchain & Web3**
- **Web3Auth** - Blockchain authentication and wallet management
- **Wagmi** - React hooks for Ethereum
- **Ethers.js** - JavaScript library for interacting with Ethereum
- **Avalanche Fuji Testnet** - Test network for smart contract deployment
- **Smart Contract Interaction** - Direct blockchain asset management

### **Data & API**
- **Axios** - Promise-based HTTP client
- **React Query** - Data synchronization and caching
- **Custom Hooks** - Reusable API and business logic
- **Supabase** - Backend-as-a-Service for authentication and data storage

### **Development Tools**
- **ESLint** - Code linting and formatting
- **TypeScript** - Type checking and IntelliSense
- **Vite DevTools** - Fast development and debugging

---

## 🔧 Supabase Integration

This project now uses **Supabase** as its primary backend service for authentication, database operations, and real-time features.

### **Supabase Schema**

The database schema includes comprehensive tables for all application entities:

1. **Companies** - Complete company information with related entities:
   - Board members
   - Legal advisors
   - Bank accounts
   - SPV memos
   - Risk disclosures

2. **Assets** - Detailed asset information with category-specific fields:
   - Data centers
   - Cold storage hubs
   - Logistics warehouses
   - Co-working spaces
   - Renewable industrial parks
   - Retail locations
   - Hotels
   - Mixed-use complexes
   - Category-specific attributes for each type

3. **Users** - User profiles and roles

4. **Related Entities**:
   - Asset locations
   - Asset documents
   - Company board members
   - Company legal advisors
   - Company bank accounts

### **Authentication**
Supabase authentication is integrated with:
- Email/Password authentication
- Phone authentication with OTP
- Social login providers (configurable)
- Session management and token refresh

### **API Services**
All CRUD operations are handled through Supabase services:
- `src/services/supabaseService.ts` - Core Supabase operations
- `src/hooks/useSupabase.ts` - Custom React hook for Supabase integration
- `src/lib/supabaseClient.ts` - Supabase client configuration
- Specialized hooks for companies and assets:
  - `useCreateCompany`, `useUpdateCompany`
  - `useCreateAsset`, `useUpdateAsset`

### **Environment Variables**

To configure Supabase, add the following to your `.env` file:

```env
VITE_SUPABASE_URL=https://vefumeqegddgzslttqsb.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlZnVtZXFlZ2RkZ3pzbGx0cXNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwMjQzNDgsImV4cCI6MjA3MTYwMDM0OH0.sNq-jKO5zWQu77C6P-2TMr7xgbL17cF08aHr5F-JC2U
```

---

## 🔗 Blockchain Integration

This project integrates with the Proplex blockchain smart contracts deployed on the Avalanche Fuji Testnet for company and asset registration.

### **Smart Contract Integration**

The application uses the ProplexSDK class to interact with the following smart contracts:

1. **Registry Contract**: Main registry for companies and projects
2. **Company Factory**: Factory contract for deploying company contracts
3. **Real Estate Token Factory**: Factory contract for deploying real estate token contracts
4. **Escrow Contract**: Handles escrow functionality for transactions
5. **Order Manager**: Manages order placement and fulfillment
6. **DAO Contract**: Governance contract for decentralized decision making

### **Company Registration Process**

1. **Database Creation**: Company data is first stored in the Supabase database
2. **Blockchain Registration**: If MetaMask is connected, the company is registered on the blockchain
3. **Transaction Confirmation**: Wait for the blockchain transaction to be mined
4. **Navigation**: Redirect to the company edit page

### **Asset Registration Process**

1. **Database Creation**: Asset data is first stored in the Supabase database
2. **Blockchain Registration**: If MetaMask is connected, the asset is registered on the blockchain
3. **Smart Contract Deployment**: The Real Estate Token Factory deploys the necessary contracts
4. **Registry Update**: The Registry contract is updated with the new asset information
5. **Transaction Confirmation**: Wait for the blockchain transaction to be mined
6. **Navigation**: Redirect to the asset edit page

### **Wallet Integration**

The application uses the MetaMaskProvider to manage wallet connections:
- Users can connect their MetaMask wallet through the connect function
- The provider tracks the connected account and chain ID
- The ethers.js Web3Provider is made available to SDK classes

For detailed information about the blockchain integration, see [BLOCKCHAIN_INTEGRATION.md](BLOCKCHAIN_INTEGRATION.md).

---

## 📁 Project Structure

```
proplex_admin/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ui/               # Base UI components (buttons, forms, etc.)
│   │   ├── TableComponent/   # Data table components
│   │   └── UseForm/         # Form generation and validation
│   ├── pages/                # Main application pages
│   │   ├── asset/            # Asset management pages
│   │   │   ├── AddAsset/     # Multi-step asset creation
│   │   │   │   ├── AssetInformation/      # Asset details forms
│   │   │   │   ├── TokenInformation/      # Token & DID configuration
│   │   │   │   ├── MediaAndDocuments/     # File uploads
│   │   │   │   └── TermsAndConditions/    # Legal terms
│   │   │   └── AssetList/    # Asset listing and management
│   │   ├── company/          # SPV/Company management
│   │   ├── Dashboard/        # Main dashboard
│   │   └── auth/             # Authentication pages
│   ├── hooks/                # Custom React hooks
│   │   ├── asset/            # Asset-related hooks
│   │   ├── api/              # API integration hooks
│   │   └── useWeb3/          # Blockchain interaction hooks
│   ├── services/             # API services and business logic
│   ├── store/                # Redux state management
│   ├── types/                # TypeScript type definitions
│   ├── constants/            # Application constants
│   ├── config/               # Configuration files
│   ├── utils/                # Utility functions
│   ├── layout/               # Layout components (Header, Sidebar)
│   ├── providers/            # Context providers
│   └── router/               # Application routing
├── public/                   # Static assets
├── package.json              # Dependencies and scripts
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

---

## 🔐 Authentication & Security

### **Web3Auth Integration**
Proplex Admin uses [Web3Auth](https://web3auth.io/) for secure blockchain-based authentication and wallet management.

**Features:**
- **Multiple Login Options:** Social providers (Google, GitHub, Discord) and wallet connections
- **Secure Key Management:** Non-custodial private key infrastructure
- **Cross-Platform Support:** Web, mobile, and desktop compatibility
- **Multi-Factor Authentication:** Enhanced security with MFA support

**Implementation:**
- Web3Auth is initialized in `src/providers/Web3AuthProvider.tsx`
- Authentication context provided at root level in `main.tsx`
- Wallet connection and user info accessible via custom hooks
- Integration with Wagmi for Ethereum interactions

**Supported Wallets:**
- MetaMask
- WalletConnect
- Coinbase Wallet
- Trust Wallet
- And many more...

### **Supabase Authentication**
In addition to Web3Auth, the application now uses Supabase for traditional authentication:

**Features:**
- **Email/Password Authentication:** Standard email and password login
- **Phone Authentication:** SMS-based authentication with OTP
- **Social Login:** Integration with Google, GitHub, and other providers
- **Session Management:** Automatic token refresh and session handling
- **User Profiles:** Enhanced user data management

**Implementation:**
- Supabase client configured in `src/lib/supabaseClient.ts`
- Authentication hooks in `src/hooks/useSupabase.ts`
- Redux integration in `src/store/features/authSlice.ts`
- HTTP client updated to use Supabase tokens

### **Security Features**
- **Role-Based Access Control (RBAC):** Different permission levels for users
- **Secure API Communication:** JWT tokens and encrypted requests
- **Blockchain Verification:** Transaction signing and verification
- **Session Management:** Secure session handling and auto-logout
- **Row Level Security:** Database-level access control with Supabase RLS

> **Note:** Direct MetaMask integration is not required as Web3Auth handles all wallet connections.

---

## 📱 Smart Contract Deployment

Proplex Admin is powered by a comprehensive suite of smart contracts deployed on the **Avalanche Fuji Testnet**. These contracts handle the core blockchain functionality including tokenization, asset management, escrow services, and decentralized governance.

### **🔗 Deployed Contract Addresses**

#### **Core Protocol Contracts**
| Contract Name | Address | Purpose |
|---------------|---------|----------|
| **ProplexRegistry** | [`0x60c977735cfBF44Cf5B33bD02a8B637765E7AbbB`](https://testnet.snowscan.xyz/address/0x60c977735cfBF44Cf5B33bD02a8B637765E7AbbB) | Central registry for all protocol contracts |
| **ProplexCompanyFactory** | [`0x6157DCF5f7E0546706e7153AbEb2Fe48122bEec5`](https://testnet.snowscan.xyz/address/0x6157DCF5f7E0546706e7153AbEb2Fe48122bEec5) | Factory for creating SPV companies |
| **ProplexRealEstateTokenFactory** | [`0x7d8940bAf8A432E09a30ce762abb3dD9Ab75eF3d`](https://testnet.snowscan.xyz/address/0x7d8940bAf8A432E09a30ce762abb3dD9Ab75eF3d) | Factory for tokenizing real estate assets |

#### **Implementation Contracts**
| Contract Name | Address | Purpose |
|---------------|---------|----------|
| **ProplexEscrow** | [`0x2928D9Efe70c4a56a8A3Cff5d304f3626e60e5F3`](https://testnet.snowscan.xyz/address/0x2928D9Efe70c4a56a8A3Cff5d304f3626e60e5F3) | Escrow services for secure transactions |
| **ProplexOrderManager** | [`0x0C13bB0C887b6aBdbe6D4301B8dc67886617641a`](https://testnet.snowscan.xyz/address/0x0C13bB0C887b6aBdbe6D4301B8dc67886617641a) | Order management and trading |
| **ProplexDAO** | [`0x938749EA4883A4987508b40EE28BB337dBC97c5D`](https://testnet.snowscan.xyz/address/0x938749EA4883A4987508b40EE28BB337dBC97c5D) | Decentralized governance |
| **ProplexRealEstateToken** | [`0xA4bAC58e92D3b5632c4e417430b5eCE0812f600C`](https://testnet.snowscan.xyz/address/0xA4bAC58e92D3b5632c4e417430b5eCE0812f600C) | Real estate tokenization template |
| **ProplexCompany** | [`0x8285234d4b49C5956cAe7C1b9273B322e74dcE72`](https://testnet.snowscan.xyz/address/0x8285234d4b49C5956cAe7C1b9273B322e74dcE72) | SPV company template |
| **ProplexRegistry (Implementation)** | [`0x58C9Fc2877679207fB382281b82D18262AcDbbD3`](https://testnet.snowscan.xyz/address/0x58C9Fc2877679207fB382281b82D18262AcDbbD3) | Logic contract for main registry |
| **ProplexCompanyFactory (Implementation)** | [`0x2E275Be0Db062c9fC5a0A02Af9084f3b948F7c42`](https://testnet.snowscan.xyz/address/0x2E275Be0Db062c9fC5a0A02Af9084f3b948F7c42) | Logic contract for company factory |
| **ProplexRealEstateTokenFactory (Implementation)** | [`0x5Ba212974EFF69748811CE57c5ce58eDfeb66B9f`](https://testnet.snowscan.xyz/address/0x5Ba212974EFF69748811CE57c5ce58eDfeb66B9f) | Logic contract for real estate factory |

#### **Token Contracts**
| Token Name | Address | Purpose |
|------------|---------|----------|
| **USDT Mock** | [`0xe66ae37Bc0982825b5F8b37821b42d3B2d04D085`](https://testnet.snowscan.xyz/address/0xe66ae37Bc0982825b5F8b37821b42d3B2d04D085) | Test USDT for transactions |
| **USDC Mock** | [`0xa6401adAd919ea6Ec9929716a19DDFf62bc3Bc1C`](https://testnet.snowscan.xyz/address/0xa6401adAd919ea6Ec9929716a19DDFf62bc3Bc1C) | Test USDC for transactions |
| **ProplexToken** | [`0x0Acc1f0C68150f2928dF9F3B316BD062a5562F8F`](https://testnet.snowscan.xyz/address/0x0Acc1f0C68150f2928dF9F3B316BD062a5562F8F) | Platform utility token |

#### **Compliance & Identity**
| Contract Name | Address | Purpose |
|---------------|---------|----------|
| **IdentityRegistry** | [`0xb9694089d485f5Af75cAee1F4447b629f097FF82`](https://testnet.snowscan.xyz/address/0xb9694089d485f5Af75cAee1F4447b629f097FF82) | Identity management for KYC/AML |
| **ModularCompliance** | [`0x7d5299e611990b6d25F48d3954bEB07B1f4E6dE0`](https://testnet.snowscan.xyz/address/0x7d5299e611990b6d25F48d3954bEB07B1f4E6dE0) | Compliance and regulatory framework |

### **🌐 Network Details**

**Avalanche Fuji Testnet**
- **Chain ID:** `43113`
- **RPC URL:** `https://api.avax-test.network/ext/bc/C/rpc`
- **Explorer:** [Snowscan Testnet](https://testnet.snowscan.xyz/)
- **Native Token:** AVAX
- **Deployer Address:** [`0x53Ae02C14aa48cd3131Ff81Dc9fE0C5b923b64Ce`](https://testnet.snowscan.xyz/address/0x53Ae02C14aa48cd3131Ff81Dc9fE0C5b923b64Ce)

### **📊 Deployment Statistics**

- **Total Contracts Deployed:** 16
- **Total Gas Used:** 25,010,367
- **Average Gas Price:** 0.000000002 gwei (2 wei)
- **Total Deployment Cost:** 0.000000000050020734 ETH
- **Block Range:** 45,166,651 - 45,166,653
- **Deployer Address:** `0x53Ae02C14aa48cd3131Ff81Dc9fE0C5b923b64Ce`
- **Network:** Avalanche Fuji Testnet (Chain ID: 43113)
- **Deployment Date:** Latest deployment (2025)

### **🔗 Deployment Transaction Hashes**

| Contract | Transaction Hash | Block |
|----------|-----------------|-------|
| **USDT Mock** | [`0xb70afa3718519d2a607b742fd6fa910d8c055892700e9e83df29f606828c7d09`](https://testnet.snowscan.xyz/tx/0xb70afa3718519d2a607b742fd6fa910d8c055892700e9e83df29f606828c7d09) | 45,166,651 |
| **USDC Mock** | [`0xbd2d970759dd0d428a75072187d96b5ac711e5342bfa9cc4b99c2bf8de880aff`](https://testnet.snowscan.xyz/tx/0xbd2d970759dd0d428a75072187d96b5ac711e5342bfa9cc4b99c2bf8de880aff) | 45,166,651 |
| **Proplex Token** | [`0xef918cd198def15e4f1eb9da19aea384d6248cd6dd3e9e960a93250a846bab94`](https://testnet.snowscan.xyz/tx/0xef918cd198def15e4f1eb9da19aea384d6248cd6dd3e9e960a93250a846bab94) | 45,166,651 |
| **Proplex Escrow** | [`0x64bc98ce6032e825052ee8bc63b198f98f6f33c8ed4bbf8ebf9df0512c9850c2`](https://testnet.snowscan.xyz/tx/0x64bc98ce6032e825052ee8bc63b198f98f6f33c8ed4bbf8ebf9df0512c9850c2) | 45,166,652 |
| **Proplex Company** | [`0x56db2e6322ca4926b415e80605fc8953196e937742c6b5a78df0ba497e3b5249`](https://testnet.snowscan.xyz/tx/0x56db2e6322ca4926b415e80605fc8953196e937742c6b5a78df0ba497e3b5249) | 45,166,652 |
| **Proplex DAO** | [`0x8e511b97be0595e117dbfcfbedfb09240b738ab7623807eda3b333c47325110a`](https://testnet.snowscan.xyz/tx/0x8e511b97be0595e117dbfcfbedfb09240b738ab7623807eda3b333c47325110a) | 45,166,652 |
| **Proplex Real Estate Token** | [`0x641e8d893dae0a94841bf157b0177d119f3b5f25a59f990a0ec08bcabc7a97cc`](https://testnet.snowscan.xyz/tx/0x641e8d893dae0a94841bf157b0177d119f3b5f25a59f990a0ec08bcabc7a97cc) | 45,166,652 |
| **Proplex Order Manager** | [`0x6a8b0c9977f831189292c79cb048b795f0aa71aa5a1656d113f714540d2733b7`](https://testnet.snowscan.xyz/tx/0x6a8b0c9977f831189292c79cb048b795f0aa71aa5a1656d113f714540d2733b7) | 45,166,652 |
| **Proplex Company Factory** | [`0x22075ce6e9acd9791957227883d928470b6a5c991a21ab2921bd33d7a43e1f71`](https://testnet.snowscan.xyz/tx/0x22075ce6e9acd9791957227883d928470b6a5c991a21ab2921bd33d7a43e1f71) | 45,166,652 |
| **Modular Compliance** | [`0x26e9ff026f561712004eafd5e1164f352b241271e0d692adfe22b13468f98830`](https://testnet.snowscan.xyz/tx/0x26e9ff026f561712004eafd5e1164f352b241271e0d692adfe22b13468f98830) | 45,166,653 |
| **Registry Implementation** | [`0x65d517fd689bf2cea720dcc1f279b2b11092f11ec24ec0e4ee2f270143b1452d`](https://testnet.snowscan.xyz/tx/0x65d517fd689bf2cea720dcc1f279b2b11092f11ec24ec0e4ee2f270143b1452d) | 45,166,653 |
| **Real Estate Factory (Proxy)** | [`0x4b64451714672856a4ff7e454588bb571cb17cbb3e4c78e8d2d7627b7c5df64f`](https://testnet.snowscan.xyz/tx/0x4b64451714672856a4ff7e454588bb571cb17cbb3e4c78e8d2d7627b7c5df64f) | 45,166,653 |
| **Company Factory (Proxy)** | [`0xc1060d848f5fadb2c3cab8fe65d4b2fbc6e6475a10b12d4cfc4230ae34dceb64`](https://testnet.snowscan.xyz/tx/0xc1060d848f5fadb2c3cab8fe65d4b2fbc6e6475a10b12d4cfc4230ae34dceb64) | 45,166,653 |
| **Identity Registry** | [`0x3672f811cce0b621e0e3cc99ec569b666330c938ba01b28032c05388497ef18d`](https://testnet.snowscan.xyz/tx/0x3672f811cce0b621e0e3cc99ec569b666330c938ba01b28032c05388497ef18d) | 45,166,653 |
| **Real Estate Factory Impl** | [`0x5a2079578fc8392aded21b0f5982277a6869f1158cf3babb5c56aabd7c602b36`](https://testnet.snowscan.xyz/tx/0x5a2079578fc8392aded21b0f5982277a6869f1158cf3babb5c56aabd7c602b36) | 45,166,653 |
| **Registry (Proxy)** | [`0xe6884f80b8bb97a1752e4ae8b74069191f462843656b1b458ee3df3cdf52ec1f`](https://testnet.snowscan.xyz/tx/0xe6884f80b8bb97a1752e4ae8b74069191f462843656b1b458ee3df3cdf52ec1f) | 45,166,653 |

### **🔧 Contract Integration**

To interact with these contracts in your application:

```typescript
// Contract addresses configuration
const CONTRACT_ADDRESSES = {
  // Core Protocol (Proxy Contracts)
  PROPLEX_REGISTRY: '0x60c977735cfBF44Cf5B33bD02a8B637765E7AbbB',
  COMPANY_FACTORY: '0x6157DCF5f7E0546706e7153AbEb2Fe48122bEec5',
  REAL_ESTATE_FACTORY: '0x7d8940bAf8A432E09a30ce762abb3dD9Ab75eF3d',
  
  // Implementation Contracts
  REGISTRY_IMPL: '0x58C9Fc2877679207fB382281b82D18262AcDbbD3',
  COMPANY_FACTORY_IMPL: '0x2E275Be0Db062c9fC5a0A02Af9084f3b948F7c42',
  REAL_ESTATE_FACTORY_IMPL: '0x5Ba212974EFF69748811CE57c5ce58eDfeb66B9f',
  ESCROW_IMPL: '0x2928D9Efe70c4a56a8A3Cff5d304f3626e60e5F3',
  ORDER_MANAGER_IMPL: '0x0C13bB0C887b6aBdbe6D4301B8dc67886617641a',
  DAO_IMPL: '0x938749EA4883A4987508b40EE28BB337dBC97c5D',
  REAL_ESTATE_TOKEN_IMPL: '0xA4bAC58e92D3b5632c4e417430b5eCE0812f600C',
  COMPANY_IMPL: '0x8285234d4b49C5956cAe7C1b9273B322e74dcE72',
  
  // Token Contracts
  USDT_MOCK: '0xe66ae37Bc0982825b5F8b37821b42d3B2d04D085',
  USDC_MOCK: '0xa6401adAd919ea6Ec9929716a19DDFf62bc3Bc1C',
  PROPLEX_TOKEN: '0x0Acc1f0C68150f2928dF9F3B316BD062a5562F8F',
  
  // Compliance Framework
  IDENTITY_REGISTRY: '0xb9694089d485f5Af75cAee1F4447b629f097FF82',
  MODULAR_COMPLIANCE: '0x7d5299e611990b6d25F48d3954bEB07B1f4E6dE0'
};

// Network configuration
const AVALANCHE_FUJI = {
  chainId: 43113,
  name: 'Avalanche Fuji',
  currency: 'AVAX',
  explorerUrl: 'https://testnet.snowscan.xyz',
  rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc'
};
```

### **⚡ Key Features**

- **🏭 Factory Pattern:** Efficient contract deployment using proxy patterns
- **🔒 Upgradeable:** ERC1967 proxy standard for future upgrades
- **🛡️ Security:** Role-based access control and compliance integration
- **💰 Multi-Token Support:** USDT, USDC, and native AVAX support
- **🏛️ Governance:** Decentralized decision-making through DAO
- **📊 Analytics:** On-chain tracking and performance metrics

### **🔗 Verification**

All contracts have been successfully deployed and initialized on Avalanche Fuji testnet. You can verify the deployment by:

1. **Check Explorer:** Visit [Snowscan Testnet](https://testnet.snowscan.xyz/)
2. **Verify Contracts:** All contract addresses are linked above
3. **Test Interactions:** Use the provided addresses in your Web3 applications

---

## 🚀 Getting Started

### **Prerequisites**

Ensure you have the following installed on your system:

- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (v8.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** for version control
- A modern web browser (Chrome, Firefox, Safari, Edge)

### **Installation**

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd proplex_admin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://vefumeqegddgzslttqsb.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlZnVtZXFlZ2RkZ3pzbGx0cXNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwMjQzNDgsImV4cCI6MjA3MTYwMDM0OH0.sNq-jKO5zWQu77C6P-2TMr7xgbL17cF08aHr5F-JC2U
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

### **Building for Production**

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

### **Linting**

To check for linting errors:

```bash
npm run lint
```

---

## 🧪 Testing

The project includes test components to verify the integration:

1. **Simple Test** - `src/components/SupabaseTest.tsx`
   - Basic authentication and CRUD operations
   - Simple company and asset creation

2. **Comprehensive Test** - `src/components/SupabaseComprehensiveTest.tsx`
   - Full authentication flow
   - Complete company creation with related data
   - Complete asset creation with category-specific fields
   - Update and retrieval operations

3. **Blockchain Test** - `src/components/CompanyBlockchainTest.tsx` and `src/components/AssetBlockchainTest.tsx`
   - Company and asset creation with blockchain registration
   - MetaMask wallet integration testing

---

## 📚 Documentation

- [Supabase Migration Guide](MIGRATION_GUIDE.md) - Guide for migrating from previous backend to Supabase
- [Blockchain Integration Guide](BLOCKCHAIN_INTEGRATION.md) - Guide for blockchain integration with smart contracts
- [Fee Structure Documentation](src/config/feeStructure.ts) - Documentation for fee structure configuration
- [Embedded Finance Documentation](src/config/embeddedFinance.ts) - Documentation for embedded finance configuration

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Open a pull request

Please ensure your code follows the project's coding standards and includes appropriate tests.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript at any scale
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Supabase](https://supabase.io/) - The open source Firebase alternative
- [Web3Auth](https://web3auth.io/) - The simplest key infrastructure for Web3
- [Ethers.js](https://docs.ethers.io/) - Complete Ethereum wallet implementation and utilities
- [Framer Motion](https://www.framer.com/motion/) - A production-ready motion library for React
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components for building high-quality design systems
- [ShadCN UI](https://ui.shadcn.com/) - Re-usable components built with Radix UI and Tailwind CSS
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
- **Ethereum Integration** - Smart contract interactions

### **Data & API**
- **Axios** - Promise-based HTTP client
- **React Query** - Data synchronization and caching
- **Custom Hooks** - Reusable API and business logic

### **Development Tools**
- **ESLint** - Code linting and formatting
- **TypeScript** - Type checking and IntelliSense
- **Vite DevTools** - Fast development and debugging

---

## 📁 Project Structure

```
proplex_admin/
┌── src/
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

### **Security Features**
- **Role-Based Access Control (RBAC):** Different permission levels for users
- **Secure API Communication:** JWT tokens and encrypted requests
- **Blockchain Verification:** Transaction signing and verification
- **Session Management:** Secure session handling and auto-logout

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

### **Quick Start**

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/proplex-admin.git
   cd proplex-admin
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install
   
   # Or using yarn
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the environment template
   cp .env.example .env
   
   # Edit the .env file with your configuration
   # See Environment Variables section below
   ```

4. **Start the development server**
   ```bash
   # Using npm
   npm run dev
   
   # Or using yarn
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

### **Available Scripts**

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run type-check` | Run TypeScript type checking |

### **Development Workflow**

```bash
# Start development with type checking
npm run dev

# In another terminal, run linting
npm run lint

# Before committing, ensure build works
npm run build
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# API Configuration
VITE_API_BASE_URL=https://api.proplex.com
VITE_API_VERSION=v1

# Web3Auth Configuration
VITE_WEB3AUTH_CLIENT_ID=your_web3auth_client_id
VITE_WEB3AUTH_NETWORK=sapphire_mainnet  # or sapphire_devnet for development

# Blockchain Configuration
VITE_CHAIN_ID=1  # Ethereum Mainnet (use 5 for Goerli testnet)
VITE_RPC_URL=https://mainnet.infura.io/v3/your_infura_key

# Application Settings
VITE_APP_NAME=Proplex Admin
VITE_APP_VERSION=1.0.0
VITE_APP_ENVIRONMENT=development  # development | staging | production

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG_MODE=true
VITE_ENABLE_MOCK_API=false

# External Services
VITE_IPFS_GATEWAY=https://gateway.pinata.cloud
VITE_STORAGE_PROVIDER=pinata  # pinata | aws | local

# Security
VITE_ENCRYPTION_KEY=your_encryption_key_here
```

### **Configuration Guide**

1. **Web3Auth Setup:**
   - Visit [Web3Auth Dashboard](https://dashboard.web3auth.io/)
   - Create a new project
   - Copy the Client ID to `VITE_WEB3AUTH_CLIENT_ID`

2. **Blockchain Network:**
   - For development: Use testnets (Goerli, Sepolia)
   - For production: Use mainnet with proper RPC endpoints

3. **API Configuration:**
   - Replace with your actual API base URL
   - Ensure CORS is properly configured on your backend

> **Security Note:** Never commit your `.env` file to version control. Add it to `.gitignore`.

## 🚀 Deployment

### **Production Build**

```bash
# Create optimized production build
npm run build

# Preview the production build locally
npm run preview
```

### **Deployment Options**

#### **Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### **Netlify**
```bash
# Build command: npm run build
# Publish directory: dist
```

#### **Docker**
```dockerfile
# Dockerfile example
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

### **Environment-Specific Builds**

```bash
# Development
VITE_APP_ENVIRONMENT=development npm run build

# Staging
VITE_APP_ENVIRONMENT=staging npm run build

# Production
VITE_APP_ENVIRONMENT=production npm run build
```

## 🔧 API Documentation

### **Main Endpoints**

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/assets` | GET | Retrieve all assets |
| `/api/v1/assets` | POST | Create new asset |
| `/api/v1/assets/:id` | PUT | Update asset |
| `/api/v1/assets/:id` | DELETE | Delete asset |
| `/api/v1/companies` | GET | Retrieve SPV companies |
| `/api/v1/auth/login` | POST | User authentication |
| `/api/v1/blockchain/reserve-did` | POST | Reserve Property DID |
| `/api/v1/tokens/reserve-symbol` | POST | Reserve token symbol |

### **Authentication Headers**

```typescript
// Request headers
headers: {
  'Authorization': 'Bearer <jwt_token>',
  'Content-Type': 'application/json',
  'X-API-Version': 'v1'
}
```

### **Response Format**

```typescript
// Success Response
{
  "success": true,
  "data": { ... },
  "message": "Operation successful",
  "timestamp": "2024-01-01T00:00:00Z"
}

// Error Response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": { ... }
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## ⚙️ Performance Optimization

### **Code Splitting**
- Lazy loading for route components
- Dynamic imports for heavy libraries
- Component-level code splitting

### **Bundle Optimization**
```typescript
// vite.config.ts optimizations
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', 'framer-motion'],
          web3: ['@web3auth/modal', 'wagmi']
        }
      }
    }
  }
})
```

### **Performance Best Practices**
- Use React.memo for expensive components
- Implement virtual scrolling for large lists
- Optimize images with proper formats and lazy loading
- Use React Query for efficient data caching

## 🛠️ Troubleshooting

### **Common Issues**

#### **Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf .vite
```

#### **Web3Auth Connection Issues**
- Verify Web3Auth Client ID in environment variables
- Check network configuration (mainnet vs testnet)
- Ensure proper HTTPS for production deployments

#### **TypeScript Errors**
```bash
# Run type checking
npm run type-check

# Generate missing type declarations
npm run build
```

#### **Styling Issues**
```bash
# Rebuild Tailwind classes
npm run build:css

# Check for conflicting CSS
# Inspect element styles in browser DevTools
```

### **Debug Mode**

Enable debug mode in development:
```bash
VITE_ENABLE_DEBUG_MODE=true npm run dev
```

### **Getting Help**

1. Check the [Issues](https://github.com/your-org/proplex-admin/issues) for existing solutions
2. Review the [Wiki](https://github.com/your-org/proplex-admin/wiki) for detailed guides
3. Join our [Discord Community](https://discord.gg/proplex) for real-time support
4. Contact the development team at support@proplex.com

## 📈 Analytics & Monitoring

### **Performance Monitoring**
- **Lighthouse CI:** Automated performance audits
- **Bundle Analyzer:** Track bundle size and dependencies
- **Error Tracking:** Sentry integration for error monitoring

### **User Analytics**
```typescript
// Analytics configuration
// Configurable via VITE_ENABLE_ANALYTICS environment variable
```

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### **Development Process**

1. **Fork & Clone**
   ```bash
   # Fork the repository on GitHub
   git clone https://github.com/your-username/proplex-admin.git
   cd proplex-admin
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

3. **Make Changes**
   - Follow the coding standards below
   - Add tests for new features
   - Update documentation as needed

4. **Test Your Changes**
   ```bash
   npm run lint
   npm run type-check
   npm run build
   ```

5. **Commit & Push**
   ```bash
   git add .
   git commit -m "feat: add new asset filtering feature"
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Use the PR template
   - Link related issues
   - Add screenshots for UI changes

### **Coding Standards**

- **TypeScript:** All code must be properly typed
- **ESLint:** Follow the configured linting rules
- **Prettier:** Code formatting is handled automatically
- **Naming:** Use descriptive, camelCase variable names
- **Components:** Use PascalCase for React components
- **Files:** Use kebab-case for file names

### **Commit Convention**

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or modifying tests
- `chore:` Maintenance tasks

**Examples:**
```bash
git commit -m "feat(assets): add token symbol validation"
git commit -m "fix(auth): resolve Web3Auth connection timeout"
git commit -m "docs(readme): update installation instructions"
```

## 📋 Changelog

### **Version 1.0.0** (Latest)
- ✨ Initial release
- 🏠 Complete asset management system
- 🪙 Token information and DID reservation
- 👥 User and role management
- 🔐 Web3Auth integration
- 🎨 Modern UI with Tailwind CSS

### **Coming in v1.1.0**
- 📈 Advanced analytics dashboard
- 🔄 Real-time notifications
- 📱 Mobile app companion
- ⚙️ Enhanced API rate limiting

## 🗺️ Roadmap

### **Q1 2024**
- [ ] Mobile responsive improvements
- [ ] Advanced filtering and search
- [ ] Bulk operations for assets
- [ ] Integration with additional blockchains

### **Q2 2024**
- [ ] Multi-language support (i18n)
- [ ] Advanced user permissions
- [ ] Asset performance analytics
- [ ] API v2 with GraphQL

### **Q3 2024**
- [ ] Mobile application
- [ ] Advanced reporting features
- [ ] Third-party integrations
- [ ] Enhanced security features

### **Q4 2024**
- [ ] AI-powered insights
- [ ] Advanced workflow automation
- [ ] Enterprise features
- [ ] Global expansion tools

## 📜 Documentation

- **[User Guide]** - Complete user manual
- **[API Documentation]** - Detailed API reference
- **[Developer Guide]** - Development setup and architecture
- **[Component Library]** - UI component documentation
- **[Web3 Integration]** - Blockchain integration guide

## 🤝 Community

- **[GitHub Discussions](https://github.com/your-org/proplex-admin/discussions)** - Community Q&A
- **[Discord Server](https://discord.gg/proplex)** - Real-time chat and support
- **[Twitter](https://twitter.com/proplex_io)** - Latest updates and announcements
- **[Blog](https://blog.proplex.io)** - Technical articles and tutorials

## 🔒 Security

### **Reporting Security Issues**

If you discover a security vulnerability, please send an email to security@proplex.com. We take security seriously and will respond promptly to all reported issues.

### **Security Best Practices**
- Always use HTTPS in production
- Keep dependencies updated
- Use environment variables for sensitive data
- Implement proper authentication and authorization
- Regular security audits and penetration testing

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Proplex Technologies

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 🙏 Acknowledgments

- **[React Team](https://reactjs.org/)** - For the amazing React framework
- **[Vite Team](https://vitejs.dev/)** - For the lightning-fast build tool
- **[Tailwind CSS](https://tailwindcss.com/)** - For the utility-first CSS framework
- **[Web3Auth](https://web3auth.io/)** - For seamless blockchain authentication
- **[Framer Motion](https://www.framer.com/motion/)** - For beautiful animations
- **[Radix UI](https://www.radix-ui.com/)** - For accessible component primitives

## 📞 Contact & Support

### **Development Team**
- **Technical Lead:** [Your Name](mailto:tech@proplex.com)
- **Product Manager:** [PM Name](mailto:product@proplex.com)
- **DevOps Engineer:** [DevOps Name](mailto:devops@proplex.com)

### **Business Inquiries**
- **General:** info@proplex.com
- **Partnerships:** partnerships@proplex.com
- **Sales:** sales@proplex.com

### **Support Channels**
- **Technical Support:** support@proplex.com
- **Bug Reports:** [GitHub Issues](https://github.com/your-org/proplex-admin/issues)
- **Feature Requests:** [GitHub Discussions](https://github.com/your-org/proplex-admin/discussions)

---

<div align="center">

**Built with ❤️ by the Proplex Team**

[Website](https://proplex.io) • [Documentation](https://docs.proplex.io) • [Blog](https://blog.proplex.io) • [Twitter](https://twitter.com/proplex_io)

⭐ **Star this repository if you find it helpful!** ⭐

</div>

---

> **Disclaimer:** This software is provided "as is" without warranty of any kind. Always conduct thorough testing before deploying to production environments.
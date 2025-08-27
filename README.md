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
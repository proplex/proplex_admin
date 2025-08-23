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
# Proplex Admin

**Proplex Admin** is a modern admin dashboard for managing digital assets, SPVs, users, and more. Built with React, Vite, TypeScript, and Tailwind CSS, it provides a robust interface for asset management, user roles, and blockchain integrations.

---

## Features

- **Asset Management:** Create, update, and monitor digital assets.
- **SPV Management:** Stepper-based SPV creation and editing.
- **User & Role Management:** Manage users, advisors, board members, and roles.
- **Authentication:** (See below)
- **Blockchain Integration:** MetaMask wallet connect and asset status updates.
- **Responsive UI:** Built with Tailwind CSS and Framer Motion for smooth animations.
- **Reusable Components:** Modular UI and form components.
- **API Integration:** Custom hooks for CRUD operations and data fetching.
- **Filtering & Search:** Advanced filtering and search for assets.
- **Charts & Analytics:** Pie charts and statistics for quick insights.

---

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **UI:** Tailwind CSS, Framer Motion
- **State Management:** React Context, custom hooks
- **API:** RESTful API integration via custom hooks
- **Blockchain:** MetaMask integration (web3)
- **Testing:** (Add your testing framework here if used)

---

## Project Structure

```
src/
  components/      # Reusable UI components
  config/          # App and chart configs
  constants/       # Static data and helpers
  data/            # Mock data for development
  helpers/         # Utility/helper functions
  hooks/           # Custom React hooks (API, debounce, web3, etc.)
  layout/          # Layout components
  middleware/      # Middleware logic (if any)
  pages/           # Main page components (AssetList, SPV, etc.)
  providers/       # Context providers
  router/          # Routing configuration
  services/        # API and service logic
  store/           # State management (if any)
  types/           # TypeScript types/interfaces
  utils/           # Utility functions
public/            # Static assets (images, icons, etc.)
```

---

## Authentication

- **Web3Auth:**  
  The app uses [Web3Auth](https://web3auth.io/) for blockchain-based authentication and wallet management.  
  - Users can log in with various social providers or wallets.
  - Web3Auth is initialized in `src/web3authContext.ts` and provided at the root in `main.tsx`.
  - Wallet connection and user info are accessible via hooks from `@web3auth/modal/react` and `wagmi`.

- **MetaMask:**  
  _MetaMask is not required or used in this project._

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
```

### Development

```bash
# Start the development server
npm run dev
# or
yarn dev
```

### Build

```bash
npm run build
# or
yarn build
```

### Lint

```bash
npm run lint
# or
yarn lint
```

---

## Environment Variables

Create a `.env` file in the root if you have environment-specific settings (API URLs, etc.).

---

## Contribution

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a new Pull Request

---

## License

[MIT](LICENSE) (or your license here)

---

## Contact

For questions or support, open an issue or contact the maintainers.
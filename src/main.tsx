import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './store/store';
import {MetaMaskProvider} from './providers/MetaMaskProvider';
import web3AuthContextConfig from './providers/web3authContext';

// Web3Auth and Wagmi imports
import { Web3AuthProvider } from "@web3auth/modal/react";
import { WagmiProvider } from "@web3auth/modal/react/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Web3AuthProvider config={web3AuthContextConfig}>
        <QueryClientProvider client={queryClient}>
          <WagmiProvider>
      {/* <MetaMaskProvider> */}
        <App />
      {/* </MetaMaskProvider> */}
      </WagmiProvider>
      </QueryClientProvider>

      </Web3AuthProvider>
    </Provider>

  </StrictMode>
);

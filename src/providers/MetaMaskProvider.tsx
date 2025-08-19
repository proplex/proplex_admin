'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';

// Define the shape of our context
type MetaMaskContextType = {
  isConnected: boolean;
  account: string | null;
  chainId: number | null;
  connect: () => Promise<{ metamaskAccount: string; chainId: number; } | undefined>;
  disconnect: () => void;
  ethereum: any; // MetaMask provider
  provider: ethers.providers.Web3Provider | null;
};

// Create context with default values
const MetaMaskContext = createContext<MetaMaskContextType>({
  isConnected: false,
  account: null,
  chainId: null,
  connect: async () => ({ metamaskAccount: '', chainId: 0 }),
  disconnect: () => {},
  ethereum: null,
  provider: null,
});

// Hook for components to access the context
export const useMetaMask = () => useContext(MetaMaskContext);

// The provider component
export const MetaMaskProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [ethereum, setEthereum] = useState<any>(null);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);

  // Initialize ethereum and provider
  useEffect(() => {
    // Access window safely in client-side only
    if (typeof window !== 'undefined') {
      const { ethereum } = window as any;
      
      if (ethereum) {
        const ethersProvider = new ethers.providers.Web3Provider(ethereum);
        setEthereum(ethereum);
        setProvider(ethersProvider);
        
        // Check if already connected
        checkConnection();
      }
    }
  }, []);

  // Check if already connected
  const checkConnection = async () => {
    if (!ethereum) return;
    
    try {
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        
        const chainIdHex = await ethereum.request({ method: 'eth_chainId' });
        setChainId(parseInt(chainIdHex, 16));
        
        setIsConnected(true);
      }
    } catch (error) {
      console.error("Error checking connection:", error);
    }
  };

  // Connect to MetaMask
  const connect = async () => {
    if (!ethereum) {
      alert('Please install MetaMask to use this feature!');
      return;
    }
    
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        
        const chainIdHex = await ethereum.request({ method: 'eth_chainId' });
        setChainId(parseInt(chainIdHex, 16));
        
        setIsConnected(true);
        return {
          metamaskAccount: accounts[0],
          chainId: parseInt(chainIdHex, 16),
        };
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  // Disconnect from MetaMask
  const disconnect = () => {
    setAccount(null);
    setChainId(null);
    setIsConnected(false);
  };

  // Listen for account changes
  useEffect(() => {
    if (!ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected their wallet
        disconnect();
      } else {
        setAccount(accounts[0]);
      }
    };

    const handleChainChanged = (chainIdHex: string) => {
      setChainId(parseInt(chainIdHex, 16));
    };

    ethereum.on('accountsChanged', handleAccountsChanged);
    ethereum.on('chainChanged', handleChainChanged);

    return () => {
      ethereum.removeListener('accountsChanged', handleAccountsChanged);
      ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, [ethereum]);

  return (
    <MetaMaskContext.Provider
      value={{
        isConnected,
        account,
        chainId,
        connect,
        disconnect,
        ethereum,
        provider,
      }}
    >
      {children}
    </MetaMaskContext.Provider>
  );
};
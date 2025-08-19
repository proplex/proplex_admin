import { useMetaMask } from '@/providers/MetaMaskProvider';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export default function AccountBalance() {
    
  const { isConnected, account, provider } = useMetaMask();
  const [balance, setBalance] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      if (isConnected && account && provider) {
        setIsLoading(true);
        try {
          const balanceWei = await provider.getBalance(account);
          const balanceEth = ethers.utils.formatEther(balanceWei);
          setBalance(parseFloat(balanceEth).toFixed(4));
        } catch (error) {
          console.error("Error fetching balance:", error);
          setBalance(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        setBalance(null);
      }
    };

    fetchBalance();
  }, [isConnected, account, provider]);

  if (!isConnected || !account) {
    return <div className="mt-4">Connect your wallet to see your balance</div>;
  }

  return (
    <div className="mt-4 p-4 border rounded">
      <h2 className="text-xl font-semibold">Account Information</h2>
      <p className="mt-2">
        <strong>Address:</strong> {account}
      </p>
      <p className="mt-2">
        <strong>Balance:</strong>{' '}
        {isLoading ? 'Loading...' : balance ? `${balance} ETH` : 'Error loading balance'}
      </p>
    </div>
  );
}
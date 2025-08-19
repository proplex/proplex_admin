import { useMetaMask } from '@/providers/MetaMaskProvider';
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function ConnectWallet() {
  const { isConnected, account, connect, disconnect } = useMetaMask();
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      await connect();
    } catch (error) {
      console.error("Connection error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const handleCopyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Format address for display (0x1234...5678)
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  if (isConnected && account) {
    return (
      <div className="flex items-center gap-2">
        <button 
          onClick={handleCopyAddress}
          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center gap-2 hover:bg-green-200 transition"
        >
          {formatAddress(account)}
          {copied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
        <button
          onClick={handleDisconnect}
          className="px-4 py-2 flex items-center gap-2 bg-black text-red-500 font-semibold rounded hover:bg-gray-900 transition"
        >
          <img src="/web3/metamask-icon.svg" alt="MetaMask" className="w-8 h-8"/>
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      disabled={isLoading}
      className="px-4 py-2 flex items-center gap-2 bg-black text-white rounded hover:bg-gray-900 transition disabled:opacity-50"
    >
      <img src="/web3/metamask-icon.svg" alt="MetaMask" className="w-8 h-8"/>
      {isLoading ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
}
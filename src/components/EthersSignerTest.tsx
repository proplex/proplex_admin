import React, { useState } from 'react';
import { useEthersSigner } from '@/hooks/useEthersSigner';
import { useAccount } from 'wagmi';
import { ProplexSDK } from '@/lib/proplex';

const EthersSignerTest: React.FC = () => {
  const { isConnected } = useAccount();
  const ethersSigner = useEthersSigner();
  const [signerAddress, setSignerAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testSigner = async () => {
    if (!ethersSigner) {
      setError('No signer available');
      return;
    }

    setLoading(true);
    setError(null);
    setSignerAddress(null);

    try {
      // Test getting the signer address
      const address = await ethersSigner.getAddress();
      setSignerAddress(address);
      
      // Test creating ProplexSDK instance
      const sdk = new ProplexSDK(ethersSigner);
      const sdkAddress = await sdk.getSignerAddress();
      
      console.log('Ethers signer address:', address);
      console.log('ProplexSDK signer address:', sdkAddress);
      
      if (address === sdkAddress) {
        console.log('Signer conversion successful!');
      } else {
        console.error('Signer addresses do not match');
      }
    } catch (err: any) {
      console.error('Error testing signer:', err);
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Ethers Signer Test</h2>
      
      <div className="space-y-4">
        <div>
          <p className="font-medium">Wallet Status:</p>
          <p className={isConnected ? "text-green-600" : "text-red-600"}>
            {isConnected ? "Connected" : "Not Connected"}
          </p>
        </div>
        
        <div>
          <p className="font-medium">Ethers Signer:</p>
          <p className={ethersSigner ? "text-green-600" : "text-red-600"}>
            {ethersSigner ? "Available" : "Not Available"}
          </p>
        </div>
        
        {signerAddress && (
          <div>
            <p className="font-medium">Signer Address:</p>
            <p className="font-mono text-sm break-all">{signerAddress}</p>
          </div>
        )}
        
        {error && (
          <div className="p-2 bg-red-100 text-red-700 rounded">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
        )}
        
        <button
          onClick={testSigner}
          disabled={!isConnected || !ethersSigner || loading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          {loading ? "Testing..." : "Test Signer"}
        </button>
      </div>
    </div>
  );
};

export default EthersSignerTest;
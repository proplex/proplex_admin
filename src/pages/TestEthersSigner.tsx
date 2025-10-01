import React from 'react';
import EthersSignerTest from '@/components/EthersSignerTest';
import { useWeb3AuthConnect } from "@web3auth/modal/react";
import { LogIn } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const TestEthersSignerPage: React.FC = () => {
  const { connect, isConnected, loading } = useWeb3AuthConnect();
  const navigate = useNavigate();

  const handleConnect = async () => {
    try {
      await connect();
    } catch (err) {
      console.error("Connection error:", err);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Ethers Signer Test</h1>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Back to Home
          </button>
        </div>

        {!isConnected ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Connect Wallet to Test</h2>
            <button
              onClick={handleConnect}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 mx-auto"
            >
              <LogIn className="h-5 w-5" />
              {loading ? "Connecting..." : "Connect Wallet"}
            </button>
          </div>
        ) : (
          <EthersSignerTest />
        )}
      </div>
    </div>
  );
};

export default TestEthersSignerPage;
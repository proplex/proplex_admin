import React, { useState } from 'react';
import useCreateAsset from '@/hooks/useCreateAsset';
import { useMetaMask } from '@/providers/MetaMaskProvider';

const AssetBlockchainTest: React.FC = () => {
  const { createAsset, loading, error, responseData } = useCreateAsset();
  const { isConnected, connect, account } = useMetaMask();
  const [assetName, setAssetName] = useState('');
  const [companyId, setCompanyId] = useState('');

  const handleCreateAsset = async () => {
    if (!assetName.trim()) {
      alert('Please enter an asset name');
      return;
    }
    
    if (!companyId.trim()) {
      alert('Please enter a company ID');
      return;
    }

    const assetData = {
      name: assetName,
      description: 'Test asset for blockchain integration',
      type: 'Real Estate',
      value: 1000000,
      location: '123 Test Street, Test City',
      status: 'active',
      company_id: companyId,
      category: 'Commercial',
      sub_category: 'Office',
      stage: 'Completed',
      currency: 'USD',
      instrument_type: 'SFT',
      class: 'A',
      about: 'This is a test asset for blockchain integration',
      total_number_of_sfts: 1000,
      price_per_sft: 1000,
      expected_annual_return: 8.5,
      investment_horizon: 5
    };

    await createAsset(assetData);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Asset Blockchain Integration Test</h1>
      
      {!isConnected ? (
        <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
          <p className="mb-4">Please connect your MetaMask wallet to test blockchain integration:</p>
          <button
            onClick={connect}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Connect MetaMask
          </button>
        </div>
      ) : (
        <div className="mb-6 p-4 bg-green-50 rounded-lg">
          <p>Connected to MetaMask</p>
          <p className="text-sm text-gray-600">Account: {account?.substring(0, 6)}...{account?.substring(account.length - 4)}</p>
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Asset Name</label>
          <input
            type="text"
            value={assetName}
            onChange={(e) => setAssetName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter asset name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company ID</label>
          <input
            type="text"
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter company ID (UUID)"
          />
        </div>
        
        <button
          onClick={handleCreateAsset}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Creating Asset...' : 'Create Asset with Blockchain Registration'}
        </button>
      </div>
      
      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
          <p>Error: {error}</p>
        </div>
      )}
      
      {responseData && (
        <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg">
          <p>Asset created successfully!</p>
          <p className="text-sm mt-2">Asset ID: {responseData.id}</p>
        </div>
      )}
    </div>
  );
};

export default AssetBlockchainTest;
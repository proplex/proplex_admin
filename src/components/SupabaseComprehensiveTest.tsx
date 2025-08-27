import React, { useState } from 'react';
import { useSupabase } from '@/hooks/useSupabase';

const SupabaseComprehensiveTest: React.FC = () => {
  const { 
    user, 
    session, 
    loading, 
    signUp, 
    signIn, 
    signOut,
    createCompany,
    updateCompany,
    getCompanyById,
    createAsset,
    updateAsset,
    getAssetById
  } = useSupabase();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [testResult, setTestResult] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [companyId, setCompanyId] = useState('');
  const [assetId, setAssetId] = useState('');

  const handleSignUp = async () => {
    try {
      const result = await signUp(email, password, { name: 'Test User' });
      setTestResult(result);
      setError(null);
    } catch (err) {
      setError(err);
      setTestResult(null);
    }
  };

  const handleSignIn = async () => {
    try {
      const result = await signIn(email, password);
      setTestResult(result);
      setError(null);
    } catch (err) {
      setError(err);
      setTestResult(null);
    }
  };

  const handleCreateCompany = async () => {
    try {
      const companyData = {
        name: 'Test Company',
        industry: 'Technology',
        email: 'test@company.com',
        phone: '+1234567890',
        address: '123 Test Street',
        city: 'Test City',
        state: 'Test State',
        pincode: '123456',
        incorporation_type: 'private limited',
        instrument: 'equity',
        pan_number: 'ABCDE1234F',
        // Related data
        boardMembers: [
          {
            name: 'John Doe',
            email: 'john@company.com',
            phone_number: '+1234567890',
            designation: 'Director'
          }
        ],
        legalAdvisors: [
          {
            name: 'Legal Advisor',
            email: 'legal@firm.com',
            firm: 'Test Legal Firm'
          }
        ],
        bankAccounts: [
          {
            account_holder_name: 'Test Company',
            bank_name: 'Test Bank',
            account_number: '1234567890',
            ifsc_code: 'TEST0001234'
          }
        ]
      };
      
      const result = await createCompany(companyData);
      setTestResult(result);
      if (result.data && result.data.id) {
        setCompanyId(result.data.id);
      }
      setError(null);
    } catch (err) {
      setError(err);
      setTestResult(null);
    }
  };

  const handleUpdateCompany = async () => {
    if (!companyId) {
      setError('Please create a company first');
      return;
    }
    
    try {
      const companyData = {
        name: 'Updated Test Company',
        industry: 'Finance',
        email: 'updated@company.com',
        // Updated related data
        boardMembers: [
          {
            name: 'Jane Doe',
            email: 'jane@company.com',
            phone_number: '+1234567891',
            designation: 'CEO'
          },
          {
            name: 'John Smith',
            email: 'johnsmith@company.com',
            phone_number: '+1234567892',
            designation: 'CTO'
          }
        ]
      };
      
      const result = await updateCompany(companyId, companyData);
      setTestResult(result);
      setError(null);
    } catch (err) {
      setError(err);
      setTestResult(null);
    }
  };

  const handleGetCompany = async () => {
    if (!companyId) {
      setError('Please create a company first');
      return;
    }
    
    try {
      const result = await getCompanyById(companyId);
      setTestResult(result);
      setError(null);
    } catch (err) {
      setError(err);
      setTestResult(null);
    }
  };

  const handleCreateAsset = async () => {
    if (!companyId) {
      setError('Please create a company first');
      return;
    }
    
    try {
      const assetData = {
        name: 'Test Asset',
        description: 'A test asset created via Supabase',
        type: 'Real Estate',
        value: 100000,
        company_id: companyId,
        category: 'commercial',
        stage: 'under-construction',
        // Category-specific fields
        retail_space: 5000,
        frontage: 100,
        // Token information
        total_number_of_sfts: 1000,
        price_per_sft: 100,
        expected_annual_return: 8.5,
        investment_horizon: 5,
        // Related data
        nearByLocations: [
          {
            name: 'Test Location 1',
            distance: 1.5,
            type: 'shopping'
          },
          {
            name: 'Test Location 2',
            distance: 2.3,
            type: 'transport'
          }
        ],
        documents: [
          {
            type: 'image',
            url: 'https://example.com/image1.jpg',
            name: 'Asset Image 1'
          },
          {
            type: 'document',
            url: 'https://example.com/doc1.pdf',
            name: 'Asset Document 1'
          }
        ]
      };
      
      const result = await createAsset(assetData);
      setTestResult(result);
      if (result.data && result.data.id) {
        setAssetId(result.data.id);
      }
      setError(null);
    } catch (err) {
      setError(err);
      setTestResult(null);
    }
  };

  const handleUpdateAsset = async () => {
    if (!assetId) {
      setError('Please create an asset first');
      return;
    }
    
    try {
      const assetData = {
        name: 'Updated Test Asset',
        description: 'An updated test asset',
        value: 150000,
        // Updated related data
        nearByLocations: [
          {
            name: 'Updated Location 1',
            distance: 1.2,
            type: 'shopping'
          }
        ]
      };
      
      const result = await updateAsset(assetId, assetData);
      setTestResult(result);
      setError(null);
    } catch (err) {
      setError(err);
      setTestResult(null);
    }
  };

  const handleGetAsset = async () => {
    if (!assetId) {
      setError('Please create an asset first');
      return;
    }
    
    try {
      const result = await getAssetById(assetId);
      setTestResult(result);
      setError(null);
    } catch (err) {
      setError(err);
      setTestResult(null);
    }
  };

  if (loading) {
    return <div className="p-4">Loading Supabase client...</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Supabase Comprehensive Test</h1>
      
      {user ? (
        <div className="mb-6 p-4 bg-green-100 rounded">
          <h2 className="text-xl font-semibold">Authenticated User</h2>
          <p>User ID: {user.id}</p>
          <p>Email: {user.email}</p>
          <button 
            onClick={signOut}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="mb-6 p-4 bg-yellow-100 rounded">
          <h2 className="text-xl font-semibold">Not Authenticated</h2>
          <div className="mt-2">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mr-2 p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mr-2 p-2 border rounded"
            />
            <button 
              onClick={handleSignIn}
              className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Sign In
            </button>
            <button 
              onClick={handleSignUp}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <button 
          onClick={handleCreateCompany}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          disabled={!user}
        >
          Create Company
        </button>
        <button 
          onClick={handleUpdateCompany}
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          disabled={!user || !companyId}
        >
          Update Company
        </button>
        <button 
          onClick={handleGetCompany}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={!user || !companyId}
        >
          Get Company
        </button>
        <button 
          onClick={handleCreateAsset}
          className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
          disabled={!user || !companyId}
        >
          Create Asset
        </button>
        <button 
          onClick={handleUpdateAsset}
          className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
          disabled={!user || !assetId}
        >
          Update Asset
        </button>
        <button 
          onClick={handleGetAsset}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          disabled={!user || !assetId}
        >
          Get Asset
        </button>
      </div>

      {companyId && (
        <div className="mb-4 p-2 bg-gray-100 rounded">
          <p>Company ID: {companyId}</p>
        </div>
      )}

      {assetId && (
        <div className="mb-4 p-2 bg-gray-100 rounded">
          <p>Asset ID: {assetId}</p>
        </div>
      )}

      {testResult && (
        <div className="mb-6 p-4 bg-blue-100 rounded">
          <h2 className="text-xl font-semibold">Test Result</h2>
          <pre className="mt-2 bg-white p-2 rounded overflow-auto max-h-96">
            {JSON.stringify(testResult, null, 2)}
          </pre>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-100 rounded">
          <h2 className="text-xl font-semibold">Error</h2>
          <pre className="mt-2 bg-white p-2 rounded text-red-600 overflow-auto max-h-96">
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      )}

      <div className="p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-semibold">Session Info</h2>
        {session ? (
          <pre className="mt-2 bg-white p-2 rounded overflow-auto">
            {JSON.stringify(session, null, 2)}
          </pre>
        ) : (
          <p>No active session</p>
        )}
      </div>
    </div>
  );
};

export default SupabaseComprehensiveTest;
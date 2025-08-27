import React, { useState } from 'react';
import { useSupabase } from '@/hooks/useSupabase';

const SupabaseTest: React.FC = () => {
  const { 
    user, 
    session, 
    loading, 
    signUp, 
    signIn, 
    signOut,
    createCompany,
    createUser,
    createAsset
  } = useSupabase();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [testResult, setTestResult] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const handleSignUp = async () => {
    try {
      const result = await signUp(email, password, { name, phone });
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
      const result = await createCompany({
        name: 'Test Company',
        description: 'A test company created via Supabase',
        industry: 'Technology'
      });
      setTestResult(result);
      setError(null);
    } catch (err) {
      setError(err);
      setTestResult(null);
    }
  };

  const handleCreateUser = async () => {
    try {
      const result = await createUser({
        full_name: 'Test User',
        email: 'test@example.com',
        phone: '+1234567890',
        role: 'admin'
      });
      setTestResult(result);
      setError(null);
    } catch (err) {
      setError(err);
      setTestResult(null);
    }
  };

  const handleCreateAsset = async () => {
    try {
      const result = await createAsset({
        name: 'Test Asset',
        description: 'A test asset created via Supabase',
        type: 'Real Estate',
        value: 100000
      });
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
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Supabase Integration Test</h1>
      
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button 
          onClick={handleCreateCompany}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          disabled={!user}
        >
          Create Company
        </button>
        <button 
          onClick={handleCreateUser}
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          disabled={!user}
        >
          Create User
        </button>
        <button 
          onClick={handleCreateAsset}
          className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
          disabled={!user}
        >
          Create Asset
        </button>
      </div>

      {testResult && (
        <div className="mb-6 p-4 bg-blue-100 rounded">
          <h2 className="text-xl font-semibold">Test Result</h2>
          <pre className="mt-2 bg-white p-2 rounded overflow-auto">
            {JSON.stringify(testResult, null, 2)}
          </pre>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-100 rounded">
          <h2 className="text-xl font-semibold">Error</h2>
          <pre className="mt-2 bg-white p-2 rounded text-red-600">
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

export default SupabaseTest;
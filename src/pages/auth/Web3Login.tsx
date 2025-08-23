import React from "react";
import { useNavigate } from "react-router-dom";
import { useWeb3AuthConnect, useWeb3AuthDisconnect, useWeb3AuthUser } from "@web3auth/modal/react";
import { useAccount } from "wagmi";
import { LogIn, LogOut, User, Wallet } from "lucide-react";

const Web3Login: React.FC = () => {
  const { connect, isConnected, loading, error } = useWeb3AuthConnect();
  const { disconnect } = useWeb3AuthDisconnect();
  const { userInfo } = useWeb3AuthUser();
  const { address } = useAccount();
  const navigate = useNavigate();

  const handleConnect = async () => {
    try {
      await connect();
      // Redirect to home page after successful login
      navigate('/');
    } catch (err) {
      console.error("Connection error:", err);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      // Redirect to home page after logout
      navigate('/');
    } catch (err) {
      console.error("Disconnection error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="mx-auto bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Wallet className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {isConnected ? "Account Connected" : "Connect Wallet"}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {isConnected 
                  ? "Your wallet is connected to Proplex" 
                  : "Connect your wallet to access your account"}
              </p>
            </div>

            {!isConnected ? (
              <button
                onClick={handleConnect}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70"
              >
                <LogIn className="h-5 w-5" />
                {loading ? "Connecting..." : "Connect with Web3Auth"}
              </button>
            ) : (
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {userInfo?.name || "Connected User"}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {userInfo?.email || "No email provided"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Wallet Address</p>
                    <p className="font-mono text-sm text-gray-900 dark:text-white break-all">
                      {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "No address"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleDisconnect}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <LogOut className="h-5 w-5" />
                  Disconnect Wallet
                </button>
              </div>
            )}

            {error && (
              <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                <p className="text-red-700 dark:text-red-300 text-sm">
                  {error.message || "Web3Auth connection error"}
                </p>
              </div>
            )}
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700/30 px-8 py-4 text-center">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Securely connect your wallet to access decentralized features
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Web3Login;
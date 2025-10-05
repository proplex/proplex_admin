import React, { useState } from 'react';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Send,
  Download,
  Copy,
  Check,
  TrendingUp,
  Clock,
  DollarSign,
  CreditCard,
} from 'lucide-react';

// Mock data for demonstration
const mockWalletData = {
  address: '0x742d35Cc6634C0532925a3b844D2874c36c9d0a1',
  balance: {
    usd: 12847.50,
    eth: 5.234,
    tokens: [
      { symbol: 'USDT', amount: 5000, usdValue: 5000 },
      { symbol: 'USDC', amount: 3000, usdValue: 3000 },
      { symbol: 'DAI', amount: 2500, usdValue: 2500 },
    ]
  }
};

const mockTransactions = [
  {
    id: '1',
    type: 'receive',
    amount: '2.5 ETH',
    usdValue: '$4,250.00',
    from: '0x1234...5678',
    to: 'You',
    timestamp: '2024-01-15 14:30',
    status: 'completed',
    hash: '0xabc123...'
  },
  {
    id: '2',
    type: 'send',
    amount: '1000 USDT',
    usdValue: '$1,000.00',
    from: 'You',
    to: '0x9876...4321',
    timestamp: '2024-01-14 10:15',
    status: 'completed',
    hash: '0xdef456...'
  },
  {
    id: '3',
    type: 'receive',
    amount: '500 USDC',
    usdValue: '$500.00',
    from: '0x5555...6666',
    to: 'You',
    timestamp: '2024-01-13 16:45',
    status: 'completed',
    hash: '0xghi789...'
  },
  {
    id: '4',
    type: 'send',
    amount: '0.5 ETH',
    usdValue: '$850.00',
    from: 'You',
    to: '0x7777...8888',
    timestamp: '2024-01-12 09:20',
    status: 'pending',
    hash: '0xjkl012...'
  },
];

const WalletPage = () => {
  const [copied, setCopied] = useState(false);
  const [selectedTab, setSelectedTab] = useState('all');

  const handleCopyAddress = async () => {
    await navigator.clipboard.writeText(mockWalletData.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredTransactions = mockTransactions.filter(tx => {
    if (selectedTab === 'all') return true;
    return tx.type === selectedTab;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Wallet</h1>
            <p className="text-gray-600 mt-2">Manage your digital assets</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all hover:scale-105 shadow-lg">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Wallet Address Card */}
        <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-2xl transform hover:scale-[1.02] transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-white/80">Wallet Address</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="font-mono text-sm">{mockWalletData.address.slice(0, 10)}...{mockWalletData.address.slice(-8)}</p>
                  <button
                    onClick={handleCopyAddress}
                    className="p-1 hover:bg-white/20 rounded transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <p className="text-sm text-white/80">Total Balance</p>
            <p className="text-4xl font-bold mt-1">${mockWalletData.balance.usd.toLocaleString()}</p>
            <p className="text-sm text-white/80 mt-1">{mockWalletData.balance.eth} ETH</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center gap-3 p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group transform hover:scale-105">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition-colors">
              <Send className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900">Send</p>
              <p className="text-sm text-gray-500">Transfer assets</p>
            </div>
          </button>

          <button className="flex items-center justify-center gap-3 p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-green-500 hover:shadow-lg transition-all group transform hover:scale-105">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-500 transition-colors">
              <Download className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900">Receive</p>
              <p className="text-sm text-gray-500">Get assets</p>
            </div>
          </button>

          <button className="flex items-center justify-center gap-3 p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-500 hover:shadow-lg transition-all group transform hover:scale-105">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-500 transition-colors">
              <CreditCard className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900">Buy</p>
              <p className="text-sm text-gray-500">Add funds</p>
            </div>
          </button>
        </div>

        {/* Token Balances */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Token Balances</h2>
          <div className="space-y-3">
            {mockWalletData.balance.tokens.map((token, index) => (
              <div
                key={token.symbol}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer transform hover:scale-[1.02]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {token.symbol[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{token.symbol}</p>
                    <p className="text-sm text-gray-500">{token.amount.toLocaleString()} tokens</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${token.usdValue.toLocaleString()}</p>
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <TrendingUp className="w-3 h-3" />
                    <span>+2.5%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
            <div className="flex gap-2">
              {['all', 'send', 'receive'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105 ${
                    selectedTab === tab
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all cursor-pointer transform hover:scale-[1.01]"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tx.type === 'receive' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {tx.type === 'receive' ? (
                      <ArrowDownLeft className="w-5 h-5" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {tx.type === 'receive' ? 'Received' : 'Sent'} {tx.amount}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{tx.timestamp}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{tx.usdValue}</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    tx.status === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No transactions found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
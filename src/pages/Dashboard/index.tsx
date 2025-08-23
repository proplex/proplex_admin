import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Building2, 
  Users, 
  DollarSign, 
  Activity, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Eye,
  Plus,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const Dashboard = () => {
  // Mock data - in real app, this would come from API
  const [dashboardData, setDashboardData] = useState({
    totalAssets: 1247,
    totalCompanies: 89,
    totalInvestors: 156,
    totalRevenue: 2847650,
    revenueGrowth: 12.5,
    assetsGrowth: 8.3,
    companiesGrowth: -2.1,
    investorsGrowth: 15.7
  });

  const revenueData = [
    { month: 'Jan', revenue: 2200000, target: 2000000 },
    { month: 'Feb', revenue: 2350000, target: 2100000 },
    { month: 'Mar', revenue: 2180000, target: 2200000 },
    { month: 'Apr', revenue: 2420000, target: 2300000 },
    { month: 'May', revenue: 2680000, target: 2400000 },
    { month: 'Jun', revenue: 2847650, target: 2500000 }
  ];

  const assetDistribution = [
    { name: 'Technology', value: 35, count: 436, color: '#3B82F6' },
    { name: 'Healthcare', value: 28, count: 349, color: '#10B981' },
    { name: 'Finance', value: 20, count: 249, color: '#F59E0B' },
    { name: 'Real Estate', value: 17, count: 213, color: '#EF4444' }
  ];

  const performanceMetrics = [
    { category: 'Q1 2024', revenue: 6730000, profit: 1010000 },
    { category: 'Q2 2024', revenue: 7948000, profit: 1350000 },
    { category: 'Q3 2024', revenue: 8420000, profit: 1680000 },
    { category: 'Q4 2024', revenue: 9200000, profit: 2100000 }
  ];

  const recentCompanies = [
    { id: 1, name: 'TechFlow Solutions', industry: 'Technology', status: 'Active', value: '$2.5M', joinDate: '2024-08-15' },
    { id: 2, name: 'HealthCare Plus', industry: 'Healthcare', status: 'Pending', value: '$1.8M', joinDate: '2024-08-12' },
    { id: 3, name: 'GreenEnergy Corp', industry: 'Energy', status: 'Active', value: '$3.2M', joinDate: '2024-08-08' },
    { id: 4, name: 'FinTech Innovations', industry: 'Finance', status: 'Under Review', value: '$4.1M', joinDate: '2024-08-05' }
  ];

  const recentInvestors = [
    { id: 1, name: 'Sarah Johnson', type: 'Angel Investor', invested: '$500K', companies: 5, joinDate: '2024-08-14' },
    { id: 2, name: 'Venture Capital Group', type: 'VC Fund', invested: '$2.5M', companies: 12, joinDate: '2024-08-10' },
    { id: 3, name: 'Michael Chen', type: 'Private Equity', invested: '$1.2M', companies: 3, joinDate: '2024-08-06' },
    { id: 4, name: 'Innovation Partners', type: 'Investment Firm', invested: '$3.8M', companies: 8, joinDate: '2024-08-02' }
  ];

  const recentActivities = [
    { id: 1, type: 'Investment', description: 'New investment in TechFlow Solutions', amount: '$500K', time: '2 hours ago', status: 'completed' },
    { id: 2, type: 'Company', description: 'HealthCare Plus submitted application', amount: '$1.8M', time: '5 hours ago', status: 'pending' },
    { id: 3, type: 'Revenue', description: 'Monthly revenue target achieved', amount: '$2.85M', time: '1 day ago', status: 'completed' },
    { id: 4, type: 'Investor', description: 'New investor registration approved', amount: '$2.5M', time: '2 days ago', status: 'completed' },
    { id: 5, type: 'Milestone', description: 'Q2 performance milestone reached', amount: '$1.35M', time: '3 days ago', status: 'completed' }
  ];

  const pendingApprovals = [
    { id: 1, type: 'Company Application', name: 'HealthCare Plus', value: '$1.8M', priority: 'high' },
    { id: 2, type: 'Investment Request', name: 'GreenTech Startup', value: '$750K', priority: 'medium' },
    { id: 3, type: 'Investor Verification', name: 'Global Investment LLC', value: '$5.2M', priority: 'high' },
    { id: 4, type: 'Asset Valuation', name: 'PropTech Solutions', value: '$2.1M', priority: 'low' }
  ];

  const formatCurrency = (amoun:any) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num:any) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getStatusColor = (status:any) => {
    switch (status.toLowerCase()) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'under review': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const StatCard = ({ title, value, growth, icon: Icon, prefix = '', suffix = '' }) => {
    const isPositive = growth >= 0;
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group">
        {/* Subtle colored accent bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-xl" />
        
        <div className="flex items-center justify-between relative">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg group-hover:scale-110 transition-transform">
              <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {prefix}{typeof value === 'number' ? formatNumber(value) : value}{suffix}
              </p>
            </div>
          </div>
          <div className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg ${
            isPositive 
              ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/20' 
              : 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20'
          }`}>
            {isPositive ? (
              <ArrowUpRight className="h-4 w-4" />
            ) : (
              <ArrowDownRight className="h-4 w-4" />
            )}
            <span className="text-sm font-medium">{Math.abs(growth)}%</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here's what's happening with your portfolio.</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
              <Eye className="h-4 w-4 inline mr-2" />
              View Report
            </button>
            <button className="px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors shadow-sm">
              <Plus className="h-4 w-4 inline mr-2" />
              Add New
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Assets"
            value={dashboardData.totalAssets}
            growth={dashboardData.assetsGrowth}
            icon={TrendingUp}
          />
          <StatCard
            title="Total Companies"
            value={dashboardData.totalCompanies}
            growth={dashboardData.companiesGrowth}
            icon={Building2}
          />
          <StatCard
            title="Total Investors"
            value={dashboardData.totalInvestors}
            growth={dashboardData.investorsGrowth}
            icon={Users}
          />
          <StatCard
            title="Total Revenue"
            value={dashboardData.totalRevenue}
            growth={dashboardData.revenueGrowth}
            icon={DollarSign}
            prefix="$"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Revenue Trend</h3>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-400">Actual</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-400">Target</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" className="text-gray-600 dark:text-gray-400" />
                <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} className="text-gray-600 dark:text-gray-400" />
                <Tooltip formatter={(value) => [`$${(value / 1000000).toFixed(2)}M`, '']} />
                <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }} />
                <Line type="monotone" dataKey="target" stroke="#8B5CF6" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Asset Distribution Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Asset Distribution</h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={assetDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {assetDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {assetDistribution.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{item.name}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Quarterly Performance</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={performanceMetrics}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="category" className="text-gray-600 dark:text-gray-400" />
              <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} className="text-gray-600 dark:text-gray-400" />
              <Tooltip formatter={(value) => [`$${(value / 1000000).toFixed(2)}M`, '']} />
              <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="profit" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Access Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Companies */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Companies</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
            </div>
            <div className="space-y-4">
              {recentCompanies.map((company) => (
                <div key={company.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{company.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{company.industry} • {company.value}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(company.status)}`}>
                    {company.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Investors */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Investors</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
            </div>
            <div className="space-y-4">
              {recentInvestors.map((investor) => (
                <div key={investor.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{investor.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{investor.type} • {investor.invested}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{investor.companies} companies</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status Overview & Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pending Approvals */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Pending Approvals</h3>
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {pendingApprovals.length}
              </span>
            </div>
            <div className="space-y-3">
              {pendingApprovals.map((item) => (
                <div key={item.id} className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{item.type}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{item.name}</p>
                      <p className="text-xs text-gray-900 dark:text-white font-medium mt-1">{item.value}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.priority)}`}>
                      {item.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activities</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-100 dark:border-gray-600">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                      <Activity className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{activity.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm font-medium text-green-600">{activity.amount}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
            {/* Subtle green accent bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-600" />
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl group-hover:scale-110 transition-transform">
                <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Active Assets</h4>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">1,089</p>
                <p className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">87% of total portfolio</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
            {/* Subtle yellow accent bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-yellow-600" />
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl group-hover:scale-110 transition-transform">
                <Clock className="h-8 w-8 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Under Review</h4>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">124</p>
                <p className="text-amber-600 dark:text-amber-400 text-sm font-medium">Avg. review time: 3 days</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
            {/* Subtle blue accent bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600" />
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl group-hover:scale-110 transition-transform">
                <AlertCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Milestones</h4>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">34</p>
                <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Next 30 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
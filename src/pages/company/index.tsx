import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Pencil, Trash2, Trash, ArrowUpDown, TrendingUp, Building2 } from 'lucide-react';
import { Search as SearchIcon, Plus, Database, Filter, ChevronDown, RefreshCw, Loader2, MoreHorizontal, Calendar, Users, Activity } from 'lucide-react';
import { useNavigate  } from 'react-router-dom';
// Define types for the company data
interface Company {
  id: string;
  name: string;
  registrationNumber: string;
  industry: string;
  status: 'active' | 'pending' | 'inactive' | 'suspended';
  created_at: string;
  total_property: number;
  revenue: string;
  employees: number;
}

// Type for status badge config
type StatusType = 'active' | 'pending' | 'inactive' | 'suspended';

interface StatusConfig {
  bg: string;
  text: string;
  border: string;
  dot: string;
  glow: string;
}

// Type for StatCard props
interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  trend?: string;
  color?: 'blue' | 'emerald' | 'amber' | 'purple';
}

// Mock data for demonstration with proper typing
const mockCompanies: Omit<Company, 'id'>[] = [
  {
    name: 'TechCorp Solutions',
    registrationNumber: 'TC001',
    industry: 'Technology',
    status: 'active',
    created_at: '2024-01-15T08:30:00Z',
    total_property: 12,
    revenue: '2400000', // Storing as number string for easier calculations
    employees: 45
  },
  {
    name: 'Green Energy Ltd',
    registrationNumber: 'GE002',
    industry: 'Energy',
    status: 'active',
    created_at: '2024-02-20T10:15:00Z',
    total_property: 8,
    revenue: '1800000',
    employees: 32
  },
  {
    name: 'Digital Ventures',
    registrationNumber: 'DV003',
    industry: 'Digital Marketing',
    status: 'pending',
    created_at: '2024-03-10T14:22:00Z',
    total_property: 5,
    revenue: '950000',
    employees: 18
  },
  {
    name: 'Manufacturing Co',
    registrationNumber: 'MC004',
    industry: 'Manufacturing',
    status: 'inactive',
    created_at: '2024-01-05T09:45:00Z',
    total_property: 15,
    revenue: '3200000',
    employees: 78
  }
];

// Enhanced animation variants
const pageVariants = {
  initial: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  initial: { 
    opacity: 0, 
    y: 20,
    scale: 0.9
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const tableRowVariants = {
  initial: { 
    opacity: 0, 
    x: -20 
  },
  animate: (index: number) => ({ 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      delay: index * 0.1,
      ease: [0.16, 1, 0.3, 1]
    }
  }),
  hover: {
    scale: 1.02,
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
    transition: { duration: 0.2 }
  }
};

const StatusBadge = ({ status }: { status: StatusType }) => {
  // Ensure status is one of the allowed values
  const safeStatus: StatusType = (['active', 'pending', 'inactive', 'suspended'] as const).includes(status as any)
    ? status
    : 'inactive';
    
  const statusConfig: Record<StatusType, StatusConfig> = {
    active: {
      bg: 'bg-gradient-to-r from-emerald-50 to-green-100',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      dot: 'bg-emerald-500',
      glow: 'shadow-emerald-200/50'
    },
    pending: {
      bg: 'bg-gradient-to-r from-amber-50 to-yellow-100',
      text: 'text-amber-700',
      border: 'border-amber-200',
      dot: 'bg-amber-500',
      glow: 'shadow-amber-200/50'
    },
    inactive: {
      bg: 'bg-gradient-to-r from-gray-50 to-slate-100',
      text: 'text-gray-600',
      border: 'border-gray-200',
      dot: 'bg-gray-400',
      glow: 'shadow-gray-200/50'
    },
    suspended: {
      bg: 'bg-gradient-to-r from-red-50 to-rose-100',
      text: 'text-red-700',
      border: 'border-red-200',
      dot: 'bg-red-500',
      glow: 'shadow-red-200/50'
    }
  };

  const config = statusConfig[safeStatus];

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${config.bg} ${config.text} ${config.border} shadow-sm ${config.glow}`}>
      <div className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`} />
      <span className="text-sm font-medium capitalize">{status}</span>
    </div>
  );
};

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  color = "blue" 
}) => {
  const colorConfig = {
    blue: {
      accent: 'bg-blue-50',
      icon: 'bg-blue-100',
      iconColor: 'text-blue-600',
      accentColor: 'text-blue-600',
      // bar: 'from-blue-500 to-blue-600'
    },
    emerald: {
      accent: 'bg-emerald-50',
      icon: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      accentColor: 'text-emerald-600',
      // bar: 'from-emerald-500 to-emerald-600'
    },
    amber: {
      accent: 'bg-amber-50',
      icon: 'bg-amber-100',
      iconColor: 'text-amber-600',
      accentColor: 'text-amber-600',
      // bar: 'from-amber-500 to-amber-600'
    },
    purple: {
      accent: 'bg-purple-50',
      icon: 'bg-purple-100',
      iconColor: 'text-purple-600',
      accentColor: 'text-purple-600',
      // bar: 'from-purple-500 to-purple-600'
    }
  };

  const config = colorConfig[color] || colorConfig.blue;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-102 relative overflow-hidden">
      {/* Subtle colored accent bar */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r`} />
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <p className="text-gray-900 text-3xl font-bold mb-1">{value}</p>
          {subtitle && <p className={`${config.accentColor} text-sm font-medium`}>{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-xl ${config.icon} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-6 h-6 ${config.iconColor}`} />
        </div>
      </div>
      {trend && (
        <div className="flex items-center mt-3">
          <TrendingUp className={`w-4 h-4 ${config.iconColor} mr-1`} />
          <span className={`${config.accentColor} text-sm font-medium`}>{trend}</span>
        </div>
      )}
    </div>
  );
};

function Index() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [selectedCompanies, setSelectedCompanies] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<{ status: StatusType[] }>({
    status: [],
  });
  const [sortBy, setSortBy] = useState<keyof Company>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [companies] = useState<Company[]>(() => 
    mockCompanies.map((company, index) => ({
      ...company,
      id: String(index + 1), // Ensure ID is set
      // Ensure status is one of the allowed values
      status: (['active', 'pending', 'inactive', 'suspended'] as const).includes(company.status as any)
        ? company.status as StatusType
        : 'inactive' // Default to inactive if status is invalid
    }))
  );

  // Calculate stats
  const totalCompanies = companies.length;
  const activeCompanies = companies.filter(c => c.status === 'active').length;
  const pendingCompanies = companies.filter(c => c.status === 'pending').length;
  const totalRevenue = companies.reduce((sum, company) => {
    return sum + parseFloat(company.revenue);
  }, 0);

  // Filter and sort data
  const filteredData = useMemo(() => {
    // Create a type-safe copy of companies
    let result: Company[] = [...companies];
    
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(company => 
        company.name.toLowerCase().includes(searchLower) ||
        company.registrationNumber.toLowerCase().includes(searchLower) ||
        company.industry.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply status filter with type safety
    if (filters.status.length > 0) {
      // Create a type-safe filter for status
      const statusFilter = (status: string): status is StatusType => 
        ['active', 'pending', 'inactive', 'suspended'].includes(status);
      
      result = result.filter(company => 
        filters.status.some(status => statusFilter(status) && status === company.status)
      );
    }
    
    // Apply sorting with type safety
    result.sort((a, b) => {
      // Use type assertion to ensure TypeScript knows we're handling the keys correctly
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      // Handle different data types for sorting
      if (sortBy === 'created_at') {
        const aDate = new Date(aValue as string).getTime();
        const bDate = new Date(bValue as string).getTime();
        return sortOrder === 'asc' ? aDate - bDate : bDate - aDate;
      } 
      
      if (sortBy === 'revenue') {
        const aNum = parseFloat(aValue as string);
        const bNum = parseFloat(bValue as string);
        return sortOrder === 'asc' ? aNum - bNum : bNum - aNum;
      }
      
      // Default string comparison for other fields
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });
    
    // Apply pagination
    const startIndex = (page - 1) * limit;
    return result.slice(startIndex, startIndex + limit);
  }, [companies, searchTerm, filters.status, sortBy, sortOrder, page, limit]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleSort = (column: keyof Company) => {
    if (sortBy === column) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleSelectAll = () => {
    if (selectedCompanies.size === filteredData.length && filteredData.length > 0) {
      setSelectedCompanies(new Set());
    } else {
      setSelectedCompanies(new Set(filteredData.map(company => company.id)));
    }
  };

  const handleSelectCompany = (companyId: string) => {
    const newSelected = new Set(selectedCompanies);
    if (newSelected.has(companyId)) {
      newSelected.delete(companyId);
    } else {
      newSelected.add(companyId);
    }
    setSelectedCompanies(newSelected);
  };

  const formatRevenue = (amount: string | number): string => {
    // Convert to string if it's a number
    const amountStr = typeof amount === 'number' ? amount.toString() : amount;
    
    // Handle null, undefined or empty string
    if (!amountStr) return '$0';
    
    // Remove any non-numeric characters except decimal points and negative sign
    const cleanedAmount = amountStr.replace(/[^0-9.-]/g, '');
    
    // Parse to number
    const numAmount = parseFloat(cleanedAmount);
    
    // Handle invalid numbers
    if (isNaN(numAmount)) return '$0';
    
    if (numAmount >= 1000000) {
      return `$${(numAmount / 1000000).toFixed(1)}M`;
    } else if (numAmount >= 1000) {
      return `$${(numAmount / 1000).toFixed(1)}K`;
    } else if (numAmount < 0) {
      return `-$${Math.abs(numAmount).toFixed(2)}`;
    } else {
      return `$${numAmount.toFixed(2)}`;
    }
  };


  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
                Companies Dashboard
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Manage and monitor your company portfolio</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-3 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-blue-300 group"
              >
                {isRefreshing ? (
                  <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                ) : (
                  <RefreshCw className="h-5 w-5 text-gray-600 group-hover:text-blue-600 group-hover:rotate-180 transition-all duration-300" />
                )}
              </button>
              
              <button className="px-6 py-3 bg-white border border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2 group" onClick={() => navigate('/add-company')}>
                <Plus className="h-5 w-5 group-hover:rotate-180 transition-transform duration-300" />
                Add Company 
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Companies"
              value={totalCompanies}
              subtitle={`${activeCompanies} active`}
              icon={Building2}
              color="blue"
              trend="+12% this month"
            />
            <StatCard
              title="Active Companies"
              value={activeCompanies}
              subtitle={`${Math.round((activeCompanies/totalCompanies)*100)}% of total`}
              icon={Activity}
              color="emerald"
              trend="94% uptime"
            />
            <StatCard
              title="Pending Review"
              value={pendingCompanies}
              subtitle="Awaiting approval"
              icon={Calendar}
              color="amber"
              trend="2 new this week"
            />
            <StatCard
              title="Total Revenue"
              value={formatRevenue(totalRevenue)}
              subtitle="Combined portfolio"
              icon={TrendingUp}
              color="purple"
              trend="+18% growth"
            />
          </div>
        </div>

        {/* Controls Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50 p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search companies, IDs, industries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 placeholder-gray-500"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <select
                value={filters.status.join(',')}
                onChange={(e) => {
                  const value = e.target.value;
                  setFilters({
                    status: value ? value.split(',') as StatusType[] : []
                  });
                  setPage(1);
                }}
                className="appearance-none bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200"
              >
                <option value="">All Status</option>
                <option value="active">Active Only</option>
                <option value="pending">Pending Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Sort Controls */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 whitespace-nowrap">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as keyof Company)}
                className="appearance-none bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200"
              >
                <option value="name">Name</option>
                <option value="created_at">Date Created</option>
                <option value="total_property">Properties</option>
                <option value="status">Status</option>
              </select>
              
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-2 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-blue-300 transition-all duration-200"
              >
                <ArrowUpDown className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center p-12">
              <div className="flex items-center gap-3 text-gray-600">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-lg font-medium">Loading companies...</span>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <input
                        type="checkbox"
                        checked={selectedCompanies.size === filteredData.length && filteredData.length > 0}
                        onChange={handleSelectAll}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                    </th>
                    {[
                      { key: 'registrationNumber', label: 'Company ID' },
                      { key: 'name', label: 'Company' },
                      { key: 'industry', label: 'Industry' },
                      { key: 'created_at', label: 'Created' },
                      { key: 'total_property', label: 'Properties' },
                      { key: 'revenue', label: 'Revenue' },
                      { key: 'employees', label: 'Employees' },
                      { key: 'status', label: 'Status' },
                      { key: 'actions', label: 'Actions' }
                    ].map((column) => (
                      <th
                        key={column.key}
                        className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                      >
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100/50">
                  {filteredData.length > 0 ? (
                    filteredData.map((company, index) => (
                      <tr
                        key={company.id}
                        className="hover:bg-blue-50/30 transition-all duration-200 group"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedCompanies.has(company.id)}
                            onChange={() => handleSelectCompany(company.id)}
                            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                            {company.registrationNumber}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                              <Building2 className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{company.name}</div>
                              <div className="text-sm text-gray-500">{company.industry}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(company.created_at).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(company.created_at).toLocaleTimeString('en-US', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                              <Database className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-900">{company.total_property}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-gray-900">{formatRevenue(company.revenue)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-900">{company.employees}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={company.status} />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200">
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={10} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                            <Database className="w-8 h-8 text-gray-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-1">No companies found</h3>
                            <p className="text-gray-500">
                              {searchTerm ? "Try adjusting your search criteria." : "Get started by adding your first company."}
                            </p>
                          </div>
                          <button className="px-6 py-3 bg-white border border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2" onClick={() => navigate('/add-company')}>
                            <Plus className="h-4 w-4" />
                            Add Company
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredData.length > 0 && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Showing</span>
              <span className="font-medium">{((page - 1) * limit) + 1}</span>
              <span>to</span>
              <span className="font-medium">{Math.min(page * limit, companies.length)}</span>
              <span>of</span>
              <span className="font-medium">{companies.length}</span>
              <span>companies</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Previous
              </button>
              
              <div className="flex items-center gap-1">
                {[...Array(Math.ceil(companies.length / limit))].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setPage(index + 1)}
                    className={`w-10 h-10 text-sm font-medium rounded-lg transition-all duration-200 ${
                      page === index + 1
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                        : 'text-gray-600 bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              
              <button
                disabled={page === Math.ceil(companies.length / limit)}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Index;
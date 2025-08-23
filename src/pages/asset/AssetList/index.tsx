/* eslint-disable react/display-name */
import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Plus,
  RefreshCw,
  List,
  Grid,
  Eye,
  Edit3,
  MoreHorizontal,
  Home,
  Building,
  TrendingUp,
  DollarSign,
  Activity,
  Target,
  Users,
  MapPin,
  Star,
  CheckCircle,
  Clock,
  AlertTriangle,
  ChevronDown,
  Loader2,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* TYPES                                                              */
/* ------------------------------------------------------------------ */
type AssetStatus = 'active' | 'pending' | 'inactive';
type AssetStage =
  | 'Fully Rented'
  | 'Stabilized'
  | 'Under Construction'
  | 'Pre-Construction'
  | 'Value-Add';
type AssetType = 'Residential' | 'Commercial' | 'Mixed-Use' | 'Retail';

interface Asset {
  _id: string;
  name: string;
  location: string;
  type: AssetType;
  value: number;
  status: AssetStatus;
  stage: AssetStage;
  occupancy: number;
  monthlyRent: number;
  roi: number;
  rating: number;
  yearBuilt: number;
  units: number;
}

/* ------------------------------------------------------------------ */
/* MOCK DATA                                                          */
/* ------------------------------------------------------------------ */
const mockAssets: Asset[] = [
  {
    _id: '1',
    name: 'Luxury Residential Complex',
    location: 'Manhattan, NY',
    type: 'Residential',
    value: 2_500_000,
    status: 'active',
    stage: 'Stabilized',
    occupancy: 95,
    monthlyRent: 12_000,
    roi: 12.5,
    rating: 4.8,
    yearBuilt: 2019,
    units: 24,
  },
  {
    _id: '2',
    name: 'Commercial Office Building',
    location: 'Downtown LA',
    type: 'Commercial',
    value: 4_800_000,
    status: 'active',
    stage: 'Fully Rented',
    occupancy: 100,
    monthlyRent: 25_000,
    roi: 15.2,
    rating: 4.9,
    yearBuilt: 2020,
    units: 8,
  },
  {
    _id: '3',
    name: 'Mixed-Use Development',
    location: 'Chicago, IL',
    type: 'Mixed-Use',
    value: 3_200_000,
    status: 'pending',
    stage: 'Under Construction',
    occupancy: 0,
    monthlyRent: 0,
    roi: 8.7,
    rating: 4.6,
    yearBuilt: 2024,
    units: 36,
  },
  {
    _id: '4',
    name: 'Retail Shopping Center',
    location: 'Miami, FL',
    type: 'Retail',
    value: 1_800_000,
    status: 'inactive',
    stage: 'Value-Add',
    occupancy: 65,
    monthlyRent: 8_500,
    roi: 6.3,
    rating: 4.2,
    yearBuilt: 2018,
    units: 12,
  },
  {
    _id: '5',
    name: 'Waterfront Condominiums',
    location: 'San Diego, CA',
    type: 'Residential',
    value: 3_800_000,
    status: 'active',
    stage: 'Stabilized',
    occupancy: 88,
    monthlyRent: 18_500,
    roi: 11.2,
    rating: 4.7,
    yearBuilt: 2021,
    units: 18,
  },
  {
    _id: '6',
    name: 'Tech Campus Hub',
    location: 'Austin, TX',
    type: 'Commercial',
    value: 6_200_000,
    status: 'active',
    stage: 'Fully Rented',
    occupancy: 98,
    monthlyRent: 32_000,
    roi: 16.8,
    rating: 4.9,
    yearBuilt: 2022,
    units: 15,
  },
];

/* ------------------------------------------------------------------ */
/* HELPERS                                                            */
/* ------------------------------------------------------------------ */
const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);

const formatCompact = (amount: number) => {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(1)}K`;
  return `$${amount}`;
};

/* ------------------------------------------------------------------ */
/* SUB-COMPONENTS                                                     */
/* ------------------------------------------------------------------ */
const StatusBadge: React.FC<{ status: AssetStatus }> = ({ status }) => {
  const cfg = {
    active: {
      bg: 'from-emerald-50 to-green-100',
      text: 'text-emerald-700',
      icon: CheckCircle,
    },
    pending: {
      bg: 'from-amber-50 to-yellow-100',
      text: 'text-amber-700',
      icon: Clock,
    },
    inactive: {
      bg: 'from-slate-50 to-gray-100',
      text: 'text-slate-600',
      icon: AlertTriangle,
    },
  }[status];

  const Icon = cfg.icon;
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border bg-gradient-to-r ${cfg.bg} ${cfg.text} shadow-sm`}
    >
      <Icon className="w-3 h-3" />
      <span className="text-sm font-medium capitalize">{status}</span>
    </div>
  );
};

const StageIndicator: React.FC<{ stage: AssetStage }> = ({ stage }) => {
  const cfg = {
    'Fully Rented': { color: 'bg-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-700' },
    Stabilized: { color: 'bg-blue-500', bg: 'bg-blue-50', text: 'text-blue-700' },
    'Under Construction': { color: 'bg-orange-500', bg: 'bg-orange-50', text: 'text-orange-700' },
    'Pre-Construction': { color: 'bg-purple-500', bg: 'bg-purple-50', text: 'text-purple-700' },
    'Value-Add': { color: 'bg-pink-500', bg: 'bg-pink-50', text: 'text-pink-700' },
  }[stage] ?? { color: '', bg: '', text: '' };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg ${cfg.bg} ${cfg.text}`}>
      <div className={`w-2 h-2 rounded-full ${cfg.color} animate-pulse`} />
      <span className="text-xs font-medium">{stage}</span>
    </div>
  );
};

const StatCard: React.FC<{
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ElementType;
  color?: 'blue' | 'emerald' | 'purple' | 'amber' | 'pink';
  trend?: string;
  change?: number;
  delay?: number;
}> = ({ title, value, subtitle, icon: Icon, color = 'blue', trend, change, delay = 0 }) => {
  const colorCfg = {
    blue: 'from-blue-500 via-blue-600 to-indigo-700',
    emerald: 'from-emerald-500 via-green-600 to-teal-700',
    purple: 'from-purple-500 via-violet-600 to-indigo-700',
    amber: 'from-amber-500 via-orange-600 to-red-700',
    pink: 'from-pink-500 via-rose-600 to-red-700',
  }[color];

  return (
    <motion.div
      className={`bg-gradient-to-br ${colorCfg} rounded-2xl p-6 shadow-xl border border-white/10 backdrop-blur-sm relative overflow-hidden group`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, y: -4 }}
    >
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-white/80 text-sm">{title}</p>
            <p className="text-white text-3xl font-bold">{value}</p>
            {subtitle && <p className="text-white/70 text-sm mt-1">{subtitle}</p>}
          </div>
          <div className="p-3 rounded-xl bg-white/10">
            <Icon className="w-6 h-6 text-white/80" />
          </div>
        </div>
        {(trend || change !== undefined) && (
          <div className="flex items-center justify-between mt-3 text-sm">
            {trend && (
              <div className="flex items-center gap-2 text-white/80">
                <TrendingUp className="w-4 h-4" />
                <span>{trend}</span>
              </div>
            )}
            {change !== undefined && (
              <span className={change > 0 ? 'text-green-300' : 'text-red-300'}>
                {change > 0 ? '+' : ''}{change}%
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const AssetCard: React.FC<{ asset: Asset; index: number }> = ({ asset, index }) => {
  const TypeIcon = asset.type === 'Residential' ? Home : Building;
  return (
    <motion.div
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-2xl transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
          <TypeIcon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg">{asset.name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <MapPin className="w-3 h-3" />
            <span>{asset.location}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="text-xs text-gray-600">{asset.rating}</span>
          </div>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Eye className="w-4 h-4 text-gray-500" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Edit3 className="w-4 h-4 text-gray-500" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <MoreHorizontal className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="space-y-2 mt-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Value</span>
          <span className="font-semibold">{formatCurrency(asset.value)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Monthly</span>
          <span className="font-semibold">
            {asset.monthlyRent ? formatCurrency(asset.monthlyRent) : '—'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Occupancy</span>
          <span className="font-semibold">{asset.occupancy}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">ROI</span>
          <span className="font-semibold text-emerald-600">{asset.roi}%</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <StatusBadge status={asset.status} />
        <StageIndicator stage={asset.stage} />
      </div>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/* MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */
export default function Index() {
  const navigate = useNavigate();
  const [assets] = useState<Asset[]>(mockAssets);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<{ status: string; type: string; stage: string }>({
    status: '',
    type: '',
    stage: '',
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortKey, setSortKey] = useState<keyof Asset>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: keyof Asset) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsRefreshing(false);
  }, []);

  const filteredSortedAssets = useMemo(() => {
    const filtered = assets.filter((a) => {
      const q = search.toLowerCase();
      return (
        (a.name.toLowerCase().includes(q) || a.location.toLowerCase().includes(q) || a.type.toLowerCase().includes(q)) &&
        (!filters.status || a.status === filters.status) &&
        (!filters.type || a.type === filters.type) &&
        (!filters.stage || a.stage === filters.stage)
      );
    });

    return [...filtered].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === 'string' && typeof bv === 'string')
        return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      if (typeof av === 'number' && typeof bv === 'number')
        return sortDir === 'asc' ? av - bv : bv - av;
      return 0;
    });
  }, [assets, search, filters, sortKey, sortDir]);

  /* -------------------- Stats -------------------- */
  const totalValue = useMemo(() => assets.reduce((s, a) => s + a.value, 0), [assets]);
  const totalMonthlyRent = useMemo(() => assets.reduce((s, a) => s + a.monthlyRent, 0), [assets]);
  const totalUnits = useMemo(() => assets.reduce((s, a) => s + a.units, 0), [assets]);
  const averageROI = useMemo(() => assets.reduce((s, a) => s + a.roi, 0) / assets.length, [assets]);
  const averageOccupancy = useMemo(() => assets.reduce((s, a) => s + a.occupancy, 0) / assets.length, [assets]);
  const activeAssets = useMemo(() => assets.filter((a) => a.status === 'active').length, [assets]);

  // Toggle row selection
  const toggleRow = useCallback((id: string) => {
    setSelectedRows(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      return newSelection;
    });
  }, []);

  // Toggle all rows
  const toggleAllRows = useCallback(() => {
    setSelectedRows(prev => {
      if (prev.size === filteredSortedAssets.length) {
        return new Set();
      } else {
        return new Set(filteredSortedAssets.map(asset => asset._id));
      }
    });
  }, [filteredSortedAssets]);

  /* -------------------- Render -------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/40 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Assets Management
            </h1>
            <p className="text-gray-600 text-sm mt-1">Manage your real estate portfolio</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              {isRefreshing ? (
                <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
              ) : (
                <RefreshCw className="w-5 h-5 text-gray-600" />
              )}
            </button>

            <button 
              onClick={() => navigate('/add-asset')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Asset
            </button>
          </div>
        </motion.header>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6"
        >
          <StatCard title="Total Assets" value={String(assets.length)} icon={Activity} delay={0} />
          <StatCard title="Active" value={String(activeAssets)} icon={CheckCircle} color="emerald" delay={0.1} />
          <StatCard title="Value" value={formatCompact(totalValue)} icon={DollarSign} color="purple" delay={0.2} />
          <StatCard title="Monthly" value={formatCompact(totalMonthlyRent)} icon={TrendingUp} color="amber" delay={0.3} />
          <StatCard title="Avg ROI" value={`${averageROI.toFixed(1)}%`} icon={Target} color="pink" delay={0.4} />
          <StatCard title="Units" value={String(totalUnits)} icon={Users} delay={0.5} />
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search assets, locations, types..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/80 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400/40 transition"
              />
            </div>

            <div className="flex gap-4">
              {(['status', 'type', 'stage'] as const).map((key) => (
                <div key={key} className="relative">
                  <select
                    value={filters[key]}
                    onChange={(e) => setFilters((p) => ({ ...p, [key]: e.target.value }))}
                    className="appearance-none bg-white/80 border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-400/40 transition"
                  >
                    <option value="">All {key}</option>
                    {key === 'status' && ['active', 'pending', 'inactive'].map((v) => <option key={v}>{v}</option>)}
                    {key === 'type' && ['Residential', 'Commercial', 'Mixed-Use', 'Retail'].map((v) => <option key={v}>{v}</option>)}
                    {key === 'stage' &&
                      ['Fully Rented', 'Stabilized', 'Under Construction', 'Pre-Construction', 'Value-Add'].map((v) => (
                        <option key={v}>{v}</option>
                      ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Assets Table */}
        <motion.div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      checked={selectedRows.size > 0 && selectedRows.size === filteredSortedAssets.length}
                      onChange={toggleAllRows}
                    />
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      Asset
                      <button
                        onClick={() => handleSort('name')}
                        className="ml-1 text-gray-400 hover:text-gray-600"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      Value
                      <button
                        onClick={() => handleSort('value')}
                        className="ml-1 text-gray-400 hover:text-gray-600"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stage
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ROI
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSortedAssets.length > 0 ? (
                  filteredSortedAssets.map((asset) => (
                    <motion.tr
                      key={asset._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          checked={selectedRows.has(asset._id)}
                          onChange={() => toggleRow(asset._id)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Building className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                            <div className="text-sm text-gray-500">{asset.type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{asset.location}</div>
                        <div className="text-sm text-gray-500">{asset.units} units</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{formatCurrency(asset.value)}</div>
                        <div className="text-sm text-gray-500">{formatCurrency(asset.monthlyRent)}/mo</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={asset.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StageIndicator stage={asset.stage} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{asset.roi}%</div>
                        <div className="text-sm text-gray-500">{asset.occupancy}% occupied</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="h-5 w-5" />
                          </button>
                          <button className="text-indigo-600 hover:text-indigo-900">
                            <Edit3 className="h-5 w-5" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center">
                      <div className="text-gray-500">No assets found. Try adjusting your search or filters.</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

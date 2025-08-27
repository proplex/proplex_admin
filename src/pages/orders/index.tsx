import { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  Clock,
  Copy,
  Eye,
  ShoppingCart,
  XCircle,
  Search,
  RefreshCw,
  Plus,
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  MoreVertical,
  Package,
  CreditCard,
  TrendingUp,
  AlertTriangle,
  Calendar,
  DollarSign,
  User,
  Hash,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */
type StatusValue = 'pending' | 'approved' | 'rejected' | 'refunded' | 'failed' | 'cancelled' | 'processing' | 'completed' | 'shipped';
type PaymentType = 'credit_card' | 'bank_transfer' | 'crypto' | 'paypal' | 'wire_transfer';

interface Order {
  _id: string;
  investorId: {
    fullName: string;
    email: string;
    avatar?: string;
  };
  tokensBooked: number;
  totalOrderValue: number;
  currency: 'USD' | 'INR';
  paymentType: PaymentType;
  currentStatus: StatusValue;
  createdAt: string;
  updatedAt: string;
  orderNumber: string;
  fees: number;
  notes?: string;
}

/* -------------------------------------------------------------------------- */
/*                               STATUS STYLES                               */
/* -------------------------------------------------------------------------- */
const statusBadgeStyles: Record<StatusValue, string> = {
  pending: 'bg-amber-50 text-amber-700 border border-amber-200',
  approved: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  completed: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  rejected: 'bg-red-50 text-red-700 border border-red-200',
  refunded: 'bg-purple-50 text-purple-700 border border-purple-200',
  failed: 'bg-slate-50 text-slate-700 border border-slate-200',
  cancelled: 'bg-red-50 text-red-700 border border-red-200',
  processing: 'bg-blue-50 text-blue-700 border border-blue-200',
  shipped: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
};

const statusIcons: Record<StatusValue, React.ElementType> = {
  pending: Clock,
  approved: CheckCircle,
  completed: CheckCircle,
  rejected: XCircle,
  refunded: RefreshCw,
  failed: XCircle,
  cancelled: XCircle,
  processing: Package,
  shipped: Package,
};

const paymentTypeLabels: Record<PaymentType, string> = {
  credit_card: 'Credit Card',
  bank_transfer: 'Bank Transfer',
  crypto: 'Cryptocurrency',
  paypal: 'PayPal',
  wire_transfer: 'Wire Transfer',
};

/* -------------------------------------------------------------------------- */
/*                                MOCK DATA                                   */
/* -------------------------------------------------------------------------- */
const mockOrders: Order[] = [
  {
    _id: '507f1f77bcf86cd799439011',
    orderNumber: 'ORD-2024-001',
    investorId: {
      fullName: 'John Smith',
      email: 'john.smith@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    tokensBooked: 1500,
    totalOrderValue: 75000,
    currency: 'USD',
    paymentType: 'credit_card',
    currentStatus: 'completed',
    createdAt: '2024-08-15T10:30:00Z',
    updatedAt: '2024-08-15T14:30:00Z',
    fees: 750,
  },
  {
    _id: '507f1f77bcf86cd799439012',
    orderNumber: 'ORD-2024-002',
    investorId: {
      fullName: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    tokensBooked: 2000,
    totalOrderValue: 100000,
    currency: 'USD',
    paymentType: 'bank_transfer',
    currentStatus: 'processing',
    createdAt: '2024-08-16T09:15:00Z',
    updatedAt: '2024-08-16T11:20:00Z',
    fees: 1000,
  },
  {
    _id: '507f1f77bcf86cd799439013',
    orderNumber: 'ORD-2024-003',
    investorId: {
      fullName: 'Michael Chen',
      email: 'michael.chen@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    tokensBooked: 500,
    totalOrderValue: 25000,
    currency: 'USD',
    paymentType: 'crypto',
    currentStatus: 'pending',
    createdAt: '2024-08-17T14:20:00Z',
    updatedAt: '2024-08-17T14:20:00Z',
    fees: 250,
  },
  {
    _id: '507f1f77bcf86cd799439014',
    orderNumber: 'ORD-2024-004',
    investorId: {
      fullName: 'Emily Davis',
      email: 'emily.davis@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
    tokensBooked: 3000,
    totalOrderValue: 150000,
    currency: 'USD',
    paymentType: 'wire_transfer',
    currentStatus: 'approved',
    createdAt: '2024-08-18T11:00:00Z',
    updatedAt: '2024-08-18T16:30:00Z',
    fees: 1500,
  },
  {
    _id: '507f1f77bcf86cd799439015',
    orderNumber: 'ORD-2024-005',
    investorId: {
      fullName: 'David Wilson',
      email: 'david.wilson@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    tokensBooked: 750,
    totalOrderValue: 37500,
    currency: 'USD',
    paymentType: 'paypal',
    currentStatus: 'failed',
    createdAt: '2024-08-19T08:45:00Z',
    updatedAt: '2024-08-19T09:00:00Z',
    fees: 375,
    notes: 'Payment declined by bank',
  },
  {
    _id: '507f1f77bcf86cd799439016',
    orderNumber: 'ORD-2024-006',
    investorId: {
      fullName: 'Lisa Rodriguez',
      email: 'lisa.rodriguez@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    tokensBooked: 1200,
    totalOrderValue: 60000,
    currency: 'USD',
    paymentType: 'credit_card',
    currentStatus: 'refunded',
    createdAt: '2024-08-14T15:30:00Z',
    updatedAt: '2024-08-20T10:15:00Z',
    fees: 600,
    notes: 'Customer requested refund',
  },
  {
    _id: '507f1f77bcf86cd799439017',
    orderNumber: 'ORD-2024-007',
    investorId: {
      fullName: 'James Thompson',
      email: 'james.thompson@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    tokensBooked: 4000,
    totalOrderValue: 200000,
    currency: 'USD',
    paymentType: 'bank_transfer',
    currentStatus: 'shipped',
    createdAt: '2024-08-12T12:00:00Z',
    updatedAt: '2024-08-19T14:45:00Z',
    fees: 2000,
  },
  {
    _id: '507f1f77bcf86cd799439018',
    orderNumber: 'ORD-2024-008',
    investorId: {
      fullName: 'Anna Martinez',
      email: 'anna.martinez@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
    },
    tokensBooked: 800,
    totalOrderValue: 40000,
    currency: 'USD',
    paymentType: 'crypto',
    currentStatus: 'cancelled',
    createdAt: '2024-08-20T13:15:00Z',
    updatedAt: '2024-08-20T13:45:00Z',
    fees: 400,
    notes: 'Cancelled by customer',
  }
];

/* -------------------------------------------------------------------------- */
/*                                UI HELPERS                                  */
/* -------------------------------------------------------------------------- */
const StatusBadge = ({ status }: { status: StatusValue }) => {
  const Icon = statusIcons[status];
  return (
    <div className={`${statusBadgeStyles[status]} inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium shadow-sm`}>
      <Icon className="h-3 w-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  );
};

const StatCard: React.FC<{
  title: string;
  value: number;
  icon: React.ElementType;
  description?: string;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  color: 'blue' | 'emerald' | 'amber' | 'red' | 'purple';
}> = ({ title, value, icon: Icon, description, trend, trendDirection = 'neutral', color }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    emerald: 'from-emerald-500 to-emerald-600',
    amber: 'from-amber-500 to-amber-600',
    red: 'from-red-500 to-red-600',
    purple: 'from-purple-500 to-purple-600',
  };

  const TrendIcon = trendDirection === 'up' ? ArrowUpRight : 
                   trendDirection === 'down' ? ArrowDownRight : Minus;

  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="text-2xl font-bold text-slate-900">{value.toLocaleString()}</p>
          {(description || trend) && (
            <div className="flex items-center gap-1.5">
              {trend && <TrendIcon className={`h-3 w-3 ${
                trendDirection === 'up' ? 'text-emerald-600' : 
                trendDirection === 'down' ? 'text-red-600' : 'text-slate-500'
              }`} />}
              <p className="text-xs text-slate-500">{description || trend}</p>
            </div>
          )}
        </div>
        <div className={`rounded-lg bg-gradient-to-br ${colorClasses[color]} p-2.5 shadow-sm`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-slate-100 to-slate-200 opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
};

const formatCompactNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text);
  // You could add a toast notification here
};

/* -------------------------------------------------------------------------- */
/*                             MAIN COMPONENT                                 */
/* -------------------------------------------------------------------------- */
export default function OrdersPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Filter and search logic
  const filteredOrders = useMemo(() => {
    return mockOrders.filter((order) => {
      const matchesSearch = 
        order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
        order.investorId.fullName.toLowerCase().includes(search.toLowerCase()) ||
        order.investorId.email.toLowerCase().includes(search.toLowerCase()) ||
        order._id.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = filter === 'all' || order.currentStatus === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  // Pagination
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  }, [filteredOrders, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Statistics
  const stats = useMemo(() => {
    const totalOrders = mockOrders.length;
    const completedOrders = mockOrders.filter(o => o.currentStatus === 'completed' || o.currentStatus === 'shipped').length;
    const pendingOrders = mockOrders.filter(o => o.currentStatus === 'pending' || o.currentStatus === 'processing').length;
    const failedOrders = mockOrders.filter(o => o.currentStatus === 'failed' || o.currentStatus === 'cancelled').length;
    const totalValue = mockOrders.reduce((sum, o) => sum + o.totalOrderValue, 0);

    return {
      totalOrders,
      completedOrders,
      pendingOrders,
      failedOrders,
      totalValue,
    };
  }, []);

  return (
    <div className="min-h-screen  p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Enhanced Header */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-2.5 shadow-lg">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Orders</h1>
                <p className="text-slate-600">Manage and track all investment orders</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md">
              <Download className="h-4 w-4" />
              Export
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
            <button 
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-md"
              onClick={() => navigate('/orders/new')}
            >
              <Plus className="h-4 w-4" />
              New Order
            </button>
          </div>
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard 
            title="Total Orders" 
            value={stats.totalOrders} 
            icon={ShoppingCart} 
            description="+8 this week"
            trendDirection="up"
            color="blue" 
          />
          <StatCard 
            title="Completed" 
            value={stats.completedOrders} 
            icon={CheckCircle} 
            description="Successfully processed"
            color="emerald" 
          />
          <StatCard 
            title="Pending" 
            value={stats.pendingOrders} 
            icon={Clock} 
            description="Awaiting processing"
            color="amber" 
          />
          <StatCard 
            title="Failed/Cancelled" 
            value={stats.failedOrders} 
            icon={AlertTriangle} 
            description="Requires attention"
            color="red" 
          />
          <StatCard 
            title="Total Value" 
            value={stats.totalValue} 
            icon={DollarSign} 
            description="+15.2% this month"
            trendDirection="up"
            color="purple" 
          />
        </div>

        {/* Enhanced Filters */}
        <div className="rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-md">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by order ID, investor name, or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-slate-50/50 py-2.5 pl-11 pr-4 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="approved">Approved</option>
                  <option value="completed">Completed</option>
                  <option value="shipped">Shipped</option>
                  <option value="failed">Failed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="refunded">Refunded</option>
                </select>
                <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Table */}
        <div className="overflow-hidden rounded-xl border border-slate-200/60 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-200/60 bg-slate-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Order
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Investor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Tokens
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Order Value
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Payment
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Created
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60">
                {paginatedOrders.length ? (
                  paginatedOrders.map((order) => (
                    <tr 
                      key={order._id} 
                      className="group transition-colors hover:bg-slate-50/50"
                    >
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleCopy(order._id)}
                              className="text-slate-400 hover:text-slate-600"
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                            <span className="font-mono text-sm text-slate-900">{order.orderNumber}</span>
                          </div>
                          <p className="text-xs text-slate-500 font-mono">{order._id.slice(0, 8)}...</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={order.investorId.avatar}
                            alt={order.investorId.fullName}
                            className="h-8 w-8 rounded-full object-cover ring-2 ring-slate-200/60"
                          />
                          <div>
                            <p className="font-semibold text-slate-900">{order.investorId.fullName}</p>
                            <p className="text-xs text-slate-500">{order.investorId.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Hash className="h-3 w-3 text-slate-400" />
                          <span className="font-semibold text-slate-900">
                            {order.tokensBooked.toLocaleString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-emerald-600" />
                            <span className="font-semibold text-slate-900">
                              ${formatCompactNumber(order.totalOrderValue)}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">
                            Fees: ${formatCompactNumber(order.fees)}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-3 w-3 text-slate-400" />
                          <span className="text-sm text-slate-700">
                            {paymentTypeLabels[order.paymentType]}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={order.currentStatus} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3 text-slate-400" />
                            <p className="text-sm text-slate-700">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <p className="text-xs text-slate-500">
                            {new Date(order.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                          <button 
                            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-blue-600"
                            onClick={() => navigate(`/order-details/${order._id}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center">
                      <div className="space-y-3">
                        <ShoppingCart className="mx-auto h-12 w-12 text-slate-300" />
                        <p className="text-slate-500">No orders found matching your criteria.</p>
                        <button 
                          onClick={() => {setSearch(''); setFilter('all');}}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          Clear filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Enhanced Pagination */}
        <div className="flex items-center justify-between rounded-lg border border-slate-200/60 bg-white px-6 py-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>Showing</span>
            <span className="font-semibold text-slate-900">
              {(currentPage - 1) * itemsPerPage + 1}–
              {Math.min(currentPage * itemsPerPage, filteredOrders.length)}
            </span>
            <span>of</span>
            <span className="font-semibold text-slate-900">{filteredOrders.length}</span>
            <span>orders</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => p - 1)}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
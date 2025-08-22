import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search as SearchIcon,
  Filter,
  Users,
  Activity,
  Clock,
  TrendingUp,
  Plus,
  RefreshCw,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Download,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Globe,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  TrendingDown,
} from 'lucide-react';

/* ---------- TYPE DEFINITIONS ---------- */
type StatusType = 'active' | 'inactive' | 'pending' | 'suspended' | 'verified';

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: StatusType;
  joinDate: string;
  lastLogin: string;
  investments: number;
  avatar?: string;
  country?: string;
}

/* ---------- STATUS BADGE ---------- */
const statusStyles: Record<StatusType, string> = {
  active: 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm',
  pending: 'bg-amber-50 text-amber-700 border border-amber-200 shadow-sm',
  inactive: 'bg-slate-50 text-slate-700 border border-slate-200 shadow-sm',
  suspended: 'bg-red-50 text-red-700 border border-red-200 shadow-sm',
  verified: 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm',
};

const StatusBadge = ({ status }: { status: StatusType }) => (
  <div className={`${statusStyles[status]} inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium`}>
    <div className={`h-1.5 w-1.5 rounded-full ${
      status === 'active' ? 'bg-emerald-500' :
      status === 'pending' ? 'bg-amber-500' :
      status === 'verified' ? 'bg-blue-500' :
      status === 'inactive' ? 'bg-slate-400' : 'bg-red-500'
    }`} />
    {status.charAt(0).toUpperCase() + status.slice(1)}
  </div>
);

/* ---------- ENHANCED STAT CARD ---------- */
interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  color?: 'blue' | 'green' | 'amber' | 'purple';
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  trendDirection = 'neutral',
  color = 'blue'
}) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-emerald-500 to-emerald-600',
    amber: 'from-amber-500 to-amber-600',
    purple: 'from-purple-500 to-purple-600',
  };

  const TrendIcon = trendDirection === 'up' ? ArrowUpRight : 
                   trendDirection === 'down' ? ArrowDownRight : TrendingDown;

  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          {subtitle && (
            <div className="flex items-center gap-1.5">
              {trend && <TrendIcon className={`h-3 w-3 ${
                trendDirection === 'up' ? 'text-emerald-600' : 
                trendDirection === 'down' ? 'text-red-600' : 'text-slate-500'
              }`} />}
              <p className="text-xs text-slate-500">{subtitle}</p>
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

/* ---------- MOCK DATA ---------- */
const mockCustomers: Customer[] = [
  {
    id: 'CUST-001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (202) 555-0101',
    status: 'active',
    joinDate: '2023-01-15T10:30:00Z',
    lastLogin: '2024-06-10T14:45:00Z',
    investments: 50_000,
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    country: 'United States',
  },
  {
    id: 'CUST-002',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (415) 555-0198',
    status: 'pending',
    joinDate: '2023-02-20T09:15:00Z',
    lastLogin: '2024-06-09T12:20:00Z',
    investments: 25_000,
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    country: 'United States',
  },
  {
    id: 'CUST-003',
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.johnson@example.com',
    phone: '+1 (312) 555-0165',
    status: 'verified',
    joinDate: '2022-11-05T08:00:00Z',
    lastLogin: '2024-06-11T09:00:00Z',
    investments: 120_000,
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    country: 'United States',
  },
  {
    id: 'CUST-004',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@example.com',
    phone: '+1 (646) 555-0123',
    status: 'inactive',
    joinDate: '2023-07-30T14:20:00Z',
    lastLogin: '2023-12-01T10:00:00Z',
    investments: 75_000,
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    country: 'United States',
  },
  {
    id: 'CUST-005',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.wilson@example.com',
    phone: '+1 (305) 555-0187',
    status: 'suspended',
    joinDate: '2022-05-10T12:00:00Z',
    lastLogin: '2024-05-30T15:30:00Z',
    investments: 10_000,
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    country: 'United States',
  },
  {
    id: 'CUST-006',
    firstName: 'Ashley',
    lastName: 'Martinez',
    email: 'ashley.martinez@example.com',
    phone: '+1 (213) 555-0234',
    status: 'active',
    joinDate: '2023-03-12T11:00:00Z',
    lastLogin: '2024-06-11T08:45:00Z',
    investments: 60_000,
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    country: 'United States',
  },
];

const ITEMS_PER_PAGE = 10;

export default function CustomersPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusType | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    return mockCustomers
      .filter((c) =>
        [c.firstName, c.lastName, c.email].some((field) =>
          field.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      .filter((c) => statusFilter === 'all' || c.status === statusFilter);
  }, [searchTerm, statusFilter]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Enhanced Header */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-2.5 shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Customers</h1>
                <p className="text-slate-600">Manage your customers and their information</p>
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
              onClick={() => navigate('/customers/new')}
            >
              <Plus className="h-4 w-4" />
              Add Customer
            </button>
          </div>
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Customers"
            value={mockCustomers.length}
            subtitle="+2 from last month"
            icon={Users}
            trendDirection="up"
            color="blue"
          />
          <StatCard
            title="Active"
            value={mockCustomers.filter((c) => c.status === 'active').length}
            subtitle="Currently engaged"
            icon={Activity}
            color="green"
          />
          <StatCard
            title="Pending Review"
            value={mockCustomers.filter((c) => c.status === 'pending').length}
            subtitle="Awaiting approval"
            icon={Clock}
            color="amber"
          />
          <StatCard
            title="Total Portfolio"
            value={`$${mockCustomers.reduce((sum, c) => sum + c.investments, 0).toLocaleString()}`}
            subtitle="+12.5% this quarter"
            icon={TrendingUp}
            trendDirection="up"
            color="purple"
          />
        </div>

        {/* Enhanced Filters */}
        <div className="rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-md">
              <SearchIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search customers by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-slate-50/50 py-2.5 pl-11 pr-4 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as StatusType | 'all')}
                  className="appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="verified">Verified</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
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
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Contact Info
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Portfolio Value
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Join Date
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60">
                {paginated.length ? (
                  paginated.map((customer, index) => (
                    <tr 
                      key={customer.id} 
                      className="group transition-colors hover:bg-slate-50/50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={customer.avatar}
                              alt={`${customer.firstName} ${customer.lastName}`}
                              className="h-10 w-10 rounded-full object-cover ring-2 ring-slate-200/60"
                            />
                            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-400" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">
                              {customer.firstName} {customer.lastName}
                            </p>
                            <p className="text-xs text-slate-500">{customer.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Mail className="h-3 w-3 text-slate-400" />
                            <p className="text-sm text-slate-700">{customer.email}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3 text-slate-400" />
                            <p className="text-xs text-slate-500">{customer.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={customer.status} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-emerald-600" />
                          <p className="font-semibold text-slate-900">
                            ${customer.investments.toLocaleString()}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3 text-slate-400" />
                            <p className="text-sm text-slate-700">
                              {new Date(customer.joinDate).toLocaleDateString()}
                            </p>
                          </div>
                          <p className="text-xs text-slate-500">
                            Last login: {new Date(customer.lastLogin).toLocaleDateString()}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                          <button 
                            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-blue-600"
                            onClick={() => navigate(`/customers/${customer.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-emerald-600">
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
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
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="space-y-3">
                        <Users className="mx-auto h-12 w-12 text-slate-300" />
                        <p className="text-slate-500">No customers found matching your criteria.</p>
                        <button className="text-blue-600 hover:text-blue-700">
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
              {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}
            </span>
            <span>of</span>
            <span className="font-semibold text-slate-900">{filtered.length}</span>
            <span>results</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`h-8 w-8 rounded-lg text-sm font-medium transition-all ${
                      currentPage === page
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage >= totalPages}
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
import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Copy, 
  Eye, 
  Send, 
  TrendingUp, 
  Users, 
  Minus,
  ArrowUp,
  ArrowDown,
  DollarSign,
  Search as SearchIcon,
  Filter,
  FileText,
  Mail,
  Phone,
  Building2,
  Wallet,
  PieChart,
  ArrowUpRight,
  Download,
  Plus,
  Loader2,
  RefreshCw,
  ChevronDown,
  MoreHorizontal,
  ArrowUpDown
} from "lucide-react";

// Animation variants
const pageVariants = {
  initial: { opacity: 0, y: 30, scale: 0.95 },
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
  initial: { opacity: 0, y: 20, scale: 0.9 },
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
  initial: { opacity: 0, x: -20 },
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

// Types
type StatusType = 'pending' | 'confirmed' | 'completed' | 'active' | 'inactive' | 'rejected' | 'withdrawn' | 'suspended' | 'in_progress' | 'on_hold';

interface StatusConfig {
  bg: string;
  text: string;
  border: string;
  dot: string;
  glow: string;
}

interface Investor {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  type: 'individual' | 'institutional' | 'accredited';
  status: StatusType;
  investmentAmount: number;
  ownership: number;
  tokens: number;
  joinDate: string;
  lastActivity: string;
  avatar?: string;
  company?: string;
  position?: string;
  notes?: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  url: string;
}

interface InvestorData {
  id: string;
  investor: Investor;
  investment: {
    amount: number;
    currency: string;
    date: string;
    type: string;
  };
  documents: Document[];
  status: StatusType;
  lastUpdated: string;
  notes?: string;
}

interface TableColumn {
  header: string;
  accessorKey: string;
  cell?: (info: { getValue: () => any; row: { original: any } }) => React.ReactNode;
}

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
}

interface InvestorTableProps {
  data: InvestorData[];
  columns: TableColumn[];
  pagination: PaginationProps;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

interface AssetOverviewProps {
  investmentStats: {
    totalRaised: number;
    numberOfInvestors: number;
    averageInvestment: number;
  };
}

const INVESTOR_TYPE = [
  { value: 'individual', label: 'Individual' },
  { value: 'institutional', label: 'Institutional' },
  { value: 'accredited', label: 'Accredited' }
] as const;

// Helper functions
const formatCompactNumber = (num: number | string): string => {
  const numValue = typeof num === 'string' ? parseFloat(num) : num;
  if (isNaN(numValue)) return '$0';
  if (numValue >= 1000000) return `$${(numValue / 1000000).toFixed(1)}M`;
  if (numValue >= 1000) return `$${(numValue / 1000).toFixed(1)}K`;
  return `$${numValue.toFixed(2)}`;
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const getStatusConfig = (status: StatusType): StatusConfig => {
  const configs: Record<StatusType, StatusConfig> = {
    active: { 
      bg: 'bg-green-50 dark:bg-green-900/20',
      text: 'text-green-700 dark:text-green-400',
      border: 'border-green-200 dark:border-green-800',
      dot: 'bg-green-500',
      glow: 'shadow-glow-green'
    },
    pending: { 
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      text: 'text-yellow-700 dark:text-yellow-400',
      border: 'border-yellow-200 dark:border-yellow-800',
      dot: 'bg-yellow-500',
      glow: 'shadow-glow-yellow'
    },
    completed: { 
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      text: 'text-blue-700 dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-800',
      dot: 'bg-blue-500',
      glow: 'shadow-glow-blue'
    },
    rejected: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      text: 'text-red-700 dark:text-red-400',
      border: 'border-red-200 dark:border-red-800',
      dot: 'bg-red-500',
      glow: 'shadow-glow-red'
    },
    confirmed: {
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      text: 'text-emerald-700 dark:text-emerald-400',
      border: 'border-emerald-200 dark:border-emerald-800',
      dot: 'bg-emerald-500',
      glow: 'shadow-glow-emerald'
    },
    inactive: {
      bg: 'bg-gray-100 dark:bg-gray-800',
      text: 'text-gray-700 dark:text-gray-300',
      border: 'border-gray-200 dark:border-gray-700',
      dot: 'bg-gray-500',
      glow: 'shadow-glow-gray'
    },
    withdrawn: {
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      text: 'text-amber-700 dark:text-amber-400',
      border: 'border-amber-200 dark:border-amber-800',
      dot: 'bg-amber-500',
      glow: 'shadow-glow-amber'
    },
    suspended: {
      bg: 'bg-rose-50 dark:bg-rose-900/20',
      text: 'text-rose-700 dark:text-rose-400',
      border: 'border-rose-200 dark:border-rose-800',
      dot: 'bg-rose-500',
      glow: 'shadow-glow-rose'
    },
    in_progress: {
      bg: 'bg-indigo-50 dark:bg-indigo-900/20',
      text: 'text-indigo-700 dark:text-indigo-400',
      border: 'border-indigo-200 dark:border-indigo-800',
      dot: 'bg-indigo-500',
      glow: 'shadow-glow-indigo'
    },
    on_hold: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      text: 'text-purple-700 dark:text-purple-400',
      border: 'border-purple-200 dark:border-purple-800',
      dot: 'bg-purple-500',
      glow: 'shadow-glow-purple'
    }
  };

  return configs[status] || {
    bg: 'bg-gray-50 dark:bg-gray-800',
    text: 'text-gray-700 dark:text-gray-300',
    border: 'border-gray-200 dark:border-gray-700',
    dot: 'bg-gray-400',
    glow: ''
  };
};

const StatusBadge = ({ status }: { status: StatusType }) => {
  const config = getStatusConfig(status);
  
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text} ${config.border} ${config.glow}`}>
      <div className={`w-2 h-2 rounded-full ${config.dot}`} />
      <span className="capitalize">{status}</span>
    </div>
  );
};

// StatCard Component
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  trend?: 'up' | 'down' | 'neutral';
  change?: string;
  color?: 'blue' | 'emerald' | 'amber' | 'purple' | 'indigo';
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  trend = 'neutral',
  change,
  color = 'blue'
}) => {
  const colorConfig = {
    blue: {
      bg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      icon: 'text-blue-100',
      text: 'text-white',
      changeBg: 'bg-blue-100/20',
      changeText: 'text-blue-100'
    },
    emerald: {
      bg: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      icon: 'text-emerald-100',
      text: 'text-white',
      changeBg: 'bg-emerald-100/20',
      changeText: 'text-emerald-100'
    },
    amber: {
      bg: 'bg-gradient-to-br from-amber-500 to-orange-600',
      icon: 'text-amber-100',
      text: 'text-white',
      changeBg: 'bg-amber-100/20',
      changeText: 'text-amber-100'
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-500 to-violet-600',
      icon: 'text-purple-100',
      text: 'text-white',
      changeBg: 'bg-purple-100/20',
      changeText: 'text-purple-100'
    },
    indigo: {
      bg: 'bg-gradient-to-br from-indigo-500 to-blue-600',
      icon: 'text-indigo-100',
      text: 'text-white',
      changeBg: 'bg-indigo-100/20',
      changeText: 'text-indigo-100'
    }
  }[color];

  return (
    <motion.div 
      variants={cardVariants}
      className="relative overflow-hidden rounded-xl group"
    >
      <div className={`p-6 ${colorConfig.bg} rounded-xl`}>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-white/80">{title}</p>
            <h3 className={`text-2xl font-bold ${colorConfig.text}`}>
              {typeof value === 'number' ? formatCompactNumber(value) : value}
            </h3>
          </div>
          <div className={`p-3 rounded-lg ${colorConfig.icon} ${colorConfig.changeBg}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
        
        {change && (
          <div className="mt-4">
            <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${colorConfig.changeText} ${colorConfig.changeBg}`}>
              {trend === 'up' ? (
                <ArrowUp className="w-3 h-3 mr-1" />
              ) : trend === 'down' ? (
                <ArrowDown className="w-3 h-3 mr-1" />
              ) : (
                <Minus className="w-3 h-3 mr-1" />
              )}
              {change}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Enhanced StatCard Component
interface EnhancedStatCardProps {
  title: string;
  value: number | string;
  prefix?: string;
  change?: number;
  icon: React.ComponentType<{ className?: string }>;
  trend?: 'up' | 'down';
}

const EnhancedStatCard: React.FC<EnhancedStatCardProps> = ({ title, value, prefix = "", change, icon: Icon, trend = "up" }) => (
  <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50/50">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">
        {title}
      </CardTitle>
      <div className={`p-2 rounded-full bg-gradient-to-br ${
        trend === 'up' ? 'from-emerald-100 to-emerald-200' : 'from-blue-100 to-blue-200'
      } group-hover:scale-110 transition-transform duration-300`}>
        <Icon className={`w-4 h-4 ${
          trend === 'up' ? 'text-emerald-600' : 'text-blue-600'
        }`} />
      </div>
    </CardHeader>
    <CardContent>
      <div className="flex items-baseline space-x-2">
        <div className="text-2xl font-bold text-gray-900">
          {prefix}{formatCompactNumber(value)}
        </div>
        {change && (
          <div className={`flex items-center text-sm ${
            change > 0 ? 'text-emerald-600' : 'text-red-600'
          }`}>
            <ArrowUpRight className="w-3 h-3 mr-1" />
            {Math.abs(change)}%
          </div>
        )}
      </div>
    </CardContent>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out opacity-0 group-hover:opacity-100" />
  </Card>
);

// Enhanced InvestorTable Component with Modern UI
const InvestorTable: React.FC<InvestorTableProps> = ({ 
  data, 
  columns,
  pagination, 
  onPageChange, 
  onPageSizeChange 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading state
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [pagination.page, pagination.total, selectedStatus]);

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter(investor => {
      const matchesSearch = 
        investor.investor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        investor.investor.email.toLowerCase().includes(searchTerm.toLowerCase());
      return selectedStatus === 'all' || investor.status === selectedStatus ? matchesSearch : false;
    });
  }, [data, searchTerm, selectedStatus]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Users className="w-5 h-5 text-blue-600" />
          Investor Portfolio
        </CardTitle>
        <CardDescription>
          Manage and track all investor relationships and documents
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-50/50">
                {columns.map((column, index) => (
                  <th key={index} className="text-left p-4 font-semibold text-gray-700 text-sm">
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.map((row, rowIndex) => (
                <tr 
                  key={rowIndex} 
                  className="border-b border-gray-50 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent transition-all duration-200 group"
                >
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="p-4">
                      {column.cell ? column.cell({ getValue: () => {
                        const keys = column.accessorKey.split('.');
                        return keys.reduce((obj: any, key) => {
                          if (obj && typeof obj === 'object' && key in obj) {
                            return obj[key];
                          }
                          return undefined;
                        }, row);
                      }, row: { original: row } }) : 'N/A'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Enhanced Pagination */}
        <div className="flex items-center justify-between p-6 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Show</span>
            <Select onValueChange={(value) => onPageSizeChange(Number(value))}>
              <SelectTrigger className="w-20 h-8">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span>entries</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onPageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="hover:bg-blue-50 hover:border-blue-200"
            >
              Previous
            </Button>
            {[...Array(pagination.totalPages)].map((_, i) => (
              <Button
                key={i}
                variant={pagination.page === i + 1 ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(i + 1)}
                className={pagination.page === i + 1 ? 
                  "bg-gradient-to-r from-blue-600 to-blue-700 text-white" : 
                  "hover:bg-blue-50 hover:border-blue-200"
                }
              >
                {i + 1}
              </Button>
            ))}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onPageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="hover:bg-blue-50 hover:border-blue-200"
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced InvestorDialog Component
const InvestorDialog: React.FC<{ isOpen: boolean; onClose: () => void; documents: Document[]; handleSend: (id: string) => void }> = ({ isOpen, onClose, documents, handleSend }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-auto shadow-2xl border-0">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Document Management
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              ×
            </Button>
          </div>
          <CardDescription className="text-blue-100">
            Send documents to investor
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {documents?.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{doc.name}</div>
                    <div className="text-sm text-gray-500">{doc.type} • {doc.size}</div>
                  </div>
                </div>
                <Button 
                  onClick={() => handleSend(doc.id)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Handle copy to clipboard
const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text);
  // You might want to add a toast notification here
};

// Define columns for the table
const columns: TableColumn[] = [
  {
    header: 'Investor',
    accessorKey: 'investor',
    cell: ({ getValue }) => {
      const investor = getValue() as Investor;
      return (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
            {investor.avatar ? (
              <img 
                src={investor.avatar} 
                alt={investor.fullName} 
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <span className="text-sm font-medium text-muted-foreground">
                {investor.fullName.split(' ').map(n => n[0]).join('')}
              </span>
            )}
          </div>
          <div>
            <div className="font-medium">{investor.fullName}</div>
            <div className="text-sm text-muted-foreground">{investor.email}</div>
          </div>
        </div>
      );
    }
  },
  {
    header: 'Type',
    accessorKey: 'investor.type',
    cell: ({ getValue }) => {
      const type = getValue() as string;
      return (
        <Badge variant="outline" className="capitalize">
          {type}
        </Badge>
      );
    }
  },
  {
    header: 'Investment',
    accessorKey: 'investment.amount',
    cell: ({ row }) => {
      const amount = row.original.investment.amount;
      const currency = row.original.investment.currency || 'USD';
      return (
        <div className="font-medium">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(amount)}
        </div>
      );
    }
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({ getValue }) => {
      const status = getValue() as StatusType;
      return <StatusBadge status={status} />;
    }
  },
  {
    header: 'Date',
    accessorKey: 'investment.date',
    cell: ({ getValue }) => formatDate(getValue() as string)
  }
];

// Main Enhanced Component
const Index: React.FC<{ assetOverview: AssetOverviewProps['investmentStats'] }> = ({ assetOverview }) => {
  // Mock data for demonstration
  const [investors, setInvestors] = useState<InvestorData[]>([
    {
      id: "1",
      investor: {
        _id: "INV001",
        fullName: "John Doe",
        email: "john@example.com",
        phone: "+1 (555) 987-6543",
        type: "individual",
        status: "active",
        investmentAmount: 250000,
        ownership: 15.5,
        tokens: 15500,
        joinDate: "2023-06-20T09:15:00Z",
        lastActivity: "2023-10-15T11:45:00Z"
      },
      investment: {
        amount: 250000,
        currency: "USD",
        date: "2023-01-15T00:00:00.000Z",
        type: "equity"
      },
      status: "active",
      lastUpdated: "2023-06-15T10:30:00.000Z",
      documents: [
        {
          id: "doc1",
          name: "Investment Agreement.pdf",
          type: "agreement",
          size: "2.4 MB",
          uploadDate: "2023-01-16T00:00:00.000Z",
          url: "/documents/agreement-001.pdf"
        }
      ]
    },
    {
      id: "3",
      investor: {
        _id: "INV003",
        fullName: "Jane Smith",
        email: "jane@example.com",
        phone: "+1555123456",
        type: "accredited",
        status: "completed",
        investmentAmount: 125000,
        ownership: 8.2,
        tokens: 8200,
        joinDate: "2023-03-05T00:00:00.000Z",
        lastActivity: "2023-06-05T09:15:00.000Z"
      },
      investment: {
        amount: 500000,
        currency: "USD",
        date: "2023-02-10T00:00:00.000Z",
        type: "debt"
      },
      status: "pending",
      lastUpdated: "2023-06-10T14:20:00.000Z",
      documents: [
        {
          id: "doc2",
          name: "Term Sheet.pdf",
          type: "terms",
          size: "1.2 MB",
          uploadDate: "2023-02-09T00:00:00.000Z",
          url: "/documents/terms-001.pdf"
        }
      ]
    },
    {
      id: "2",
      investor: {
        _id: "INV002",
        fullName: "Sarah Johnson",
        email: "sarah@institutional.com",
        phone: "+1 (555) 123-4567",
        type: "institutional",
        status: "active",
        investmentAmount: 500000,
        ownership: 25.0,
        tokens: 2500,
        joinDate: "2023-05-15T10:00:00Z",
        lastActivity: "2023-10-10T14:30:00Z",
        company: "Institutional Investments LLC",
        position: "Investment Manager"
      },
      investment: {
        amount: 500000,
        currency: "USD",
        date: "2023-10-10T14:30:00Z",
        type: "equity"
      },
      documents: [
        {
          id: '3',
          name: 'Institutional Agreement.pdf',
          type: 'PDF',
          size: '3.2 MB',
          uploadDate: '2023-10-10T14:30:00Z',
          url: '/documents/institutional-agreement-001.pdf'
        }
      ],
      lastUpdated: '2023-10-10T14:30:00Z',
      status: "completed"
    }
  ]);

  const [pagination] = useState<PaginationProps>({
    page: 1,
    pageSize: 10,
    totalPages: 3,
    total: 25
  });

  const [documents] = useState<Document[]>([
    { 
      id: '1', 
      name: 'Investment Agreement.pdf', 
      type: 'PDF', 
      size: '2.4 MB',
      uploadDate: '2023-01-15T00:00:00Z',
      url: '/documents/agreement-001.pdf'
    },
    { 
      id: '2', 
      name: 'Terms & Conditions.pdf', 
      type: 'PDF', 
      size: '1.8 MB',
      uploadDate: '2023-01-15T00:00:00Z',
      url: '/documents/terms-001.pdf'
    },
  ]);

  const [type, setType] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [investor, setInvestor] = useState<InvestorData | null>(null);

  const handleInvestorClick = (investor: InvestorData): void => {
    setInvestor(investor);
  };

  const handleDialogClose = (): void => {
    setInvestor(null);
  };

  const handleOnSend = (id: string): void => {
    console.log('Sending document:', id);
  };

  const onPageChange = (page: number): void => {
    console.log('Page change:', page);
  };

  const onPageSizeChange = (pageSize: number): void => {
    console.log('Page size change:', pageSize);
  };

  const columns: TableColumn[] = [
    {
      header: "Investor ID",
      accessorKey: "investor._id",
      cell: (info) => {
        const id = info.getValue();
        return (
          <div className="flex items-center gap-3 group">
            <div className="p-1.5 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition-colors cursor-pointer"
                 onClick={() => handleCopy(id)}>
              <Copy className="w-3 h-3 text-gray-500 group-hover:text-blue-600" />
            </div>
            <div className="font-mono text-sm bg-gray-50 px-2 py-1 rounded border">
              {id}
            </div>
          </div>
        );
      },
    },
    {
      header: "Investor Details",
      accessorKey: "investor",
      cell: ({ getValue }) => {
        const investor = getValue();
        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              {investor?.fullName?.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{investor?.fullName}</div>
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {investor?.email}
              </div>
              <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                <Building2 className="w-3 h-3" />
                {investor?.type}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      header: "Investment",
      accessorKey: "totalOrderValue",
      cell: (info) => {
        const value = info.getValue();
        return (
          <div className="text-right">
            <div className="font-semibold text-gray-900">
              ${formatCompactNumber(value)}
            </div>
            <div className="text-xs text-gray-500">Total invested</div>
          </div>
        );
      },
    },
    {
      header: "Tokens",
      accessorKey: "tokensBooked",
      cell: (info) => {
        const value = info.getValue();
        return (
          <div className="text-center">
            <div className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-full text-sm font-medium">
              <Wallet className="w-3 h-3" />
              {formatCompactNumber(value)}
            </div>
          </div>
        );
      },
    },
    {
      header: "Ownership",
      accessorKey: "ownership",
      cell: (info) => {
        const value = info.getValue();
        return (
          <div className="text-center">
            <Badge className="bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 hover:from-emerald-200 hover:to-emerald-300 font-semibold border-0">
              <PieChart className="w-3 h-3 mr-1" />
              {value}%
            </Badge>
          </div>
        );
      },
    },
    {
      header: "Actions",
      accessorKey: "documents",
      cell: (info) => {
        const documents = info.row.original;
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => handleInvestorClick(documents)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Send className="w-3 h-3 mr-1" />
              Send
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="hover:bg-gray-50 border-gray-200"
            >
              <Eye className="w-3 h-3" />
            </Button>
          </div>
        );
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (info) => {
        const status = info.getValue() as StatusType;
        const statusConfig: Record<StatusType, { bg: string; text: string; border: string }> = {
          pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
          confirmed: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
          completed: { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200' },
          active: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
          inactive: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' },
          rejected: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
          withdrawn: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' },
          suspended: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-200' },
          in_progress: { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-200' },
          on_hold: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' }
        };
        const config = statusConfig[status] || statusConfig.pending;
        
        return (
          <Badge className={`${config.bg} ${config.text} ${config.border} border hover:opacity-80 font-medium capitalize`}>
            {status}
          </Badge>
        );
      },
    },
  ];

  // Mock asset overview data
  const mockAssetOverview = {
    investmentStats: {
      totalRaised: 2500000,
      numberOfInvestors: 48,
      averageInvestment: 52083.33
    }
  };

  const stats = assetOverview || mockAssetOverview.investmentStats;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50/50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Investment Dashboard
          </h1>
          <p className="text-gray-600">Monitor and manage your investor relationships</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title="Total Investors" 
            value={stats.numberOfInvestors.toString()} 
            change={12}
            icon={Users}
            trend="up"
          />
          <StatCard 
            title="Total Revenue" 
            value={stats.totalRaised.toString()} 
            prefix="$" 
            change={8.5}
            icon={TrendingUp}
            trend="up"
          />
          <StatCard
            title="Average Investment"
            value={stats.averageInvestment?.toFixed(0) || '0'}
            prefix="$"
            change={-2.1}
            icon={DollarSign}
            trend="down"
          />
        </div>

        {/* Search and Filter Bar */}
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Search investors by name, email, or ID..."
                  className="pl-10 border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select onValueChange={setType} defaultValue={type}>
                  <SelectTrigger className="w-[180px] border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100">
                    <Filter className="w-4 h-4 mr-2 text-gray-400" />
                    <SelectValue placeholder="Filter by Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {INVESTOR_TYPE.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  className="border-gray-200 hover:bg-blue-50 hover:border-blue-300"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Table */}
        <InvestorTable
          columns={columns}
          data={investors}
          pagination={pagination}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />

        {/* Enhanced Dialog */}
        <InvestorDialog
          isOpen={Boolean(investor)}
          onClose={handleDialogClose}
          documents={documents}
          handleSend={handleOnSend}
        />
      </div>
    </div>
  );
};

export default Index;
import { useState, useEffect, useMemo } from 'react';
import { Eye, Pencil, Trash2, Trash } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { mockCompanies } from '@/data/mockCompanies';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import Loading from '@/components/ui/Loading';
import toast from 'react-hot-toast';
import Pagination from '@/layout/Pagination';
import api from '@/lib/httpClient';

import { Search as SearchIcon, Plus, Database, Filter, ChevronDown, RefreshCw, Loader2 } from 'lucide-react';
import {  useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import TableComponent from '@/components/TableComponent';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCompanies } from '@/store/features/companySlice';
import CompanyStatus from '@/helpers/CompanyStatus';
import { convertDateAndTimeToLocal } from '@/helpers/global';
import { useDebounce } from '@/hooks/useDebounce';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Animation variants
const pageVariants = {
  initial: { 
    opacity: 0, 
    y: 20,
    scale: 0.98
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.3
    }
  }
};

const itemVariants = {
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
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const headerVariants = {
  initial: { 
    opacity: 0, 
    x: -30 
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const searchVariants = {
  initial: { 
    opacity: 0, 
    scale: 0.8,
    x: 20
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.2
    }
  }
};

const loadingSpinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filters, setFilters] = useState({
    status: [] as string[],
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const controls = useAnimation();

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setPage(1); // Reset to first page when searching
    
    // Update URL with search term
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };
  
  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger search when form is submitted (if needed)
  };

  // Use mock data instead of Redux state
  const [companies, setCompanies] = useState(mockCompanies);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize state from URL params
  useEffect(() => {
    const pageParam = searchParams.get('page');
    const limitParam = searchParams.get('limit');
    const searchParam = searchParams.get('search');
    
    if (pageParam) setPage(parseInt(pageParam));
    if (limitParam) setLimit(parseInt(limitParam));
    if (searchParam) setSearchTerm(searchParam);
  }, [searchParams]);

  // Filter and paginate data
  const filteredData = useMemo(() => {
    let result = [...companies];
    
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(company => 
        company.name.toLowerCase().includes(searchLower) ||
        company.registrationNumber.toLowerCase().includes(searchLower) ||
        company.industry.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply status filter
    if (filters.status.length > 0) {
      result = result.filter(company => filters.status.includes(company.status));
    }
    
    // Apply pagination
    const startIndex = (page - 1) * limit;
    return result.slice(startIndex, startIndex + limit);
  }, [companies, searchTerm, filters, page, limit]);

  useEffect(() => {
    controls.start("animate");
  }, [controls]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    setCompanies([...mockCompanies]); // Refresh with original data
    setIsRefreshing(false);
  };

  const handleFilterChange = (type: 'status', value: string) => {
    const newFilters = { ...filters };
    const index = newFilters[type].indexOf(value);
    
    if (index === -1) {
      newFilters[type].push(value);
    } else {
      newFilters[type].splice(index, 1);
    }
    
    setFilters(newFilters);
    // Apply filters
  };

  const clearAllFilters = () => {
    setFilters({ status: [] });
    // Reset filters
  };

  const totalCompanies = companies.length;
  const activeCompanies = companies.filter(c => c.status === 'active').length;

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: newPage.toString() });
  };

  // Handle page size change
  const handlePageSizeChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
    setSearchParams({ 
      ...Object.fromEntries(searchParams.entries()), 
      limit: newLimit.toString(), 
      page: '1' 
    });
  };

  // Calculate pagination values
  const totalItems = companies.length;
  const totalPages = Math.ceil(totalItems / limit) || 1;
  const hasMore = page < totalPages;
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

  
  const paginationProps = {
    onPageChange: handlePageChange,
    onPageSizeChange: handlePageSizeChange,
    currentPage: page,
    pageSize: limit,
    totalItems,
    totalPages,
    hasMore,
    hasPreviousPage,
    hasNextPage
  };

  const onEdit = (id: string) => {
    navigate(`/company/edit/${id}`);
  };

  const onView = (id: string) => {
    navigate(`/company/${id}`);
  };

  const onDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      setCompanies(prev => prev.filter(company => company.id !== id));
      toast.success('Company deleted successfully');
    }
  };

  const columns = [
    {
      header: 'Company ID',
      accessorKey: 'registrationNumber',
      cell: ({ row }: { row: any }) => (
        <span className="text-sm font-medium text-gray-900">{row.original.registrationNumber}</span>
      ),
    },
    {
      header: 'Company',
      accessorKey: 'name',
      cell: ({ row }: { row: any }) => (
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
            <Database className="h-5 w-5 text-blue-600" />
          </div>
          <span className="font-medium text-gray-900">{row.original.name}</span>
        </div>
      ),
    },
    {
      header: 'Created On',
      accessorKey: 'created_at',
      cell: ({ row }: { row: any }) => (
        <div className="flex flex-col">
          <span className="text-sm text-gray-900">
            {new Date(row.original.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(row.original.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      ),
    },
    {
      header: 'Total Property',
      accessorKey: 'total_property',
      cell: ({ row }: { row: any }) => (
        <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
          {row.original.total_property || 0}
        </span>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }: { row: any }) => (
        <CompanyStatus status={row.original.status} companyId={row.original.id} />
      ),
    },
    {
      header: 'Actions',
      accessorKey: 'actions',
      cell: ({ row }: { row: any }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(row.original.id)}
            className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
            title="Edit company"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(row.original.id)}
            className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
            title="Delete company"
          >
            <Trash className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <motion.h1
            className="text-3xl font-bold text-gray-900 mb-2"
            variants={headerVariants}
          >
            Companies
          </motion.h1>
          <motion.p className="text-gray-600" variants={headerVariants}>
            Manage your companies and their details
          </motion.p>
        </div>

        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          variants={itemVariants}
        >
          <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  className="pl-10 w-full"
                  placeholder="Search companies..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </form>

            <div className="flex items-center gap-3">
              <DropdownMenu onOpenChange={setIsFilterOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                    {filters.status.length > 0 && (
                      <span className="h-5 w-5 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full text-xs">
                        {filters.status.length}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {['active', 'inactive', 'pending', 'suspended'].map((status) => (
                    <DropdownMenuCheckboxItem
                      key={status}
                      checked={filters.status.includes(status)}
                      onCheckedChange={() =>
                        handleFilterChange('status', status)
                      }
                    >
                      <span className="capitalize">{status}</span>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="outline"
                size="icon"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                {isRefreshing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>

              <Button onClick={() => navigate('/add-spv')}>
                <Plus className="h-4 w-4 mr-2" />
                Add Company
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Table Section */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden"
          variants={itemVariants}
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                className="flex items-center justify-center p-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div className="flex items-center gap-3 text-gray-600">
                  <motion.span 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 className="w-6 h-6" />
                  </motion.span>
                  <span className="text-lg font-medium">Loading companies...</span>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key={location.key}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={itemVariants}
                className="overflow-hidden"
              >
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {columns.map((column) => (
                          <TableHead key={column.accessorKey}>
                            {column.header}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.length > 0 ? (
                        filteredData.map((company) => (
                          <TableRow key={company.id}>
                            {columns.map((column) => (
                              <TableCell key={`${company.id}-${column.accessorKey}`}>
                                {typeof column.cell === 'function' 
                                  ? column.cell({ 
                                      row: { original: company } 
                                    })
                                  : company[column.accessorKey as keyof typeof company]}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={columns.length} className="h-24 text-center">
                            <div className="flex flex-col items-center justify-center py-12">
                              <Database className="h-12 w-12 text-gray-400 mb-4" />
                              <h3 className="text-lg font-medium text-gray-900 mb-1">
                                No companies found
                              </h3>
                              <p className="text-sm text-gray-500 mb-4">
                                {companies.length === 0
                                  ? 'Get started by adding a new company.'
                                  : 'No results match your search criteria.'}
                              </p>
                              <Button onClick={() => navigate('/company/add')}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Company
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Empty State - Only show if not loading and no companies */}
        {!isLoading && companies.length === 0 && (
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 text-center shadow-xl border border-white/50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Database className="w-8 h-8 text-gray-400" />
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Companies Found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm ? "No companies match your search criteria." : "Get started by adding your first company."}
              </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => navigate('/add-spv')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add First Company
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
export default Index;
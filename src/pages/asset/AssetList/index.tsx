import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import TableComponent from "@/components/TableComponent";
import Pagination from "@/layout/Pagination";
import queryString from "query-string";
import { useAssetApi } from "@/hooks/asset/useAssetApi";
import AddAssetDialog from "./AddAssetDialog";
import { mockAssets } from "@/data/mockAssets";
import UpdateAssetStatusDialog from "./UpdateAssetStatusDialog";
import getColumns from "./columns";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { useMetaMask } from "@/providers/MetaMaskProvider";
import { 
  Search, 
  Plus, 
  Database, 
  Loader2, 
  TrendingUp,
  Filter,
  RefreshCw,
  ChevronDown,
  X
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
      ease: "cubicBezier(0.22, 1, 0.36, 1)",
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
      ease: "cubicBezier(0.22, 1, 0.36, 1)"
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
      ease: "cubicBezier(0.22, 1, 0.36, 1)"
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
      ease: "cubicBezier(0.22, 1, 0.36, 1)",
      delay: 0.2
    }
  }
};

const buttonVariants = {
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
      ease: "cubicBezier(0.22, 1, 0.36, 1)",
      delay: 0.3
    }
  },
  hover: { 
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  },
  tap: { 
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
};

const tableVariants = {
  initial: { 
    opacity: 0, 
    y: 40
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.7,
      ease: "cubicBezier(0.22, 1, 0.36, 1)",
      delay: 0.4
    }
  }
};

const statsVariants = {
  initial: { 
    opacity: 0, 
    scale: 0.8,
    y: 10
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "cubicBezier(0.22, 1, 0.36, 1)",
      delay: 0.1
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

const Index: React.FC = () => {
  const [asset, setAsset] = useState<any>(null);
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filters, setFilters] = useState({
    status: [] as string[],
    stage: [] as string[],
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const searchTerm = useDebounce(search, 500);
  const controls = useAnimation();
  
  const {
    assetList,
    pagination,
    getAssetList,
    updateAssetStatus,
    statusUpdate,
    setStatusUpdate,
  } = useAssetApi();
  
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const page = Number(queryParams.page) || 1;
  const limit = Number(queryParams.limit) || 10;
  const columns = getColumns(setAsset);

  const [isToggleSwitchClicked, setIsToggleSwitchClicked] = useState(false);
  const { connect, isConnected, account } = useMetaMask();

  const onPageChange = (page: number) => {
    setIsLoading(true);
    navigate(`?page=${page}&limit=${limit}`);
    setTimeout(() => setIsLoading(false), 300);
  };

  const onPageSizeChange = (pageSize: number) => {
    setIsLoading(true);
    navigate(`?page=${page}&limit=${pageSize}`);
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await getAssetList({ 
      page, 
      limit, 
      search: searchTerm,
      status: filters.status.join(','),
      stage: filters.stage.join(',')
    });
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const handleFilterChange = async (type: 'status' | 'stage', value: string) => {
    const newFilters = { ...filters };
    const index = newFilters[type].indexOf(value);
    
    if (index === -1) {
      newFilters[type].push(value);
    } else {
      newFilters[type].splice(index, 1);
    }
    
    setFilters(newFilters);
    
    setIsLoading(true);
    await getAssetList({ 
      page: 1, // Reset to first page when filters change
      limit, 
      search: searchTerm,
      status: newFilters.status.join(','),
      stage: newFilters.stage.join(',')
    });
    setIsLoading(false);
  };

  const clearAllFilters = async () => {
    const newFilters = { status: [] as string[], stage: [] as string[] };
    setFilters(newFilters);
    
    setIsLoading(true);
    await getAssetList({ 
      page: 1, // Reset to first page when clearing filters
      limit, 
      search: searchTerm
    });
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      await getAssetList({ 
        page, 
        limit, 
        search: searchTerm,
        status: filters.status.join(','),
        stage: filters.stage.join(',')
      });
      setIsLoading(false);
    };
    fetchData();
  }, [page, limit, searchTerm, filters]);

  useEffect(() => {
    controls.start("animate");
  }, [controls]);

  const updateStatus = async () => {
    if (asset) {
      if (!isConnected) {
        console.log("Not connected wallet address (if block):", account);
        try {
          const metamaskData:
            | { metamaskAccount: string; chainId: number }
            | undefined = await connect();

          if (metamaskData?.metamaskAccount) {
            await updateAssetStatus(
              asset._id,
              asset.status === "active" ? "inactive" : "active",
              metamaskData.metamaskAccount
            );
          }
        } catch (error) {
          console.error("Failed to connect wallet:", error);
          return;
        }
      } else {
        console.log("Connected wallet address (else block):", account);
        if (account) {
          await updateAssetStatus(
            asset._id,
            asset.status === "active" ? "inactive" : "active",
            account
          );
        }
      }
      setAsset(null);
      setStatusUpdate("idle");
    }
  };

  const totalAssets = pagination?.total || 0;
  const activeAssets = assetList?.filter(asset => asset.status === 'active').length || 0;

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <motion.div
          className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6"
          variants={headerVariants}
        >
          <div className="space-y-2">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <motion.div
                className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Database className="w-6 h-6 text-white" />
              </motion.div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Assets Management
              </h1>
            </motion.div>
            
            <motion.p
              className="text-gray-600 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Manage and monitor your digital assets with ease
            </motion.p>
          </div>

          {/* Stats Cards */}
          <motion.div
            className="flex gap-4"
            variants={statsVariants}
          >
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Assets</p>
                  <motion.p
                    className="text-2xl font-bold text-gray-800"
                    key={totalAssets}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {totalAssets}
                  </motion.p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-sm text-gray-600">Active</p>
                  <motion.p
                    className="text-2xl font-bold text-green-600"
                    key={activeAssets}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeAssets}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Controls Section */}
        <motion.div
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50"
          variants={itemVariants}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <motion.div
              className="flex items-center gap-4 flex-1"
              variants={searchVariants}
            >
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search assets..."
                    className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <DropdownMenu onOpenChange={setIsFilterOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2 border-gray-200 bg-white hover:bg-gray-50"
                    >
                      <Filter className="h-4 w-4" />
                      <span>Filters</span>
                      {(filters.status.length > 0 || filters.stage.length > 0) && (
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                          {filters.status.length + filters.stage.length}
                        </span>
                      )}
                      <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 p-2" align="end">
                    <div className="flex items-center justify-between px-2 py-1.5">
                      <span className="text-sm font-medium">Filters</span>
                      {(filters.status.length > 0 || filters.stage.length > 0) && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            clearAllFilters();
                          }}
                          className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          Clear all
                        </button>
                      )}
                    </div>
                    
                    <DropdownMenuSeparator className="my-1" />
                    
                    <DropdownMenuLabel className="px-1 py-1 text-xs font-medium text-gray-500">Status</DropdownMenuLabel>
                    {['Active', 'Inactive', 'Pending'].map((status) => (
                      <DropdownMenuCheckboxItem
                        key={status}
                        checked={filters.status.includes(status)}
                        onCheckedChange={() => handleFilterChange('status', status)}
                        className="text-sm"
                      >
                        {status}
                      </DropdownMenuCheckboxItem>
                    ))}
                    
                    <DropdownMenuSeparator className="my-1" />
                    
                    <DropdownMenuLabel className="px-1 py-1 text-xs font-medium text-gray-500">Stage</DropdownMenuLabel>
                    {['Fully Rented', 'Under Construction', 'Pre-Construction', 'Stabilized', 'Value-Add'].map((stage) => (
                      <DropdownMenuCheckboxItem
                        key={stage}
                        checked={filters.stage.includes(stage)}
                        onCheckedChange={() => handleFilterChange('stage', stage)}
                        className="text-sm"
                      >
                        {stage}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <motion.div
                  variants={loadingSpinnerVariants}
                  animate={isRefreshing ? "animate" : ""}
                >
                  <RefreshCw className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </motion.div>

            <motion.div
              className="flex items-center gap-3"
              variants={buttonVariants}
            >
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="h-12 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Asset
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Dialogs with AnimatePresence */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <AddAssetDialog open={open} setOpen={setOpen} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {asset && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <UpdateAssetStatusDialog
                asset={asset}
                setAsset={setAsset}
                updateStatus={updateStatus}
                status={statusUpdate}
                setStatusUpdate={setStatusUpdate}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Table Section with Loading State */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden"
          variants={tableVariants}
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
                <motion.div
                  className="flex items-center gap-3 text-gray-600"
                >
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                    <Loader2 className="w-6 h-6" />
                  </motion.span>
                  <span className="text-lg font-medium">Loading assets...</span>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6 p-6"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <TableComponent columns={columns} data={assetList} model="asset" />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="border-t border-gray-200 pt-6"
                >
                  <Pagination
                    {...pagination}
                    onPageChange={onPageChange}
                    onPageSizeChange={onPageSizeChange}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {!isLoading && assetList?.length === 0 && (
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
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Assets Found</h3>
            <p className="text-gray-500 mb-6">
              {search ? "No assets match your search criteria." : "Get started by adding your first asset."}
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => setOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add First Asset
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Index;
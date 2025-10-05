

import { useNavigate, useParams } from 'react-router-dom';
import { lazy, Suspense, useCallback, useMemo, JSX, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomTabs from '@/components/ui/custom-tab';
import { ASSET_STEPS_TABS } from '@/constants/asset';
import Loading from '@/components/ui/Loading';
import { Building2, TrendingUp, FileText, Users, Sparkles, CheckCircle2, Clock, AlertCircle, Info, ChevronRight, Target } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

// Lazy-loaded components
const AssetType = lazy(() => import('./AssetType'));
const InvestmentDetails = lazy(() => import('./InvestmentDetails'));
const EscrowLegal = lazy(() => import('./EscrowLegal'));
const TenantInformation = lazy(() => import('./TenantInformation'));

// Enhanced Animation variants - Simplified for TypeScript compatibility
const containerVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.15
    }
  }
};

const headerVariants = {
  initial: { opacity: 0, y: -30, scale: 0.9 },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.7
    }
  }
};

const tabContentVariants = {
  initial: { opacity: 0, x: 30, scale: 0.95 },
  animate: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: { 
      duration: 0.5
    }
  },
  exit: { 
    opacity: 0, 
    x: -30,
    scale: 0.95,
    transition: { 
      duration: 0.3
    }
  }
};

const progressVariants = {
  initial: { scaleX: 0, opacity: 0 },
  animate: { 
    scaleX: 1, 
    opacity: 1,
    transition: { 
      duration: 1
    }
  }
};

const statusVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: { 
    scale: 1, 
    rotate: 0,
    transition: { 
      duration: 0.5
    }
  }
};

// Enhanced Loading Component with Skeleton
const EnhancedLoading = () => (
  <motion.div
    className="space-y-6 p-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className="flex items-center gap-4">
      <motion.div
        className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Building2 className="w-6 h-6 text-blue-600" />
      </motion.div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
        <div className="h-3 bg-gray-100 rounded w-72 animate-pulse"></div>
      </div>
    </div>
    
    {/* Skeleton Content */}
    <div className="space-y-4">
      <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-32 bg-gray-100 rounded-xl animate-pulse"></div>
        <div className="h-32 bg-gray-100 rounded-xl animate-pulse"></div>
      </div>
      <div className="h-24 bg-gray-100 rounded-xl animate-pulse"></div>
    </div>
  </motion.div>
);

// Tab Status Component
const TabStatus = ({ tabId, asset }: { tabId: string; asset: any }) => {
  const getTabStatus = (id: string) => {
    // Basic validation logic - can be enhanced based on actual requirements
    switch (id) {
      case 'asset-type':
        return asset?.name && asset?.category ? 'complete' : 'incomplete';
      case 'investment-details':
        return asset?.totalNumberOfSfts && asset?.pricePerSft ? 'complete' : 'incomplete';
      case 'rent-information':
        return asset?.tenants?.length > 0 ? 'complete' : 'incomplete';
      case 'escrow-legal':
        return asset?.legalAdvisor ? 'complete' : 'incomplete';
      default:
        return 'incomplete';
    }
  };

  const status = getTabStatus(tabId);
  
  return (
    <motion.div
      variants={statusVariants}
      initial="initial"
      animate="animate"
      className="ml-2"
    >
      {status === 'complete' ? (
        <CheckCircle2 className="w-4 h-4 text-green-500" />
      ) : (
        <Clock className="w-4 h-4 text-amber-500" />
      )}
    </motion.div>
  );
};

// Progress Indicator Component
const ProgressIndicator = ({ tabs, currentTab }: { tabs: any[]; currentTab: string }) => {
  const currentIndex = tabs.findIndex(tab => tab.id === currentTab);
  const progress = ((currentIndex + 1) / tabs.length) * 100;
  
  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">Section Progress</span>
        </div>
        <span className="text-sm text-blue-600 font-semibold">{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.8 }}
          style={{ originX: 0 }}
        />
      </div>
    </motion.div>
  );
};

interface Props {
  tab: string;
  step: string;
  asset: any;
}


const AssetInformation = ({ tab, step, asset }: Props) => {
  const { id = null } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Get form context if available for validation
  let formContext;
  try {
    formContext = useFormContext();
  } catch {
    // Form context not available
  }

  // Get current tab info for progress and fallback
  const currentTabInfo = useMemo(() => {
    const stepTabs = ASSET_STEPS_TABS.find((ele) => ele.id === step)?.tabs || [];
    return stepTabs;
  }, [step]);

  // Ensure we have a valid tab - fallback to first tab if none provided
  const currentTab = useMemo(() => {
    if (!tab && currentTabInfo.length > 0) {
      return currentTabInfo[0].id;
    }
    // Validate that the current tab exists in the step
    const tabExists = currentTabInfo.some(tabItem => tabItem.id === tab);
    if (!tabExists && currentTabInfo.length > 0) {
      return currentTabInfo[0].id;
    }
    return tab;
  }, [tab, currentTabInfo]);

  // Auto-redirect to correct tab if needed
  useEffect(() => {
    if (currentTab !== tab && currentTab) {
      const basePath = id ? `/edit-asset/${id}` : '/add-asset';
      navigate(`${basePath}?step=${step}&tab=${currentTab}`, { replace: true });
    }
  }, [currentTab, tab, id, step, navigate]);

  // Enhanced tab change handler with transition state
  const handleTabChange = useCallback(
    (tabId: string) => {
      setIsTransitioning(true);
      setTimeout(() => {
        const basePath = id ? `/edit-asset/${id}` : '/add-asset';
        navigate(`${basePath}?step=${step}&tab=${tabId}`, { replace: false });
        setIsTransitioning(false);
      }, 150);
    },
    [id, navigate, step]
  );
  // Enhanced component getter with better loading states and error handling
  const getComponentByTabId = (tabId: string): JSX.Element => {
    if (isTransitioning) {
      return <EnhancedLoading />;
    }
    
    // If no tabId provided, show the first available tab
    if (!tabId && currentTabInfo.length > 0) {
      tabId = currentTabInfo[0].id;
    }
    
    switch (tabId) {
      case 'asset-type':
        return (
          <Suspense fallback={<EnhancedLoading />}>
            <motion.div
              variants={tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <AssetType asset={asset} />
            </motion.div>
          </Suspense>
        );
      case 'investment-details':
        return (
          <Suspense fallback={<EnhancedLoading />}>
            <motion.div
              variants={tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <InvestmentDetails asset={asset} />
            </motion.div>
          </Suspense>
        );
      case 'rent-information':
        return (
          <Suspense fallback={<EnhancedLoading />}>
            <motion.div
              variants={tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <TenantInformation asset={asset} />
            </motion.div>
          </Suspense>
        );
      case 'escrow-legal':
        return (
          <Suspense fallback={<EnhancedLoading />}>
            <motion.div
              variants={tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <EscrowLegal asset={asset} />
            </motion.div>
          </Suspense>
        );
      default:
        return (
          <motion.div 
            className="flex items-center justify-center p-16 text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-center space-y-4">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <div>
                <p className="text-lg font-medium text-gray-700 mb-2">Tab Content Not Available</p>
                <p className="text-sm text-gray-500 mb-4">The requested tab "{tabId}" could not be loaded.</p>
                {currentTabInfo.length > 0 && (
                  <button
                    onClick={() => handleTabChange(currentTabInfo[0].id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Go to {currentTabInfo[0].title}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        );
    }
  };

  // Enhanced tabs computation with status indicators and better error handling
  const tabs = useMemo(() => {
    const stepTabs = ASSET_STEPS_TABS.find((ele) => ele.id === step)?.tabs || [];
    
    if (stepTabs.length === 0) {
      return [];
    }
    
    return stepTabs.map((tabItem) => ({
      id: tabItem.id,
      title: tabItem.title,
      component: getComponentByTabId(tabItem.id) || <div />,
      statusIcon: <TabStatus tabId={tabItem.id} asset={asset} />,
    }));
  }, [step, asset, isTransitioning, currentTabInfo]);

  const disabledTabs = useMemo(() => {
    if (id) {
      return [];
    } else {
      return tabs.slice(1, tabs.length).map((tab) => tab.id);
    }
  }, [tabs, id]);

  // Early return if no tabs available
  if (tabs.length === 0) {
    return (
      <motion.div
        className="min-h-[600px] bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center space-y-4">
          <AlertCircle className="w-16 h-16 mx-auto text-gray-400" />
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No Tabs Available</h2>
            <p className="text-gray-500">No tabs are configured for the "{step}" step.</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-[600px] relative overflow-hidden"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <Suspense fallback={<EnhancedLoading />}>
        <div className='max-w-7xl mx-auto p-4 md:p-6 lg:p-8'>
          {/* Enhanced Header with better typography and spacing */}
          <motion.div
            className="mb-8"
            variants={headerVariants}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <motion.div
                className="p-3 md:p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Building2 className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </motion.div>
              <div className="flex-1">
                <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2'>Assethii Information</h1>
                <p className="text-gray-600 flex items-center gap-2 text-sm md:text-base">
                  <Sparkles className="w-4 h-4" />
                  Configure the fundamental details and investment structure of your asset
                </p>
              </div>
            </div>
            
            {/* Progress Indicator */}
            <ProgressIndicator tabs={currentTabInfo} currentTab={currentTab} />
          </motion.div>

          {/* Enhanced Information Banner */}
          

          {/* Enhanced Tabs Container with better responsive design */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -2, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="p-4 md:p-6 lg:p-8">
              {/* Enhanced Tab Header with Status Indicators */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 border-b border-gray-200">
                  {tabs.map((tabItem) => {
                    const isActive = tabItem.id === currentTab;
                    const isDisabled = disabledTabs.includes(tabItem.id);
                    
                    return (
                      <motion.button
                        key={tabItem.id}
                        onClick={() => !isDisabled && handleTabChange(tabItem.id)}
                        disabled={isDisabled}
                        className={`px-4 py-3 text-sm font-medium rounded-t-lg border-b-2 transition-all duration-200 ${
                          isActive 
                            ? 'border-blue-500 text-blue-600 bg-blue-50' 
                            : isDisabled
                            ? 'border-transparent text-gray-400 cursor-not-allowed'
                            : 'border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-300'
                        }`}
                        whileHover={!isDisabled ? { scale: 1.02 } : {}}
                        whileTap={!isDisabled ? { scale: 0.98 } : {}}
                      >
                        <div className="flex items-center gap-2">
                          <span>{tabItem.title}</span>
                          {tabItem.statusIcon}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {tabs.find(t => t.id === currentTab)?.component || (
                    <motion.div 
                      className="flex items-center justify-center p-16 text-gray-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="text-center space-y-4">
                        <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                        <div>
                          <p className="text-lg font-medium text-gray-700 mb-2">Loading Content...</p>
                          <p className="text-sm text-gray-500">Please wait while we load the tab content.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Enhanced Quick Navigation */}
          <motion.div
            className="mt-6 flex flex-wrap gap-2 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {currentTabInfo.map((tabItem, index) => {
              const isActive = tabItem.id === currentTab;
              const isDisabled = disabledTabs.includes(tabItem.id);
              
              return (
                <motion.button
                  key={tabItem.id}
                  onClick={() => !isDisabled && handleTabChange(tabItem.id)}
                  disabled={isDisabled}
                  className={`px-3 py-1.5 text-xs rounded-full transition-all duration-200 ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : isDisabled
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
                  }`}
                  whileHover={!isDisabled ? { scale: 1.05 } : {}}
                  whileTap={!isDisabled ? { scale: 0.95 } : {}}
                >
                  <div className="flex items-center gap-1">
                    <span>{index + 1}</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="hidden sm:inline">{tabItem.title}</span>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Enhanced Decorative Elements with better positioning */}
          <motion.div
            className="absolute top-10 right-10 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-10 left-10 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute top-1/2 right-4 w-8 h-8 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-lg"
            animate={{
              y: [-10, 10, -10],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
      </Suspense>
    </motion.div>
  );
}

AssetInformation.displayName = 'AssetInformation';

export default AssetInformation;

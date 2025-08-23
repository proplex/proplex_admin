

import { useNavigate, useParams } from 'react-router-dom';
import { lazy, Suspense, memo, useCallback, useMemo, JSX, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomTabs from '@/components/ui/custom-tab';
import { ASSET_STEPS_TABS } from '@/constants/global';
import Loading from '@/components/ui/Loading';
import { Shield, FileSearch, Building2, CheckCircle2, Clock, AlertTriangle, TrendingUp, ChevronRight, Target } from 'lucide-react';
import AssetHostedBy from './AssetHostedBy';
import IssueDueDeligence from './IssueDueDeligence';

interface Props {
  tab: string;
  step: string;
  asset?: any;
}

// Enhanced Animation variants
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
        className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Shield className="w-6 h-6 text-indigo-600" />
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

// Progress Indicator Component
const DueDiligenceProgress = ({ tabs, currentTab }: { tabs: any[]; currentTab: string }) => {
  const currentIndex = tabs.findIndex(tab => tab.id === currentTab);
  const progress = ((currentIndex + 1) / tabs.length) * 100;
  
  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <Target className="w-5 h-5 text-indigo-600" />
          <span className="text-sm font-semibold text-gray-700">Due Diligence Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-indigo-600 font-bold">{Math.round(progress)}%</span>
          <motion.div
            className="w-2 h-2 bg-indigo-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-sm"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ originX: 0 }}
        />
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>Asset Hosting</span>
        <span>Due Diligence</span>
        <span>Completion</span>
      </div>
    </motion.div>
  );
};

// Tab Status Component
const TabStatus = ({ tabId, asset }: { tabId: string; asset?: any }) => {
  const getTabStatus = (id: string) => {
    switch (id) {
      case 'asseet-hosted-by':
        return asset?.hostedBy?.name ? 'complete' : 'incomplete';
      case 'asseet-due-diligence':
        const legal = asset?.dueDiligence?.legal?.length || 0;
        const structure = asset?.dueDiligence?.structure?.length || 0;
        const valuation = asset?.dueDiligence?.valuation?.length || 0;
        return (legal > 0 && structure > 0 && valuation > 0) ? 'complete' : 'incomplete';
      default:
        return 'incomplete';
    }
  };

  const status = getTabStatus(tabId);
  
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.5 }}
      className="ml-2"
    >
      {status === 'complete' ? (
        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
      ) : (
        <Clock className="w-4 h-4 text-amber-500" />
      )}
    </motion.div>
  );
};

// Enhanced component map with better loading states
const getComponentMap = (isTransitioning: boolean): Record<string, JSX.Element> => ({
  'asseet-hosted-by': (
    <Suspense fallback={<EnhancedLoading />}>
      <AnimatePresence mode="wait">
        {!isTransitioning && (
          <motion.div
            variants={tabContentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <AssetHostedBy />
          </motion.div>
        )}
      </AnimatePresence>
    </Suspense>
  ),
  'asseet-due-diligence': (
    <Suspense fallback={<EnhancedLoading />}>
      <AnimatePresence mode="wait">
        {!isTransitioning && (
          <motion.div
            variants={tabContentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <IssueDueDeligence />
          </motion.div>
        )}
      </AnimatePresence>
    </Suspense>
  ),
} as const);
    
const IssuesDue = memo(({ tab, step, asset }: Props) => {
  const { id = null } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [completedSections, setCompletedSections] = useState<string[]>([]);

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

  // Update completed sections based on asset data
  useEffect(() => {
    const completed = [];
    if (asset?.hostedBy?.name) completed.push('asseet-hosted-by');
    if (asset?.dueDiligence?.legal?.length > 0 || 
        asset?.dueDiligence?.structure?.length > 0 || 
        asset?.dueDiligence?.valuation?.length > 0) {
      completed.push('asseet-due-diligence');
    }
    setCompletedSections(completed);
  }, [asset]);

  const tabs = useMemo(() => {
    const stepTabs = ASSET_STEPS_TABS.find((ele) => ele.id === step)?.tabs || [];
    const componentMap = getComponentMap(isTransitioning);
    
    return stepTabs.map((tabItem) => ({
      id: tabItem.id,
      title: tabItem.title,
      component: isTransitioning ? <EnhancedLoading /> : (componentMap[tabItem.id] || <div />),
    }));
  }, [step, isTransitioning, asset]);



  return (
    <Suspense fallback={<EnhancedLoading />}>
      <motion.div 
        className='due-diligence-section'
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Enhanced Header Section */}
        <motion.div
          variants={headerVariants}
          className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 mb-6 border border-indigo-100 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Shield className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h1 className='text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1'>
                  Due Diligence & Asset Hosting
                </h1>
                <p className="text-gray-600 text-sm font-medium">
                  Complete verification and hosting requirements for your asset
                </p>
              </div>
            </div>
            
            {/* Completion Status */}
            <motion.div
              className="text-right"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-2xl font-bold text-indigo-600">
                {completedSections.length}/{tabs.length}
              </div>
              <div className="text-xs text-gray-500 font-medium">Sections Complete</div>
            </motion.div>
          </div>
          
          {/* Progress Indicator */}
          <DueDiligenceProgress tabs={tabs} currentTab={tab} />
          
          {/* Quick Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, staggerChildren: 0.1 }}
          >
            <motion.div className="bg-white/60 backdrop-blur rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-indigo-500" />
                <div>
                  <div className="text-sm font-semibold text-gray-700">Asset Hosting</div>
                  <div className="text-xs text-gray-500">
                    {asset?.hostedBy?.name ? 'Configured' : 'Pending Setup'}
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div className="bg-white/60 backdrop-blur rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <FileSearch className="w-5 h-5 text-purple-500" />
                <div>
                  <div className="text-sm font-semibold text-gray-700">Legal Docs</div>
                  <div className="text-xs text-gray-500">
                    {asset?.dueDiligence?.legal?.length || 0} documents
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div className="bg-white/60 backdrop-blur rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                <div>
                  <div className="text-sm font-semibold text-gray-700">Valuation</div>
                  <div className="text-xs text-gray-500">
                    {asset?.dueDiligence?.valuation?.length || 0} reports
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <CustomTabs
            defaultTab={tab}
            tabs={tabs}
            handleTabChange={handleTabChange}
            aria-label='Due diligence tabs'
          />
        </motion.div>
      </motion.div>
    </Suspense>
  );
});

IssuesDue.displayName = 'IssuesDue';

export default IssuesDue;

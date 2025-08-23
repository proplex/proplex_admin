

import { memo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import CustomTabs from '@/components/ui/custom-tab';
import { 
  Scale, 
  TrendingUp, 
  Building, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Shield,
  Target,
  BarChart3
} from 'lucide-react';
import Legal from './Legal';
import Strucutre from './Structure';
import Valuation from './Valuation';

// Animation variants
const containerVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const headerVariants = {
  initial: { opacity: 0, y: -30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const tabContentVariants = {
  initial: { opacity: 0, x: 30, scale: 0.95 },
  animate: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: { duration: 0.5 }
  },
  exit: { 
    opacity: 0, 
    x: -30,
    scale: 0.95,
    transition: { duration: 0.3 }
  }
};

const progressVariants = {
  initial: { scaleX: 0 },
  animate: { 
    scaleX: 1,
    transition: { duration: 0.8 }
  }
};

// Tab Status Component
const TabStatus = ({ tabId, dueDiligenceData }: { tabId: string; dueDiligenceData: any }) => {
  const getTabStatus = (id: string) => {
    switch (id) {
      case 'legal':
        return dueDiligenceData?.legal?.length > 0 ? 'complete' : 'incomplete';
      case 'structure':
        return dueDiligenceData?.structure?.length > 0 ? 'complete' : 'incomplete';
      case 'valuation':
        return dueDiligenceData?.valuation?.length > 0 ? 'complete' : 'incomplete';
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

// Progress Indicator
const DiligenceProgress = ({ tabs, currentTab, dueDiligenceData }: { 
  tabs: any[]; 
  currentTab: string; 
  dueDiligenceData: any;
}) => {
  const completedTabs = tabs.filter(tab => {
    switch (tab.id) {
      case 'legal':
        return dueDiligenceData?.legal?.length > 0;
      case 'structure':
        return dueDiligenceData?.structure?.length > 0;
      case 'valuation':
        return dueDiligenceData?.valuation?.length > 0;
      default:
        return false;
    }
  }).length;
  
  const progress = (completedTabs / tabs.length) * 100;
  
  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <Target className="w-5 h-5 text-purple-600" />
          <span className="text-sm font-semibold text-gray-700">Due Diligence Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-purple-600 font-bold">{Math.round(progress)}%</span>
          <span className="text-xs text-gray-500">({completedTabs}/{tabs.length})</span>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-full shadow-sm"
          variants={progressVariants}
          initial="initial"
          animate="animate"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>Legal</span>
        <span>Structure</span>
        <span>Valuation</span>
      </div>
    </motion.div>
  );
};

// Stats Card Component
const StatsCard = ({ icon: Icon, label, value, color }: { 
  icon: any; 
  label: string; 
  value: string | number; 
  color: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br from-white to-${color}-50 rounded-xl p-4 border border-${color}-200 shadow-sm hover:shadow-md transition-all duration-300`}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 bg-${color}-100 rounded-lg`}>
          <Icon className={`w-5 h-5 text-${color}-600`} />
        </div>
        <div className="flex-1">
          <div className="text-lg font-bold text-gray-900">{value}</div>
          <div className="text-sm text-gray-600">{label}</div>
        </div>
      </div>
    </motion.div>
  );
};
const IssueDueDiligence = memo(() => {
  const [currentTab, setCurrentTab] = useState('legal');
  const { watch } = useFormContext();
  
  // Watch due diligence data
  const dueDiligenceData = watch('dueDiligence') || {};
  
  const handleTabChange = useCallback((tabId: string) => {
    setCurrentTab(tabId);
  }, []);

  const dueDiligenceTabs = [
    {
      id: 'legal',
      title: 'Legal Documents',
      component: (
        <motion.div
          variants={tabContentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Legal />
        </motion.div>
      ),
    },
    {
      id: 'valuation',
      title: 'Valuation Reports',
      component: (
        <motion.div
          variants={tabContentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Valuation />
        </motion.div>
      ),
    },
    {
      id: 'structure',
      title: 'Asset Structure',
      component: (
        <motion.div
          variants={tabContentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Strucutre />
        </motion.div>
      ),
    },
  ];

  return (
    <motion.div 
      className='w-full space-y-6'
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Enhanced Header */}
      <motion.div
        variants={headerVariants}
        className="bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 rounded-2xl p-6 border border-purple-100 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <motion.div
              className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Shield className="w-7 h-7 text-white" />
            </motion.div>
            <div>
              <h2 className='text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1'>
                Due Diligence Documentation
              </h2>
              <p className="text-gray-600 text-sm font-medium">
                Upload and manage essential legal, structural, and valuation documents
              </p>
            </div>
          </div>
          
          <motion.div
            className="text-right"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-lg font-bold text-purple-600">
              {(dueDiligenceData?.legal?.length || 0) + 
               (dueDiligenceData?.structure?.length || 0) + 
               (dueDiligenceData?.valuation?.length || 0)}
            </div>
            <div className="text-xs text-gray-500 font-medium">Total Documents</div>
          </motion.div>
        </div>
        
        <DiligenceProgress 
          tabs={dueDiligenceTabs} 
          currentTab={currentTab} 
          dueDiligenceData={dueDiligenceData}
        />
      </motion.div>
      
      {/* Quick Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, staggerChildren: 0.1 }}
      >
        <StatsCard
          icon={Scale}
          label="Legal Documents"
          value={dueDiligenceData?.legal?.length || 0}
          color="purple"
        />
        <StatsCard
          icon={Building}
          label="Structure Reports"
          value={dueDiligenceData?.structure?.length || 0}
          color="blue"
        />
        <StatsCard
          icon={BarChart3}
          label="Valuation Reports"
          value={dueDiligenceData?.valuation?.length || 0}
          color="emerald"
        />
      </motion.div>

      {/* Enhanced Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
      >
        <CustomTabs 
          tabs={dueDiligenceTabs} 
          defaultTab={currentTab}
          handleTabChange={handleTabChange}
          aria-label="Due diligence tabs"
        />
      </motion.div>
    </motion.div>
  );
});

export default IssueDueDiligence;

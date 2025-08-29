

import { useNavigate, useParams } from 'react-router-dom';
import { Suspense, memo } from 'react';
import { motion } from 'framer-motion';
import CustomTabs from '@/components/ui/custom-tab';
import Faq from './Faq';
import Terms from './Terms';
import { 
  FileText, 
  HelpCircle, 
  BookOpen, 
  Info,
  CheckCircle2,
  Clock,
  MessageSquare,
  Shield
} from 'lucide-react';

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
  initial: { opacity: 0, y: -20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const statsVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4 }
  }
};

const featureVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4 }
  }
};

// Stats Card Component
const StatsCard = ({ icon: Icon, label, value, color, trend }: { 
  icon: any; 
  label: string; 
  value: string | number; 
  color: string;
  trend?: 'up' | 'down' | 'neutral';
}) => {
  return (
    <motion.div
      variants={statsVariants}
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

interface Props {
  tab: string;
}

const TermsAndConditions = memo(({ tab }: Props) => {
  const { id = null } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  
  const handleTabChange = (tabId: string) => {
    const basePath = id ? `/edit-asset/${id}` : '/add-asset';
    navigate(`${basePath}?step=tandc-faq&tab=${tabId}`, {
      replace: false,
    });
  };

  const tabs = [
    {
      id: 'terms-and-conditions',
      title: 'Terms & Conditions',
      component: <Terms />,
      icon: FileText,
      description: 'Legal terms, conditions, and compliance requirements'
    },
    {
      id: 'faq',
      title: 'FAQ',
      component: <Faq />,
      icon: HelpCircle,
      description: 'Frequently asked questions and helpful answers'
    },
  ];

  return (
    <motion.div
      className="flex flex-col w-full space-y-6"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Enhanced Header */}
      <motion.div
        variants={headerVariants}
        className="rounded-xl p-6 m-4 border shadow-sm overflow-hidden relative"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 right-4 w-32 h-32 bg-indigo-500 rounded-full blur-3xl" />
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-blue-500 rounded-full blur-2xl" />
        </div>
        
        <div className="relative">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <motion.div
                className="p-3 bg-gradient-to-br from-blue-500 to-purple-600  rounded-xl shadow-lg relative overflow-hidden"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                />
                <BookOpen className="w-6 h-6 text-white relative z-10" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Terms & Conditions, FAQ
                </h1>
                <p className="text-gray-600 text-sm font-medium mt-1">
                  Legal documentation and frequently asked questions for clarity
                </p>
              </div>
            </div>
            
            {/* Progress Indicator */}
            <motion.div
              variants={statsVariants}
              className="text-right"
            >
              <div className="text-lg font-bold text-indigo-600">{tabs.length}</div>
              <div className="text-xs text-gray-500">Sections</div>
            </motion.div>
          </div>
          
          {/* Enhanced Features Overview */}
          
        </div>
      </motion.div>
      
      {/* Quick Stats */}
      
      {/* Enhanced Content */}
      <motion.div
        variants={contentVariants}
        className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden"
      >
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center p-16 space-y-6">
            {/* Enhanced Loading Animation */}
            <div className="relative">
              <motion.div
                className="w-16 h-16 border-4 border-indigo-200 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-0 w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-3 w-10 h-10 border-2 border-blue-400 border-b-transparent rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </div>
            
            {/* Loading Progress */}
            <div className="text-center space-y-2">
              <motion.h3
                className="text-lg font-semibold text-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Loading Terms & Conditions
              </motion.h3>
              <motion.div
                className="flex items-center gap-2 text-gray-600 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <BookOpen className="w-4 h-4" />
                <span className="font-medium">Preparing legal documentation and FAQ...</span>
              </motion.div>
            </div>
            
            {/* Loading Steps */}
            <motion.div
              className="grid grid-cols-2 gap-4 w-full max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {tabs.map((tab, index) => (
                <div key={tab.id} className="flex items-center gap-2 text-sm text-gray-500">
                  <motion.div
                    className={`w-2 h-2 bg-${['indigo', 'blue'][index % 2]}-500 rounded-full`}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: index * 0.2 }}
                  />
                  <span className="truncate">{tab.title}</span>
                </div>
              ))}
            </motion.div>
          </div>
        }>
          <div className="p-6">
            <CustomTabs
              defaultTab={tab}
              tabs={tabs}
              handleTabChange={handleTabChange}
              aria-label='Terms & Conditions and FAQ tabs'
            />
          </div>
        </Suspense>
      </motion.div>
    </motion.div>
  );
});

export default TermsAndConditions;

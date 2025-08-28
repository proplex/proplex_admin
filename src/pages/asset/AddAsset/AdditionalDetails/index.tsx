

import { useNavigate, useParams } from 'react-router-dom';
import { Suspense, memo } from 'react';
import { motion } from 'framer-motion';
import CustomTabs from '@/components/ui/custom-tab';
import RiskFactors from './RiskFactors';
import RiskDisclosures from './RiskDisclosures';
import ExitOpportunity from './ExitOpportunities';
import AdditionalTaxes from './AdditionalTaxes';
import { EmbeddedFinanceComponent } from '@/components/EmbeddedFinance';
import { 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign,
  Info,
  CheckCircle2,
  Clock,
  FileText,
  Target,
  Wallet
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
        {trend === 'up' && (
          <TrendingUp className="w-4 h-4 text-emerald-500" />
        )}
      </div>
    </motion.div>
  );
};

interface Props {
  tab: string;
  step: string;
}

const AdditionalDetails = memo(({ tab, step }: Props) => {
  const { id = null } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  
  const handleTabChange = (tabId: string) => {
    const basePath = id ? `/edit-asset/${id}` : '/add-asset';
    navigate(`${basePath}?step=additional-details&tab=${tabId}`, {
      replace: false,
    });
  };

  const tabs = [
    {
      id: 'risk-factors',
      title: 'Risk Factors',
      component: <RiskFactors />,
      icon: AlertTriangle,
      description: 'Identify and analyze potential investment risks'
    },
    {
      id: 'exit-opportunities',
      title: 'Exit Opportunities',
      component: <ExitOpportunity />,
      icon: Target,
      description: 'Define exit strategies and liquidity options'
    },
    {
      id: 'risk-disclosure',
      title: 'Risk Disclosure',
      component: <RiskDisclosures />,
      icon: FileText,
      description: 'Legal disclosures and compliance documentation'
    },
    {
      id: 'additional-tax',
      title: 'Additional Tax',
      component: <AdditionalTaxes />,
      icon: DollarSign,
      description: 'Tax implications and additional charges'
    },
    {
      id: 'embedded-finance',
      title: 'Embedded Finance',
      component: <EmbeddedFinanceComponent />,
      icon: Wallet,
      description: 'DeFi and FinTech solutions for asset tokenization'
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
                className="w-16 h-16 border-4 border-orange-200 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-0 w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-3 w-10 h-10 border-2 border-red-400 border-b-transparent rounded-full"
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
                Loading Additional Details
              </motion.h3>
              <motion.div
                className="flex items-center gap-2 text-gray-600 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Shield className="w-4 h-4" />
                <span className="font-medium">Preparing risk assessment and documentation...</span>
              </motion.div>
            </div>
            
            {/* Loading Steps */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {tabs.map((tab, index) => (
                <div key={tab.id} className="flex items-center gap-2 text-sm text-gray-500">
                  <motion.div
                    className={`w-2 h-2 bg-${['orange', 'red', 'pink', 'rose'][index % 4]}-500 rounded-full`}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: index * 0.2 }}
                  />
                  <span className="truncate">{tab.title}</span>
                </div>
              ))}
            </motion.div>
          </div>
        }>
          <CustomTabs
            defaultTab={tab}
            tabs={tabs}
            handleTabChange={handleTabChange}
            aria-label='Additional Details'
          />
        </Suspense>
      </motion.div>
    </motion.div>
  );
});

export default AdditionalDetails;

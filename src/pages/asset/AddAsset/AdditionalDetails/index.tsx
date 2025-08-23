

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
      <motion.div
        variants={headerVariants}
        className="bg-gradient-to-r from-orange-50 via-red-50 to-pink-50 rounded-xl p-6 border border-orange-100 shadow-sm overflow-hidden relative"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 right-4 w-32 h-32 bg-orange-500 rounded-full blur-3xl" />
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-red-500 rounded-full blur-2xl" />
        </div>
        
        <div className="relative">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <motion.div
                className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg relative overflow-hidden"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                />
                <Shield className="w-6 h-6 text-white relative z-10" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                  Additional Details
                </h1>
                <p className="text-gray-600 text-sm font-medium mt-1">
                  Risk assessment, disclosures, and financial considerations
                </p>
              </div>
            </div>
            
            {/* Progress Indicator */}
            <motion.div
              variants={statsVariants}
              className="text-right"
            >
              <div className="text-lg font-bold text-orange-600">{tabs.length}</div>
              <div className="text-xs text-gray-500">Categories</div>
            </motion.div>
          </div>
          
          {/* Enhanced Categories Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const colors = ['orange', 'red', 'pink', 'rose'];
              const color = colors[index % colors.length];
              
              return (
                <motion.div
                  key={tab.id}
                  variants={featureVariants}
                  className={`bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-${color}-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  onClick={() => handleTabChange(tab.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 bg-${color}-100 rounded-lg flex-shrink-0`}>
                      <Icon className={`w-4 h-4 text-${color}-600`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-semibold text-gray-800 block truncate">{tab.title}</span>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{tab.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
      
      {/* Quick Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, staggerChildren: 0.1 }}
      >
        <StatsCard
          icon={Shield}
          label="Risk Management"
          value="Active"
          color="orange"
          trend="up"
        />
        <StatsCard
          icon={FileText}
          label="Documentation"
          value="Ready"
          color="red"
        />
        <StatsCard
          icon={CheckCircle2}
          label="Compliance"
          value="Verified"
          color="emerald"
        />
      </motion.div>

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

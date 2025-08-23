import { useNavigate, useParams } from "react-router-dom";
import { Suspense, useCallback, useMemo, JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ASSET_STEPS_TABS } from "@/constants/global";
import CustomTabs from "@/components/ui/custom-tab";
import Loading from "@/components/ui/Loading";
import TokenInformation from "./TokenAllocation";
import DAO from "../AssetInformation/AssetType/DAO/index";
import { 
  Coins, 
  Users, 
  Zap, 
  Shield, 
  Target,
  TrendingUp,
  Activity,
  Sparkles
} from "lucide-react";

interface Props {
  tab: string;
  step: string;
  asset?: any; // Adjust to the correct type
}

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

const TokenInformationComponent = ({ tab, step, asset }: Props) => {
  const { id = null } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const COMPONENT_MAP: Record<string, JSX.Element> = {
    "token-information": (
      <Suspense fallback={
        <motion.div
          className="flex flex-col items-center justify-center py-12 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-8 h-8 border-3 border-purple-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <div className="text-center">
            <p className="text-gray-600 font-medium">Loading Token Information...</p>
            <p className="text-sm text-gray-400 mt-1">Configuring blockchain tokenization</p>
          </div>
        </motion.div>
      }>
        <TokenInformation />
      </Suspense>
    ),
    "dao-information": (
      <Suspense fallback={
        <motion.div
          className="flex flex-col items-center justify-center py-12 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-8 h-8 border-3 border-indigo-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <div className="text-center">
            <p className="text-gray-600 font-medium">Loading DAO Configuration...</p>
            <p className="text-sm text-gray-400 mt-1">Setting up decentralized governance</p>
          </div>
        </motion.div>
      }>
        <DAO asset={asset} />
      </Suspense>
    ),
  } as const;

  // Memoized tab change handler
  const handleTabChange = useCallback(
    (tabId: string) => {
      const basePath = id ? `/edit-asset/${id}` : "/add-asset";
      navigate(`${basePath}?step=${step}&tab=${tabId}`, { replace: false });
    },
    [id, navigate, step]
  );

  const tabs = useMemo(() => {
    const stepTabs =
      ASSET_STEPS_TABS.find((ele) => ele.id === step)?.tabs || [];
    return stepTabs.map((tabItem) => ({
      id: tabItem.id,
      title: tabItem.title,
      icon: tabItem.id === 'token-information' ? <Coins className="w-4 h-4" /> : <Users className="w-4 h-4" />,
      component: COMPONENT_MAP[tabItem.id] || <div />,
    }));
  }, [step]);

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
        className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 rounded-xl p-6 border border-purple-100 shadow-sm overflow-hidden relative"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 right-4 w-32 h-32 bg-purple-500 rounded-full blur-3xl" />
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-indigo-500 rounded-full blur-2xl" />
        </div>
        
        <div className="relative">
          <div className="flex items-center gap-4">
            <motion.div
              className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg relative overflow-hidden"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              />
              <Coins className="w-6 h-6 text-white relative z-10" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Token Information
              </h1>
              <p className="text-gray-600 text-sm font-medium mt-1 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Configure blockchain tokenization and governance settings
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Blockchain Features Overview */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={contentVariants}
      >
        {[
          { icon: Coins, title: "Token Creation", desc: "Define digital asset tokens", color: "purple" },
          { icon: Users, title: "DAO Governance", desc: "Decentralized management", color: "indigo" },
          { icon: Shield, title: "Security", desc: "Blockchain-secured assets", color: "blue" },
          { icon: TrendingUp, title: "Value Growth", desc: "Token appreciation potential", color: "emerald" },
        ].map((feature, index) => (
          <motion.div
            key={feature.title}
            className={`bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300`}
            whileHover={{ scale: 1.02, y: -2 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-100 rounded-lg`}>
                <feature.icon className={`w-5 h-5 text-${feature.color}-600`} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">{feature.title}</h3>
                <p className="text-xs text-gray-600 mt-1">{feature.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Enhanced Content Area */}
      <motion.div
        variants={contentVariants}
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-6">
          <Suspense
            fallback={
              <motion.div
                className="flex flex-col items-center justify-center py-12 space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="w-8 h-8 border-3 border-purple-500 border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <div className="text-center">
                  <p className="text-gray-600 font-medium">Loading Token Configuration...</p>
                  <p className="text-sm text-gray-400 mt-1">Preparing blockchain integration</p>
                </div>
              </motion.div>
            }
          >
            {/* Simplified Token Information Display */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-2 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg">
                  <Activity className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Token Allocation & Configuration</h2>
                  <p className="text-sm text-gray-600">Set up tokenization parameters and distribution strategy</p>
                </div>
              </div>
              
              <TokenInformation />
            </div>
            
            {/* Uncomment when CustomTabs is needed
            <CustomTabs
              defaultTab={tab}
              tabs={tabs}
              handleTabChange={handleTabChange}
              aria-label='Token information tabs'
            />
            */}
          </Suspense>
        </div>
      </motion.div>
    </motion.div>
  );
}

TokenInformationComponent.displayName = "TokenInformationComponent";

export default TokenInformationComponent;

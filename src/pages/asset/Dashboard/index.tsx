import { useAssetApi } from "@/hooks/asset/useAssetApi";
import CustomTabs from "@/components/ui/custom-tab";
import queryString from "query-string";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "@/components/ui/Loading";
import Documents from "./Documents";
import Orders from "./Orders";
import Investors from "./Investors";
import Overview from "./Overview";
import { 
  TrendingUp, 
  Users, 
  FileText, 
  ShoppingCart, 
  BarChart3,
  Building2,
  Activity,
  Sparkles
} from "lucide-react";

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

const Index = () => {
  const navigate = useNavigate();
  const { id = null } = useParams();
  const { assetOverview, getAssetOverview, isPending } = useAssetApi();
  const queryParams = queryString.parse(location.search);

  useEffect(() => {
    const fetchAsset = async () => {
      if (id) {
        await getAssetOverview(id);
      }
    };
    fetchAsset();
  }, [id]);

  const tab: string = Array.isArray(queryParams["tab"])
    ? queryParams["tab"][0] || "overview"
    : queryParams["tab"] || "overview";

  const tabs = [
    {
      id: "overview",
      title: "Overview",
      icon: <BarChart3 className="w-4 h-4" />,
      component: <Overview assetOverview={assetOverview} />,
    },
    {
      id: "investers",
      title: "Investors",
      icon: <Users className="w-4 h-4" />,
      component: <Investors assetOverview={assetOverview} />,
    },
    {
      id: "orders",
      title: "Orders",
      icon: <ShoppingCart className="w-4 h-4" />,
      component: <Orders assetOverview={assetOverview} />,
    },
    {
      id: "documents",
      title: "Documents",
      icon: <FileText className="w-4 h-4" />,
      component: <Documents assetOverview={assetOverview} />,
    },
  ];

  const handleTabChange = (tabId: string) => {
    navigate(`/dashborad-asset/${id}?tab=${tabId}`, { replace: true });
  };

  if (isPending) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center h-screen space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <div className="text-center">
          <p className="text-gray-600 font-medium">Loading Asset Dashboard...</p>
          <p className="text-sm text-gray-400 mt-1">Preparing comprehensive asset data</p>
        </div>
      </motion.div>
    );
  }

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
        className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-6 border border-blue-100 shadow-sm overflow-hidden relative"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 right-4 w-32 h-32 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-indigo-500 rounded-full blur-2xl" />
        </div>
        
        <div className="relative">
          <div className="flex items-center gap-4">
            <motion.div
              className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg relative overflow-hidden"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              />
              <Building2 className="w-6 h-6 text-white relative z-10" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Asset Dashboard
              </h1>
              <p className="text-gray-600 text-sm font-medium mt-1 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Comprehensive asset analytics and management overview
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Asset Overview Card */}
      {assetOverview && (
        <motion.div
          variants={contentVariants}
          className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-2 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {assetOverview.name || 'Asset Overview'}
              </h2>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Real-time asset performance metrics
              </p>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Enhanced Content Area */}
      <motion.div
        variants={contentVariants}
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-6">
          <CustomTabs
            defaultTab={tab}
            tabs={tabs}
            handleTabChange={handleTabChange}
            aria-label="Asset Dashboard Tabs"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};
export default Index;

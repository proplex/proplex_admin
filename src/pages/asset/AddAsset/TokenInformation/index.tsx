import { useNavigate, useParams } from "react-router-dom";
import { Suspense, useCallback, useMemo, JSX, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ASSET_STEPS_TABS } from "@/constants/global";
import Loading from "@/components/ui/Loading";

import PropertyDIDReservation from "./PropertyDIDReservation";
import AssetInformationSummary from "./AssetInformationSummary";
import CustomTabs from "@/components/ui/custom-tab";

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
  
  // Ensure default tab is always asset-information
  const defaultTab = tab && ['asset-information', 'property-did'].includes(tab) ? tab : 'asset-information';
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Define available tabs
  const tokenTabs = [
    {
      id: 'asset-information',
      title: 'Asset Information',
      icon: '🏢',
      description: 'Configure asset details and investment information'
    },
    {
      id: 'property-did',
      title: 'Property DID',
      icon: '🏠',
      description: 'Set up blockchain identity for your property'
    }
  ];

  const COMPONENT_MAP: Record<string, JSX.Element> = {
    "asset-information": (
      <Suspense fallback={<div className="flex items-center justify-center p-8"><Loading /></div>}>
        <AssetInformationSummary asset={asset} />
      </Suspense>
    ),
    "property-did": (
      <Suspense fallback={<div className="flex items-center justify-center p-8"><Loading /></div>}>
        <PropertyDIDReservation />
      </Suspense>
    ),
  } as const;

  // Memoized tab change handler
  const handleTabChange = useCallback(
    (tabId: string) => {
      setActiveTab(tabId);
      const basePath = id ? `/edit-asset/${id}` : "/add-asset";
      navigate(`${basePath}?step=${step}&tab=${tabId}`, { replace: false });
    },
    [id, navigate, step]
  );

  return (
    <Suspense fallback={<div>Loading Token Information...</div>}>
      <div className="min-h-[600px]  relative overflow-hidden">
        <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
              <div className="p-3 md:p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  Asset Configuration
                </h1>
                <p className="text-gray-600 flex items-center gap-2 text-sm md:text-base">
                  Configure asset details and blockchain integration for your property
                </p>
              </div>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 border-b border-gray-200">
              {tokenTabs.map((tabItem) => {
                const isActive = tabItem.id === activeTab;
                
                return (
                  <motion.button
                    key={tabItem.id}
                    onClick={() => handleTabChange(tabItem.id)}
                    className={`flex items-center gap-3 px-6 py-4 text-sm font-medium rounded-t-lg border-b-2 transition-all duration-200 ${
                      isActive 
                        ? ' text-blue-600 ' 
                        : 'border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-lg">{tabItem.icon}</span>
                    <div className="text-left">
                      <div className="font-semibold">{tabItem.title}</div>
                      <div className="text-xs text-gray-500">{tabItem.description}</div>
                    </div>
                    {/* Active indicator */}
                    {isActive && (
                      <span className="ml-2 w-2 h-2 bg-blue-50 rounded-full"></span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {COMPONENT_MAP[activeTab] ? (
              COMPONENT_MAP[activeTab]
            ) : (
              // Default fallback - show Asset Information if no tab content
              <Suspense fallback={<div className="flex items-center justify-center p-8"><Loading /></div>}>
                <AssetInformationSummary asset={asset} />
              </Suspense>
            )}
          </motion.div>
        </div>
      </div>
    </Suspense>
  );
}

TokenInformationComponent.displayName = "TokenInformationComponent";

export default TokenInformationComponent;
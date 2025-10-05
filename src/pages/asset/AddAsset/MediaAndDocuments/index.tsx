

import { useNavigate, useParams } from 'react-router-dom';
import { lazy, Suspense, memo, useCallback, useMemo, JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomTabs from '@/components/ui/custom-tab';
import { ASSET_STEPS_TABS } from '@/constants/asset';
import Loading from '@/components/ui/Loading';
import Gallery from './Gallery';
import Documents from './Documents';
import { FileImage, Files, Upload, Sparkles } from 'lucide-react';

interface Props {
  tab: string;
  step: string;
}

// Animation variants - Simplified to avoid TypeScript errors
const containerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  },
  exit: { opacity: 0, y: -20 }
};

const headerVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5 }
  }
};

const tabContentVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4 }
  },
  exit: { 
    opacity: 0, 
    x: -20,
    transition: { duration: 0.3 }
  }
};

// Enhanced Loading Component
const EnhancedLoading = () => (
  <motion.div
    className="flex items-center justify-center p-16"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="flex flex-col items-center gap-4 text-blue-600"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Upload className="w-8 h-8" />
      </motion.div>
      <span className="text-lg font-medium">Loading media content...</span>
    </motion.div>
  </motion.div>
);

const COMPONENT_MAP: Record<string, JSX.Element> = {
  gallery: (
    <Suspense fallback={<EnhancedLoading />}>
      <motion.div
        variants={tabContentVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Gallery />
      </motion.div>
    </Suspense>
  ),
  documents: (
    <Suspense fallback={<EnhancedLoading />}>
      <motion.div
        variants={tabContentVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Documents />
      </motion.div>
    </Suspense>
  ),
} as const;

const MediaAndDocumentsComponent = memo(({ tab, step }: Props) => {
  const { id = null } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  // Memoized tab change handler
  const handleTabChange = useCallback(
    (tabId: string) => {
      const basePath = id ? `/edit-asset/${id}` : '/add-asset';
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
      component: COMPONENT_MAP[tabItem.id] || <div />,
    }));
  }, [step]);

  return (
    <motion.div
      className="min-h-[600px]"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Suspense fallback={<EnhancedLoading />}>
        <div className='max-w-7xl mx-auto p-6'>
          {/* Enhanced Header with Icon and Animation */}
          <motion.div
            className="mb-8"
            variants={headerVariants}
          >
            <div className="flex items-center gap-4 mb-2">
              <motion.div
                className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileImage className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h1 className='text-3xl font-bold text-gray-900 mb-1'>Media  & Documents</h1>
                <p className="text-gray-600 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Upload images, videos, and important documents for your asset
                </p>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Tabs with Animation */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -4 }}
          >
            <div className="p-8">
              <AnimatePresence mode="wait">
                <CustomTabs
                  defaultTab={tab}
                  tabs={tabs}
                  handleTabChange={handleTabChange}
                  aria-label='Media and documents tabs'
                />
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            className="absolute top-20 right-20 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
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
            className="absolute bottom-20 left-20 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl"
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
        </div>
      </Suspense>
    </motion.div>
  );
});

MediaAndDocumentsComponent.displayName = 'MediaAndDocumentsComponent';

export default MediaAndDocumentsComponent;

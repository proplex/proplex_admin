

import { useNavigate, useParams } from 'react-router-dom';
import { Suspense, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomTabs from '@/components/ui/custom-tab';
import Amenity from './Amenity';
import Feature from './Feature';
import { 
  Settings, 
  Star, 
  Home, 
  Sparkles,
  CheckCircle2,
  Layers
} from 'lucide-react';

interface Props {
  tab: string;
  step: string;
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

const featureVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4 }
  }
};

const FeaturesAndAmenities = memo(({ tab, step }: Props) => {
  const { id = null } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  
  const handleTabChange = useCallback(
    (tabId: string) => {
      const basePath = id ? `/edit-asset/${id}` : '/add-asset';
      navigate(`${basePath}?step=${step}&tab=${tabId}`, { replace: false });
    },
    [id, navigate, step]
  );

  const tabs = [
    {
      id: 'features',
      title: 'Features',
      icon: <Settings className="w-4 h-4" />,
      component: <Feature />,
    },
    {
      id: 'amenities',
      title: 'Amenities',
      icon: <Star className="w-4 h-4" />,
      component: <Amenity />,
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
        className="rounded-xl p-6 border m-4 shadow-sm overflow-hidden relative"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 right-4 w-32 h-32 bg-emerald-500 rounded-full blur-3xl" />
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-green-500 rounded-full blur-2xl" />
        </div>
        
        <div className="relative">
          <div className="flex items-center gap-4">
            <motion.div
              className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg relative overflow-hidden"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              />
              <Home className="w-6 h-6 text-white relative z-10" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Features & Amenities
              </h1>
              <p className="text-gray-600 text-sm font-medium mt-1 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Define property features and luxury amenities to attract investors
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Feature Overview Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 m-4 lg:grid-cols-4 gap-4"
        variants={contentVariants}
      >
        {[
          { icon: Settings, title: "Core Features", desc: "Essential property characteristics" },
          { icon: Star, title: "Premium Amenities", desc: "Luxury facilities and services" },
          { icon: CheckCircle2, title: "Quality Standards", desc: "High-end specifications" },
          { icon: Layers, title: "Value Enhancement", desc: "Features that add property value" },
        ].map((feature, index) => (
          <motion.div
            key={feature.title}
            className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
            whileHover={{ scale: 1.02, y: -2 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg">
                <feature.icon className="w-5 h-5 text-emerald-600" />
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
                  className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <div className="text-center">
                  <p className="text-gray-600 font-medium">Loading Features & Amenities...</p>
                  <p className="text-sm text-gray-400 mt-1">Preparing property enhancement options</p>
                </div>
              </motion.div>
            }
          >
            <CustomTabs
              defaultTab={tab}
              tabs={tabs}
              handleTabChange={handleTabChange}
              aria-label='Features and Amenities tabs'
            />
          </Suspense>
        </div>
      </motion.div>
    </motion.div>
  );
});

FeaturesAndAmenities.displayName = 'FeaturesAndAmenities';

export default FeaturesAndAmenities;

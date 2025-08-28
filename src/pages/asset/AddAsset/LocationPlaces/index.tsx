import { useNavigate, useParams } from 'react-router-dom';
import { lazy, Suspense, memo, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ASSET_STEPS_TABS } from '@/constants/global';
import Loading from '@/components/ui/Loading';
import { 
  MapPin, 
  Globe, 
  Building2, 
  Compass, 
  Navigation, 
  Target,
  Layers,
  Search,
  CheckCircle2,
  Clock,
  TrendingUp
} from 'lucide-react';

const Location = lazy(() => import('./Location'));

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

const LocationPlaces = memo(({ tab, step }: Props) => {
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
        className="m-4 rounded-xl p-6 border shadow-sm overflow-hidden relative"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 right-4 w-32 h-32 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-indigo-500 rounded-full blur-2xl" />
        </div>
        
        <div className="relative">
          <div className="flex justify-between items-start">
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
                <MapPin className="w-6 h-6 text-white relative z-10" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Location & Places
                </h1>
                <p className="text-gray-600 text-sm font-medium mt-1">
                  Define asset location, interactive maps, and nearby amenities
                </p>
              </div>
            </div>
            
            {/* Progress Indicator */}
            <motion.div
              variants={statsVariants}
              className="text-right"
            >
              <div className="text-lg font-bold text-blue-600">4/7</div>
              <div className="text-xs text-gray-500">Sections</div>
            </motion.div>
          </div>
          
          {/* Enhanced Features Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <motion.div
              variants={featureVariants}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-200 shadow-sm hover:shadow-md transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Globe className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-800">Interactive Maps</span>
                  <p className="text-xs text-gray-500">Google Maps integration</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              variants={featureVariants}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-indigo-200 shadow-sm hover:shadow-md transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Building2 className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-800">Nearby Places</span>
                  <p className="text-xs text-gray-500">Schools, hospitals, amenities</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              variants={featureVariants}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-purple-200 shadow-sm hover:shadow-md transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Navigation className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-800">Navigation</span>
                  <p className="text-xs text-gray-500">Distance & accessibility</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              variants={featureVariants}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-emerald-200 shadow-sm hover:shadow-md transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Target className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-800">POI Analysis</span>
                  <p className="text-xs text-gray-500">Points of interest</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Quick Stats */}
     

      {/* Content */}
      <motion.div
        variants={contentVariants}
        className="bg-white rounded-xl m-4 border  shadow-lg overflow-hidden"
      >
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center p-16 space-y-6">
            {/* Enhanced Loading Animation */}
            <div className="relative">
              <motion.div
                className="w-16 h-16 border-4 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-3 w-10 h-10 border-2 border-indigo-400 border-b-transparent rounded-full"
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
                Loading Location Services
              </motion.h3>
              <motion.div
                className="flex items-center gap-2 text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <MapPin className="w-4 h-4" />
                <span className="font-medium">Initializing maps and location data...</span>
              </motion.div>
            </div>
            
            {/* Loading Steps */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <motion.div
                  className="w-2 h-2 bg-blue-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
                <span>Map API</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <motion.div
                  className="w-2 h-2 bg-indigo-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                />
                <span>Places Data</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <motion.div
                  className="w-2 h-2 bg-purple-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
                />
                <span>UI Components</span>
              </div>
            </motion.div>
          </div>
        }>
          <Location />
        </Suspense>
      </motion.div>
    </motion.div>
  );
});

LocationPlaces.displayName = 'LocationPlaces';

export default LocationPlaces;
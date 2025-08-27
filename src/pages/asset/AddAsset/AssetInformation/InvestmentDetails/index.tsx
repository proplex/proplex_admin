import { motion } from 'framer-motion';
import AssetPrice from "./AssetPrice";
import { TrendingUp, Calculator, DollarSign } from 'lucide-react';

// Animation variants
const containerVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

interface AssetProps {
  asset: any; // Replace 'any' with the actual type of 'asset' if known
}

function Index({ asset }: AssetProps) {
  return (
    <motion.div 
      className='flex flex-col gap-6'
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Enhanced Header */}
      

      {/* Enhanced Asset Price Component */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        whileHover={{ y: -2, boxShadow: "0 20px 40px -5px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="p-6">
          <AssetPrice />
        </div>
      </motion.div>
      {/* Investment component placeholder - can be uncommented when available */}
      {/* <motion.div variants={itemVariants}>
        <Investment />
      </motion.div> */}
    </motion.div>
  );
}
export default Index;
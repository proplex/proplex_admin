import { motion } from 'framer-motion';
import TenantManagement from "./Tenat";
import Expenses from "./Expenses";
import { Users, Calculator, Building } from 'lucide-react';

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

function TenantInformation({ asset }: any) {
  return (
    <motion.div 
      className="space-y-6 w-full"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
     

      {/* Enhanced Tenant Management Section */}
      <motion.div 
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
      >
        <div className="p-6">
          <TenantManagement />
        </div>
      </motion.div>

      {/* Enhanced Expenses Section */}
      <motion.div 
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
      >
        <div className="p-6">
          <Expenses />
        </div>
      </motion.div>
    </motion.div>
  );
}
export default TenantInformation;

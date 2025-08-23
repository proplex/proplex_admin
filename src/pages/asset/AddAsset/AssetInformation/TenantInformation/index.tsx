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
      {/* Enhanced Header */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100"
      >
        <div className="flex items-center gap-4">
          <motion.div
            className="p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl shadow-lg"
            whileHover={{ scale: 1.05, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Users className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Rental Information</h2>
            <p className="text-gray-600 mt-1 flex items-center gap-2">
              <Building className="w-4 h-4" />
              Manage tenant details and rental income calculations
            </p>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Tenant Management Section */}
      <motion.div 
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        whileHover={{ y: -2, boxShadow: "0 20px 40px -5px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 border-b border-blue-100">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Tenant Management</h3>
          </div>
        </div>
        <div className="p-6">
          <TenantManagement />
        </div>
      </motion.div>

      {/* Enhanced Expenses Section */}
      <motion.div 
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        whileHover={{ y: -2, boxShadow: "0 20px 40px -5px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 border-b border-amber-100">
          <div className="flex items-center gap-3">
            <Calculator className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-semibold text-gray-900">Expense Management</h3>
          </div>
        </div>
        <div className="p-6">
          <Expenses />
        </div>
      </motion.div>
    </motion.div>
  );
}
export default TenantInformation;

import { useFormContext } from 'react-hook-form';
import { riskFormConfig } from './formConfig';
import FormGenerator from '@/components/UseForm/FormGenerator';
import { motion } from 'framer-motion';
import { ShieldAlert, Info, AlertTriangle } from 'lucide-react';

const Index = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      
      
      {/* Main Content */}
      <motion.div 
        className=" rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
        variants={itemVariants}
      >        
        {/* Information Cards */}

        <div className="p-6">
          <div className="max-w-4xl">
            {FormGenerator(riskFormConfig())}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Index;
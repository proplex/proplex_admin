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
        className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
        variants={itemVariants}
      >
        <div className="pb-4 border-b border-gray-200 px-6 py-4 bg-gradient-to-r from-amber-50/30 to-orange-50/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-md">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Risk Assessment</h2>
          </div>
          <p className="text-gray-600 text-sm mt-2 ml-11">
            Transparent disclosure of potential risks is essential for investor protection
          </p>
        </div>
        
        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 pt-0">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <Info className="h-4 w-4 text-blue-600" />
              <h3 className="font-medium text-blue-800">Disclosure Requirements</h3>
            </div>
            <p className="text-sm text-blue-700">
              All material risks must be disclosed to ensure transparency with stakeholders.
            </p>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
            <div className="flex items-center gap-2 mb-2">
              <Info className="h-4 w-4 text-purple-600" />
              <h3 className="font-medium text-purple-800">Legal Compliance</h3>
            </div>
            <p className="text-sm text-purple-700">
              Ensure all disclosures meet regulatory requirements and industry standards.
            </p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="max-w-3xl">
            {FormGenerator(riskFormConfig())}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Index;
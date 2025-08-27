import React from 'react';
import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FileText, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';
import FormGenerator from '@/components/UseForm/FormGenerator';
import formConfig from './formConfig.ts';

const Index = () => {
  const { control } = useFormContext();
  
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
      <motion.div 
        className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
        variants={itemVariants}
      >
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-md">
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Privacy Policy & Terms and Conditions</h2>
              <p className="text-gray-600 text-sm mt-1">
                Required legal documentation for SPV compliance and regulatory requirements
              </p>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mx-6 mt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-800 mb-1">SPV Legal Requirements</h4>
              <p className="text-sm text-amber-700">
                These documents are mandatory for SPV creation and must comply with applicable regulations. 
                Please ensure all policies are reviewed by legal counsel before submission.
              </p>
            </div>
          </div>
        </div>
        
        {/* Form Content */}
        <div className="p-6">
          <div className="max-w-4xl">
            {FormGenerator(formConfig({ control }))}
          </div>
        </div>
      </motion.div>

      {/* Compliance Checklist */}
      <motion.div 
        className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
        variants={itemVariants}
      >
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-md">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Compliance Checklist</h3>
              <p className="text-gray-600 text-sm mt-1">
                Ensure your documentation meets regulatory standards
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-800 mb-3">Privacy Policy Requirements</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Data collection and usage policies
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Third-party data sharing disclosures
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  User rights and data protection measures
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Cookie and tracking policies
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-gray-800 mb-3">Terms & Conditions Requirements</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Service terms and limitations
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Investment risk disclosures
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Dispute resolution procedures
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Liability and indemnification clauses
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Index;
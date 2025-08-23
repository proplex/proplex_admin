import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FormGenerator from "@/components/UseForm/FormGenerator";
import {
  assetManagementFormConfig,
  brokerageFormConfig,
  legalFormConfig,
} from "./formConfig";
import { Shield, Scale, TrendingUp, Briefcase, Sparkles } from 'lucide-react';

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

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const sectionVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4 }
  }
};

function EscrowLegal({ asset }: any) {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Enhanced Header */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100"
      >
        <div className="flex items-center gap-4">
          <motion.div
            className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Shield className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Legal & Service Providers</h2>
            <p className="text-gray-600 mt-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Configure legal advisory and asset management services
            </p>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Accordion */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
      >
        <Accordion type="single" defaultValue="item-1" collapsible>
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="px-6 py-4 text-lg font-bold text-gray-800 bg-gradient-to-r from-gray-50 to-blue-50 hover:from-gray-100 hover:to-blue-100 transition-all duration-200">
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-blue-600" />
                Service Providers Configuration
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-6">
              <div className="space-y-8">
                {/* Legal Advisory Section */}
                <motion.div 
                  variants={sectionVariants}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Scale className="w-5 h-5 text-blue-600" />
                      <h3 className="text-xl font-semibold text-gray-900">Legal Advisory</h3>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 grid grid-cols-2 gap-4 shadow-sm">
                    {FormGenerator(legalFormConfig())}
                  </div>
                </motion.div>

                {/* Asset Management Section */}
                <motion.div 
                  variants={sectionVariants}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <h3 className="text-xl font-semibold text-gray-900">Asset Management Company</h3>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 grid grid-cols-2 gap-4 shadow-sm">
                    {FormGenerator(assetManagementFormConfig())}
                  </div>
                </motion.div>

                {/* Brokerage Section */}
                <motion.div 
                  variants={sectionVariants}
                  className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-5 h-5 text-purple-600" />
                      <h3 className="text-xl font-semibold text-gray-900">Brokerage Services</h3>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 grid grid-cols-2 gap-4 shadow-sm">
                    {FormGenerator(brokerageFormConfig())}
                  </div>
                </motion.div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>
    </motion.div>
  );
}
export default EscrowLegal;

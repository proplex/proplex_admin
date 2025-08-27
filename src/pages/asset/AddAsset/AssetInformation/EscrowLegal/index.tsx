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
     
      {/* Enhanced Accordion */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl  overflow-hidden"
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
                 <div className="bg-white rounded-lg p-4 grid grid-cols-2 gap-4 shadow-sm">
                    {FormGenerator(legalFormConfig())}
                  </div>

                {/* Asset Management Section */}
                  <div className="bg-white rounded-lg p-4 grid grid-cols-2 gap-4 shadow-sm">
                    {FormGenerator(assetManagementFormConfig())}
                  </div>

                {/* Brokerage Section */}
                  <div className="bg-white rounded-lg p-4 grid grid-cols-2 gap-4 shadow-sm">
                    {FormGenerator(brokerageFormConfig())}
                  </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>
    </motion.div>
  );
}
export default EscrowLegal;

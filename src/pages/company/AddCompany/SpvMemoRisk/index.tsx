import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield } from 'lucide-react';
import SpvMemo from '../SpvMemo';
import RiskAndDisclosures from '../RiskAndDisclosures';

const Index = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* SPV Memo Section */}


              <div className="p-4">
          <SpvMemo />
        </div>


        <div className="p-4">
          <RiskAndDisclosures />
        </div>
      
    </motion.div>
  );
};

export default Index;
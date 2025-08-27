import React from 'react';
import { motion } from 'framer-motion';
import { Users, Scale } from 'lucide-react';
import BoardMember from '../BoardMember';
import LegalAdvisor from '../LegalAdvisors';

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
      {/* Board Members Section */}
      <motion.div 
        
        variants={itemVariants}
      >

        <div className="p-2">
          <BoardMember />
        </div>
      </motion.div>

      {/* Legal Advisors Section */}
      <motion.div 
        
        variants={itemVariants}
      >

        <div className="p-2">
          <LegalAdvisor />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Index;
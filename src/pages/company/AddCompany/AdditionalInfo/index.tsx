import React from 'react'
import AddAccount from '@/components/cards/company/addbank/AddAccount'
import BoardMember from '@/components/cards/company/board/Board'
import LegalAdvisor from '@/components/cards/company/legal/Legal'
import { motion } from 'framer-motion'
import { Building2, Users, Scale, CreditCard } from 'lucide-react'

const Index = () => {
  // Animation variants for entrance effects
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

  // Section configuration for better organization
  const sections = [
    {
      title: "Bank Accounts",
      icon: <CreditCard className="h-5 w-5 text-gray-600" />,
      description: "Manage company bank accounts and financial details",
      component: <AddAccount />
    },
    {
      title: "Board Members",
      icon: <Users className="h-5 w-5 text-gray-600" />,
      description: "Add and manage board members with their permissions",
      component: <BoardMember />
    },
    {
      title: "Legal Advisors",
      icon: <Scale className="h-5 w-5 text-gray-600" />,
      description: "Maintain records of legal advisors and their expertise",
      component: <LegalAdvisor />
    }
  ];

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section with Enhanced Styling */}


      {/* Form Sections with Enhanced Layout */}
      <motion.div 
        className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
        variants={itemVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
          {/* Sidebar with Section Navigation */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {sections.map((section, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white rounded-md shadow-sm">
                      {section.icon}
                    </div>
                    <h3 className="font-semibold text-gray-800">{section.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 ml-11">
                    {section.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-50/50 rounded-lg p-6 space-y-6">
              {sections.map((section, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                  variants={itemVariants}
                >
                  {section.component}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Information Cards */}
      
    </motion.div>
  )
}

export default Index
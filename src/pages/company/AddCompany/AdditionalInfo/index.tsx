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
      icon: <CreditCard className="h-5 w-5 text-blue-600" />,
      description: "Manage company bank accounts and financial details",
      component: <AddAccount />
    },
    {
      title: "Board Members",
      icon: <Users className="h-5 w-5 text-green-600" />,
      description: "Add and manage board members with their permissions",
      component: <BoardMember />
    },
    {
      title: "Legal Advisors",
      icon: <Scale className="h-5 w-5 text-purple-600" />,
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
      <motion.div 
        className="pb-6 border-b border-gray-200 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-xl p-6 shadow-sm"
        variants={itemVariants}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Building2 className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Additional Information
            </h1>
            <p className="text-gray-600 text-lg">
              Manage additional company details including bank accounts, board members, and legal advisors
            </p>
          </div>
        </div>
      </motion.div>

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
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={itemVariants}
      >
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all duration-300 hover:border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CreditCard className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800">Financial Compliance</h3>
          </div>
          <p className="text-gray-600 text-sm">
            All bank accounts must be verified to ensure compliance with financial regulations and secure transactions.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all duration-300 hover:border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800">Board Governance</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Maintain proper board member records with appropriate permissions and documentation for regulatory compliance.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all duration-300 hover:border-purple-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Scale className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-800">Legal Requirements</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Keep legal advisor information up-to-date to ensure proper legal representation and compliance support.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Index
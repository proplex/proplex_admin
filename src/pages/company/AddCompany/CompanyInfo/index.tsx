import { motion } from 'framer-motion';
import FormGenerator from '@/components/UseForm/FormGenerator';
import formConfig from './formConfig';
import { Building2, FileText, MapPin, Phone, Mail, Briefcase } from 'lucide-react';

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
      title: "Company Information",
      icon: <Building2 className="h-5 w-5 text-blue-600" />,
      description: "Basic details about your company",
      fields: ['name', 'industry', 'instrument', 'incorporation_type']
    },
    {
      title: "Contact Information",
      icon: <Mail className="h-5 w-5 text-green-600" />,
      description: "Official contact details for your company",
      fields: ['email', 'pan_number', 'phone']
    },
    {
      title: "Location Information",
      icon: <MapPin className="h-5 w-5 text-amber-600" />,
      description: "Company address and location details",
      fields: ['address', 'city', 'state', 'pincode']
    },
    {
      title: "Document Upload",
      icon: <FileText className="h-5 w-5 text-purple-600" />,
      description: "Upload required company documents",
      fields: ['llp_agreement_copy', 'moa', 'aoi']
    }
  ];

  // Generate form fields
  const formFields = FormGenerator(formConfig());

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
              Company Information
            </h1>
            <p className="text-gray-600 text-lg">
              Enter the basic details about your company
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
                  className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200 cursor-pointer"
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
            <div className="bg-gray-50/50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formFields}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Information Cards */}

    </motion.div>
  );
};

export default Index;
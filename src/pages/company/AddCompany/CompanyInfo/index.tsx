import { motion } from 'framer-motion';
import FormGenerator from '@/components/UseForm/FormGenerator';
import formConfig from './formConfig';
import { Building2, FileText, MapPin, Mail, Briefcase } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

const Index = () => {
  const { watch } = useFormContext();
  
  // Watch for file uploads
  const certificateFile = watch('certificate_of_incorporation');
  const moaFile = watch('moa');
  const aoaFile = watch('aoa');

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

  

  // Generate all form fields
  const formConfigFields = formConfig();
  
  // Group fields by type
  const basicFields = FormGenerator(formConfigFields.slice(0, 4)); // name, industry, incorporation_type, jurisdiction
  const contactFields = FormGenerator(formConfigFields.slice(4, 7)); // email, phone, address
  const documentFields = FormGenerator(formConfigFields.slice(8)); // certificate, moa, aoa (skip SPV type)

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Basic Company Information */}
      <motion.div 
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        variants={itemVariants}
      >
        <div className="px-6 py-4 border-b border-gray-200 ">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-md">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Company Information</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {basicFields}
          </div>
        </div>
      </motion.div>

      {/* Contact Information */}
      <motion.div 
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        variants={itemVariants}
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-md">
              <Mail className="h-5 w-5 text-green-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Contact Information</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactFields}
          </div>
        </div>
      </motion.div>

      {/* Document Upload */}
      <motion.div 
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        variants={itemVariants}
      >
        <div className="px-6 py-4 border-b border-gray-200 ">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-md">
              <FileText className="h-5 w-5 text-purple-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Document Upload</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-6">
            {documentFields}
          </div>
        </div>
      </motion.div>

      {/* Document Previews */}
      {(certificateFile?.url || moaFile?.url || aoaFile?.url) && (
        <motion.div 
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          variants={itemVariants}
        >
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50/30 to-slate-50/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-md">
                <FileText className="h-5 w-5 text-gray-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Document Previews</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Only show preview if files are uploaded */}
              {certificateFile?.url && (
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-700 mb-2">Certificate of Incorporation</h3>
                  <div className="bg-gray-100 rounded p-2 text-center">
                    <FileText className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">{certificateFile.name}</p>
                    <a 
                      href={certificateFile.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      View Document
                    </a>
                  </div>
                </div>
              )}
              
              {moaFile?.url && (
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-700 mb-2">MOA Document</h3>
                  <div className="bg-gray-100 rounded p-2 text-center">
                    <FileText className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">{moaFile.name}</p>
                    <a 
                      href={moaFile.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      View Document
                    </a>
                  </div>
                </div>
              )}
              
              {aoaFile?.url && (
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-700 mb-2">AOA Document</h3>
                  <div className="bg-gray-100 rounded p-2 text-center">
                    <FileText className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">{aoaFile.name}</p>
                    <a 
                      href={aoaFile.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      View Document
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Index;
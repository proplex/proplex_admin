import { motion } from 'framer-motion';
import FormGenerator from '@/components/UseForm/FormGenerator';
import formConfig from './formConfig';
import { Building2, FileText, MapPin, Phone, Mail, Briefcase } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import PDFViewer from '@/components/PDFViewer';

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

  // Section configuration for better organization
  const sections = [
    {
      title: "Company Information",
      icon: <Building2 className="h-5 w-5 text-blue-600" />,
      description: "Basic details about your company",
      fields: ['name', 'industry', 'entity_type', 'incorporation_type', 'jurisdiction', 'incorporation_date', 'registration_number']
    },
    {
      title: "Ownership & Structure",
      icon: <Briefcase className="h-5 w-5 text-green-600" />,
      description: "Company ownership and structure details",
      fields: ['instrument_type', 'spv_type', 'parent_entity', 'ubo_details']
    },
    {
      title: "Contact Information",
      icon: <Mail className="h-5 w-5 text-green-600" />,
      description: "Official contact details for your company",
      fields: ['email', 'phone', 'address', 'street_address', 'city', 'state', 'country', 'postal_code']
    },
    {
      title: "Compliance & Regulatory",
      icon: <FileText className="h-5 w-5 text-amber-600" />,
      description: "Compliance and regulatory information",
      fields: ['tax_id', 'company_code', 'regulatory_authority']
    },
    {
      title: "Document Upload",
      icon: <FileText className="h-5 w-5 text-purple-600" />,
      description: "Upload required company documents",
      fields: ['certificate_of_incorporation', 'moa', 'aoa', 'shareholding_agreement', 'kyc_documents']
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

      {/* PDF Preview Section */}
      <motion.div 
        className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
        variants={itemVariants}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Document Previews</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certificateFile?.url && (
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-700 mb-2">Certificate of Incorporation</h3>
                {certificateFile.type === 'application/pdf' || certificateFile.name?.endsWith('.pdf') ? (
                  <PDFViewer 
                    fileUrl={certificateFile.url.startsWith('data:') ? certificateFile.url : `data:application/pdf;base64,${certificateFile.url}`} 
                    fileName={certificateFile.name} 
                  />
                ) : (
                  <div className="flex items-center justify-center h-64 bg-gray-100 rounded">
                    <img 
                      src={certificateFile.url.startsWith('data:') ? certificateFile.url : `data:${certificateFile.type};base64,${certificateFile.url}`} 
                      alt="Certificate Preview" 
                      className="max-h-60 object-contain"
                      onError={(e) => console.error('Error loading image:', e)}
                    />
                  </div>
                )}
              </div>
            )}
            
            {moaFile?.url && (
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-700 mb-2">MOA Document</h3>
                {moaFile.type === 'application/pdf' || moaFile.name?.endsWith('.pdf') ? (
                  <PDFViewer 
                    fileUrl={moaFile.url.startsWith('data:') ? moaFile.url : `data:application/pdf;base64,${moaFile.url}`} 
                    fileName={moaFile.name} 
                  />
                ) : (
                  <div className="flex items-center justify-center h-64 bg-gray-100 rounded">
                    <img 
                      src={moaFile.url.startsWith('data:') ? moaFile.url : `data:${moaFile.type};base64,${moaFile.url}`} 
                      alt="MOA Preview" 
                      className="max-h-60 object-contain"
                      onError={(e) => console.error('Error loading image:', e)}
                    />
                  </div>
                )}
              </div>
            )}
            
            {aoaFile?.url && (
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-700 mb-2">AOA Document</h3>
                {aoaFile.type === 'application/pdf' || aoaFile.name?.endsWith('.pdf') ? (
                  <PDFViewer 
                    fileUrl={aoaFile.url.startsWith('data:') ? aoaFile.url : `data:application/pdf;base64,${aoaFile.url}`} 
                    fileName={aoaFile.name} 
                  />
                ) : (
                  <div className="flex items-center justify-center h-64 bg-gray-100 rounded">
                    <img 
                      src={aoaFile.url.startsWith('data:') ? aoaFile.url : `data:${aoaFile.type};base64,${aoaFile.url}`} 
                      alt="AOA Preview" 
                      className="max-h-60 object-contain"
                      onError={(e) => console.error('Error loading image:', e)}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Index;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import FormGenerator from '@/components/UseForm/FormGenerator';
import formConfig from './formConfig';
import { 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Image, 
  FileText, 
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Shield,
  Star,
  Award
} from 'lucide-react';

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

const headerVariants = {
  initial: { opacity: 0, x: -30 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6 }
  }
};

const progressVariants = {
  initial: { scaleX: 0 },
  animate: { 
    scaleX: 1,
    transition: { duration: 0.8 }
  }
};

// Form Section Component
const FormSection = ({ 
  title, 
  description, 
  icon: Icon, 
  children, 
  isCompleted 
}: { 
  title: string; 
  description: string; 
  icon: any; 
  children: React.ReactNode;
  isCompleted: boolean;
}) => {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              isCompleted 
                ? 'bg-emerald-100 text-emerald-600' 
                : 'bg-blue-100 text-blue-600'
            }`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
          {isCompleted && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            </motion.div>
          )}
        </div>
        {children}
      </div>
    </motion.div>
  );
};

// Progress Indicator
const FormProgress = ({ completedFields, totalFields }: { completedFields: number; totalFields: number }) => {
  const progress = (completedFields / totalFields) * 100;
  
  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">Form Completion</span>
        </div>
        <span className="text-sm text-blue-600 font-semibold">
          {completedFields}/{totalFields} fields ({Math.round(progress)}%)
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
          variants={progressVariants}
          initial="initial"
          animate="animate"
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
};

// Stats Card Component
const StatsCard = ({ icon: Icon, label, value, trend }: { 
  icon: any; 
  label: string; 
  value: string | number; 
  trend?: 'up' | 'down' | 'neutral';
}) => {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <div className="text-lg font-bold text-gray-900">{value}</div>
          <div className="text-sm text-gray-600">{label}</div>
        </div>
        {trend === 'up' && (
          <TrendingUp className="w-4 h-4 text-emerald-500" />
        )}
      </div>
    </motion.div>
  );
};  


const AssetHostedBy = () => {
  const { watch } = useFormContext();
  const [completedFields, setCompletedFields] = useState(0);
  const [totalFields] = useState(11); // Total number of form fields
  
  // Watch form values to track completion
  const formValues = watch('hostedBy') || {};
  
  useEffect(() => {
    const requiredFields = ['name', 'email', 'phone'];
    const optionalFields = ['address', 'totalProjects', 'onGoingProjects', 'whatsappNumber', 'primeLocation', 'logoURL', 'website', 'about'];
    
    let completed = 0;
    requiredFields.forEach(field => {
      if (formValues[field]?.trim()) completed++;
    });
    optionalFields.forEach(field => {
      if (formValues[field]) completed++;
    });
    
    setCompletedFields(completed);
  }, [formValues]);
  
  // Check if sections are completed
  const isBasicInfoCompleted = !!(formValues.name && formValues.email && formValues.phone);
  const isContactInfoCompleted = !!(formValues.address && formValues.whatsappNumber);
  const isProjectInfoCompleted = !!(formValues.totalProjects && formValues.onGoingProjects);
  const isBrandingCompleted = !!(formValues.logoURL && formValues.website);
  
  const formFields = formConfig();
  
  // Group form fields by category
  const basicInfoFields = formFields.filter(field => 
    field.name && ['hostedBy.name', 'hostedBy.email', 'hostedBy.phone'].includes(field.name)
  );
  
  const contactFields = formFields.filter(field => 
    field.name && ['hostedBy.address', 'hostedBy.whatsappNumber', 'hostedBy.primeLocation'].includes(field.name)
  );
  
  const projectFields = formFields.filter(field => 
    field.name && ['hostedBy.totalProjects', 'hostedBy.onGoingProjects'].includes(field.name)
  );
  
  const brandingFields = formFields.filter(field => 
    field.name && ['hostedBy.logoURL', 'hostedBy.website', 'hostedBy.about'].includes(field.name)
  );
  
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Enhanced Header */}
      <motion.div
        variants={headerVariants}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Building2 className="w-7 h-7 text-white" />
            </motion.div>
            <div>
              <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1'>
                Asset Hosting Information
              </h1>
              <p className="text-gray-600 text-sm font-medium">
                Configure the hosting and management details for your asset
              </p>
            </div>
          </div>
          
          <motion.div
            className="text-right"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-2xl font-bold text-blue-600">
              {Math.round((completedFields / totalFields) * 100)}%
            </div>
            <div className="text-xs text-gray-500 font-medium">Complete</div>
          </motion.div>
        </div>
        
        <FormProgress completedFields={completedFields} totalFields={totalFields} />
      </motion.div>
      
      {/* Quick Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, staggerChildren: 0.1 }}
      >
        <StatsCard
          icon={User}
          label="Basic Info"
          value={isBasicInfoCompleted ? 'Complete' : 'Pending'}
          trend={isBasicInfoCompleted ? 'up' : 'neutral'}
        />
        <StatsCard
          icon={MapPin}
          label="Contact Info"
          value={isContactInfoCompleted ? 'Complete' : 'Pending'}
          trend={isContactInfoCompleted ? 'up' : 'neutral'}
        />
        <StatsCard
          icon={TrendingUp}
          label="Projects"
          value={formValues.totalProjects || '0'}
        />
        <StatsCard
          icon={Globe}
          label="Website"
          value={formValues.website ? 'Added' : 'Not Set'}
        />
      </motion.div>

      {/* Form Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <FormSection
          title="Basic Information"
          description="Essential hosting details"
          icon={User}
          isCompleted={isBasicInfoCompleted}
        >
          <div className="space-y-4">
            {FormGenerator(basicInfoFields)}
          </div>
        </FormSection>
        
        {/* Contact Information */}
        <FormSection
          title="Contact Details"
          description="Location and communication"
          icon={Phone}
          isCompleted={isContactInfoCompleted}
        >
          <div className="space-y-4">
            {FormGenerator(contactFields)}
          </div>
        </FormSection>
        
        {/* Project Information */}
        <FormSection
          title="Project Portfolio"
          description="Track record and experience"
          icon={TrendingUp}
          isCompleted={isProjectInfoCompleted}
        >
          <div className="space-y-4">
            {FormGenerator(projectFields)}
          </div>
        </FormSection>
        
        {/* Branding & Profile */}
        <FormSection
          title="Branding & Profile"
          description="Logo, website, and description"
          icon={Star}
          isCompleted={isBrandingCompleted}
        >
          <div className="space-y-4">
            {FormGenerator(brandingFields)}
          </div>
        </FormSection>
      </div>
      
      {/* Completion Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 border border-emerald-200"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-100 rounded-xl">
            <Shield className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">
              Hosting Configuration Status
            </h3>
            <p className="text-gray-600 text-sm">
              {completedFields === totalFields 
                ? 'All hosting information has been configured successfully.' 
                : `Complete ${totalFields - completedFields} more fields to finish setup.`
              }
            </p>
          </div>
          {completedFields === totalFields && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
            >
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AssetHostedBy

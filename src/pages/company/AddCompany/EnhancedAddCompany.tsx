import React, { lazy, Suspense, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, CheckCircle2, Loader2, Building, FileText, Shield, Banknote, Users, Scale, Info } from 'lucide-react';
import useCreateCompany from '@/hooks/useCreateCompany';
import useFetchCompany from '@/hooks/useFetchCompany';
import useUpdateCompany from '@/hooks/useUpdateCompany';
import toast from 'react-hot-toast';

// Lazy load components with proper default export handling
const CompanyInfo = lazy(() => import('./CompanyInfo').then(module => ({ default: module.default })));
const SpvMemo = lazy(() => import('./SpvMemo').then(module => ({ default: module.default })));
const BankDetails = lazy(() => import('./BankDetails').then(module => ({ default: module.default })));
const RoyaltyDistribution = lazy(() => import('./RoyaltyDistribution').then(module => ({ default: module.default })));
const RiskAndDisclosures = lazy(() => import('./RiskAndDisclosures').then(module => ({ default: module.default })));
const BoardMember = lazy(() => import('./BoardMember').then(module => ({ default: module.default })));
const LegalAdvisor = lazy(() => import('./LegalAdvisors').then(module => ({ default: module.default })));
const AdditionalInfo = lazy(() => import('./AdditionalInfo').then(module => ({ default: module.default })));

const steps = [
  { id: 'company-info', title: 'Company hiii Information', icon: Building },
  { id: 'spv-memo', title: 'SPV Memo', icon: FileText },
  { id: 'bank-details', title: 'Bank Details', icon: Banknote },
  { id: 'royalty-distributions', title: 'Royalty Distributions', icon: Banknote },
  { id: 'risk-disclosure', title: 'Risk & Disclosure', icon: Shield },
  { id: 'board-member', title: 'Board Members', icon: Users },
  { id: 'legal-advisors', title: 'Legal Advisors', icon: Scale },
  { id: 'additional-info', title: 'Additional Info', icon: Info },
];

// Animation variants
const pageVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { 
    opacity: 1, 
    scale: 1
  },
  exit: { 
    opacity: 0, 
    scale: 0.98
  }
};

const sidebarVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { 
    opacity: 1, 
    x: 0
  }
};

const stepIconVariants = {
  initial: { scale: 0, opacity: 0, rotate: -180 },
  animate: { 
    scale: 1, 
    opacity: 1, 
    rotate: 0
  },
  hover: { scale: 1.1, rotate: 5 },
  active: { scale: 1.2, rotate: 0 }
};

const formVariants = {
  initial: { opacity: 0, y: 40, scale: 0.96 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1
  }
};

const buttonVariants = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0
  },
  hover: { 
    scale: 1.05,
    y: -2
  },
  tap: { 
    scale: 0.95
  }
};

const EnhancedAddCompany = () => {
  const { id = null } = useParams();
  const navigate = useNavigate();
  const methods = useForm();
  const { loading: fetchLoading } = useFetchCompany(id, methods.reset);
  const { createCompany, loading: createLoading } = useCreateCompany();
  const { updateCompany } = useUpdateCompany();
  const [currentStep, setCurrentStep] = useState(steps[0].id);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const disabledSteps = !id ? [
    'spv-memo',
    'bank-details',
    'risk-disclosure',
    'board-member',
    'legal-advisors',
  ] : [];

  const renderStepContent = () => {
    const StepComponent = {
      'company-info': CompanyInfo,
      'spv-memo': SpvMemo,
      'bank-details': BankDetails,
      'royalty-distributions': RoyaltyDistribution,
      'risk-disclosure': RiskAndDisclosures,
      'board-member': BoardMember,
      'legal-advisors': LegalAdvisor,
      'additional-info': AdditionalInfo,
    }[currentStep];

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={formVariants}
          className="h-full"
        >
          <Suspense fallback={
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
                <p className="text-gray-600">Loading form...</p>
              </div>
            </div>
          }>
            {StepComponent && <StepComponent />}
          </Suspense>
        </motion.div>
      </AnimatePresence>
    );
  };

  const nextStep = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const handleBack = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  const changeStep = (stepId: string) => {
    setCurrentStep(stepId);
  };

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    console.log("data is here paylaod data :",data);
    setIsSubmitting(true);
    try {
      const { llp_agreement_copy_file, ...rest } = data;
      const payload = {
        ...rest,
        llp_agreement_copy: llp_agreement_copy_file,
      };
      console.log("payload is here :",payload);

      if (!id) {
        await createCompany(payload);
        toast.success('Company created successfully!');
      } else {
        await updateCompany(id, payload);
        toast.success('Company updated successfully!');
      }
      
      if (currentStep === steps[steps.length - 1].id) {
        navigate('/company');
      } else {
        nextStep();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen p-4 sm:p-6 md:p-8"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Icon-Based Sidebar */}
          <motion.div 
            className="lg:w-32 flex-shrink-0 bg-white border border-gray-200 rounded-xl shadow-sm p-4 lg:sticky lg:top-6 lg:h-fit"
            variants={sidebarVariants}
          >
            {/* Header Icon */}
            <motion.div 
              className="flex lg:flex-col items-center lg:items-center justify-center lg:justify-start mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
                <Building className="w-5 h-5 text-white" />
              </div>
              <div className="hidden lg:block mt-3 text-center">
                <div className="text-xs font-bold text-gray-800">
                  {id ? 'UPDATE' : 'CREATE'}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  COMPANY
                </div>
              </div>
            </motion.div>
            
            {/* Step Icons */}
            <div className="flex lg:flex-col gap-3 lg:gap-4 pb-2 lg:pb-0">
              {steps.map((step, index) => {
                const Icon = step.icon || Building;
                const isActive = step.id === currentStep;
                const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
                const isDisabled = disabledSteps.includes(step.id);
                
                return (
                  <div key={step.id} className="relative flex flex-col lg:flex-col items-center">
                    {/* Connecting Line - Only for desktop vertical layout */}
                    {index < steps.length - 1 && (
                      <motion.div 
                        className="hidden lg:block absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-gray-200 to-gray-300 z-0"
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ scaleY: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
                      >
                        {isCompleted && (
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: (index * 0.1) + 0.2 }}
                          />
                        )}
                      </motion.div>
                    )}

                    {/* Step Icon Button */}
                    <motion.button
                      type="button"
                      className={`relative group flex-shrink-0 ${
                        isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
                      }`}
                      variants={stepIconVariants}
                      whileHover={!isDisabled ? "hover" : undefined}
                      animate={isActive ? "active" : "animate"}
                      onClick={() => !isDisabled && changeStep(step.id)}
                      disabled={isDisabled}
                      title={step.title}
                    >
                      {/* Icon Container */}
                      <div className={`
                        relative w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all duration-300 flex-shrink-0
                        ${
                          isActive 
                            ? 'bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-600 shadow-md scale-110 text-white' 
                            : isCompleted 
                              ? 'bg-green-100 border-green-300 shadow-md text-green-600' 
                              : isDisabled
                                ? 'bg-gray-100 border-gray-200 opacity-50 text-gray-400'
                                : 'bg-white border-gray-200 group-hover:border-blue-300 group-hover:shadow-md group-hover:scale-105 text-gray-500 group-hover:text-blue-600'
                        }
                      `}>
                        <Icon className={`w-4 h-4 transition-colors duration-300`} />
                        
                        {/* Completion Checkmark */}
                        {isCompleted && !isActive && (
                          <motion.div 
                            className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center border-2 border-white"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 500, damping: 25 }}
                          >
                            <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                          </motion.div>
                        )}
                        
                        {/* Step Number Badge */}
                        {!isCompleted && (
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white ${
                            isActive 
                              ? 'bg-white text-blue-600' 
                              : isDisabled 
                                ? 'bg-gray-100 text-gray-400' 
                                : 'bg-gray-100 text-gray-500'
                          }`}>
                            {index + 1}
                          </div>
                        )}
                      </div>
                    </motion.button>
                    
                    {/* Step Title for Mobile */}
                    <div className="lg:hidden ml-2 text-xs font-medium text-gray-700 whitespace-nowrap">
                      {step.title}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Compact Progress Indicator */}
            <motion.div 
              className="mt-4 lg:mt-6 p-3 bg-white border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-center mb-2">
                <div className="text-xs font-bold text-gray-800">
                  {Math.round(((steps.findIndex(step => step.id === currentStep) + 1) / steps.length) * 100)}%
                </div>
                <div className="text-xs text-gray-500">
                  Complete
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: `${((steps.findIndex(step => step.id === currentStep) + 1) / steps.length) * 100}%` 
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
              <div className="mt-2 text-xs text-gray-500 text-center">
                {steps.findIndex(step => step.id === currentStep) + 1}/{steps.length} Steps
              </div>
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <FormProvider {...methods}>
              <motion.form
                className="bg-white border border-gray-200 rounded-xl shadow-sm"
                onSubmit={methods.handleSubmit(onSubmit)}
                variants={formVariants}
              >
                {/* Content Header with Mobile Step Indicator */}
                <div className="border-b border-gray-200 p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                        {steps.find(s => s.id === currentStep)?.title || 'Company Information'}
                      </h2>
                      <p className="text-gray-600 mt-1">
                        Step {steps.findIndex(step => step.id === currentStep) + 1} of {steps.length}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {/* Mobile Progress Ring */}
                      <div className="relative w-12 h-12 lg:hidden">
                        <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
                          <circle
                            cx="24"
                            cy="24"
                            r="20"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="none"
                            className="text-gray-200"
                          />
                          <motion.circle
                            cx="24"
                            cy="24"
                            r="20"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                            className="text-blue-500"
                            initial={{ pathLength: 0 }}
                            animate={{ 
                              pathLength: (steps.findIndex(step => step.id === currentStep) + 1) / steps.length 
                            }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            style={{
                              strokeDasharray: "0 1",
                            }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-bold text-gray-700">
                            {Math.round(((steps.findIndex(step => step.id === currentStep) + 1) / steps.length) * 100)}%
                          </span>
                        </div>
                      </div>
                      
                      {/* Current Step Icon */}
                      <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
                        {React.createElement(steps.find(s => s.id === currentStep)?.icon || Building, {
                          className: "w-5 h-5 text-gray-700"
                        })}
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile Horizontal Step Indicator */}
                  <div className="lg:hidden flex items-center gap-2 pb-2 mt-4">
                    {steps.map((step, index) => {
                      const isActive = step.id === currentStep;
                      const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
                      const isDisabled = disabledSteps.includes(step.id);
                      
                      return (
                        <button
                          key={step.id}
                          type="button"
                          onClick={() => !isDisabled && changeStep(step.id)}
                          disabled={isDisabled}
                          className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1 ${
                            isActive
                              ? 'bg-blue-100 text-blue-700 border border-blue-200'
                              : isCompleted
                                ? 'bg-green-100 text-green-700 border border-green-200'
                                : isDisabled
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          <span className="flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold bg-white">
                            {index + 1}
                          </span>
                          <span className="truncate max-w-[80px]">{step.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                {/* Form Content */}
                <div className="p-6 sm:p-8 min-h-[600px]">
                  {renderStepContent()}
                </div>
                
                {/* Action Buttons */}
                <motion.div 
                  className="border-t border-gray-200 p-6 sm:p-8"
                  variants={buttonVariants}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <motion.div
                      whileHover={{ x: -2 }}
                      whileTap={{ x: -5 }}
                    >
                      <Button
                        type="button"
                        variant="outline"
                        className="flex items-center gap-2 border-gray-300 bg-white hover:bg-gray-50 px-4 sm:px-6 py-2 sm:py-3 w-full sm:w-auto shadow-sm"
                        onClick={handleBack}
                        disabled={currentStep === steps[0].id}
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Previous
                      </Button>
                    </motion.div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                      <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span>
                          {currentStep === steps[steps.length - 1].id 
                            ? 'Ready to submit' 
                            : 'Continue to next step'
                          }
                        </span>
                      </div>
                      
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          type="submit" 
                          className="relative overflow-hidden px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 w-full sm:w-auto shadow-md hover:shadow-lg transition-shadow"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : currentStep === steps[steps.length - 1].id ? (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              {id ? 'Update' : 'Create'} Company
                            </>
                          ) : (
                            <>
                              Save & Continue
                              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.form>
            </FormProvider>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EnhancedAddCompany;
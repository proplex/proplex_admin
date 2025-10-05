import React, { lazy, Suspense, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, ArrowRight, CheckCircle2, Loader2, Building, FileText, Banknote, Users, Sparkles } from 'lucide-react';
import useCreateCompany, { CompanyData } from '@/hooks/useCreateCompany';
import useFetchCompany from '@/hooks/useFetchCompany';
import useUpdateCompany from '@/hooks/useUpdateCompany';
import toast from 'react-hot-toast';

// Lazy load components
const CompanyInfo = lazy(() => import('./CompanyInfo'));
const SpvMemoRisk = lazy(() => import('./SpvMemoRisk'));
const RoyaltyDistribution = lazy(() => import('./RoyaltyDistribution'));
const BoardLegal = lazy(() => import('./BoardLegal'));
const PrivacyTerms = lazy(() => import('./PrivacyTerms'));

// Types
interface Step {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
}

interface FormData extends Omit<CompanyData, 'llp_agreement_copy'> {
  llp_agreement_copy_file?: File;
  [key: string]: any;
}

// Steps configuration
const steps: Step[] = [
  { id: 'company-info', title: 'Company Information', subtitle: 'Basic details', icon: Building },
  { id: 'spv-memo-risk', title: 'SPV Memo & Risk', subtitle: 'Documentation', icon: FileText },
  { id: 'royalty-distributions', title: 'Royalty', subtitle: 'Distributions', icon: Banknote },
  { id: 'board-legal', title: 'Board & Legal', subtitle: 'Governance', icon: Users },
  { id: 'privacy-terms', title: 'Privacy & Terms', subtitle: 'Compliance', icon: FileText },
];

// Enhanced animation variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 }
  }
};

const formVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { 
    opacity: 1,
    x: 0,
    transition: { 
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: { 
    opacity: 0,
    x: -20,
    transition: { duration: 0.3 }
  }
};

const buttonVariants = {
  hover: { 
    scale: 1.02,
    y: -1,
    transition: { duration: 0.2 }
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

const EnhancedAddCompany = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const methods = useForm<FormData>();
  const { loading: fetchLoading } = useFetchCompany(id || '', methods.reset);
  const { createCompany } = useCreateCompany();
  const { updateCompany } = useUpdateCompany();
  const [currentStep, setCurrentStep] = useState<string>(steps[0].id);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const disabledSteps = !id ? ['spv-memo-risk', 'board-legal', 'privacy-terms'] : [];

  const renderStepContent = () => {
    const StepComponent = {
      'company-info': CompanyInfo,
      'spv-memo-risk': SpvMemoRisk,
      'royalty-distributions': RoyaltyDistribution,
      'board-legal': BoardLegal,
      'privacy-terms': PrivacyTerms,
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
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-indigo-600 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
              </div>
              <p className="text-sm text-gray-600 font-medium">Loading content...</p>
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const changeStep = (stepId: string) => {
    setCurrentStep(stepId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      if (!data.name || !data.jurisdiction) {
        throw new Error('Company name and jurisdiction are required');
      }

      const { llp_agreement_copy_file, ...rest } = data;
      const payload: CompanyData = {
        ...rest,
        ...(llp_agreement_copy_file && { llp_agreement_copy: llp_agreement_copy_file })
      } as CompanyData;

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
      console.error('Form submission error:', err);
      const errorMessage = err.response?.data?.message || 'An error occurred while saving the company';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-indigo-600 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
        <p className="mt-6 text-gray-600 font-medium">Loading company data...</p>
      </div>
    );
  }

  const currentIndex = steps.findIndex(step => step.id === currentStep);
  const progress = ((currentIndex + 1) / steps.length) * 100;

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Progress Bar */}
        <motion.div 
          className="mb-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700">Progress</span>
            <span className="text-sm font-bold text-blue-600">{Math.round(progress)}%</span>
          </div>
          <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-pulse"></div>
            </motion.div>
          </div>
          
          {/* Step Indicators */}
          <div className="flex items-center justify-between mt-6 gap-2">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = currentIndex > index;
              const isDisabled = disabledSteps.includes(step.id);
              
              return (
                <motion.button
                  key={step.id}
                  type="button"
                  onClick={() => !isDisabled && changeStep(step.id)}
                  disabled={isDisabled}
                  className={`flex-1 group relative ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  whileHover={!isDisabled ? { scale: 1.05 } : {}}
                  whileTap={!isDisabled ? { scale: 0.95 } : {}}
                >
                  <div className={`relative z-10 flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30' 
                      : isCompleted 
                        ? 'bg-green-50 hover:bg-green-100' 
                        : isDisabled
                          ? 'bg-gray-50 opacity-50'
                          : 'bg-gray-50 hover:bg-gray-100'
                  }`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive 
                        ? 'bg-white/20 backdrop-blur-sm' 
                        : isCompleted 
                          ? 'bg-green-100' 
                          : 'bg-white'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle2 className={`w-5 h-5 ${isActive ? 'text-white' : 'text-green-600'}`} />
                      ) : (
                        <Icon className={`w-5 h-5 ${
                          isActive ? 'text-white' : isDisabled ? 'text-gray-400' : 'text-gray-600'
                        }`} />
                      )}
                    </div>
                    <span className={`text-xs font-medium text-center hidden sm:block ${
                      isActive ? 'text-white' : isCompleted ? 'text-green-700' : 'text-gray-600'
                    }`}>
                      {step.title.split(' ')[0]}
                    </span>
                  </div>
                  
                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className={`hidden sm:block absolute top-1/4 left-[60%] right-[-40%] h-0.5 transition-all duration-300 ${
                      isCompleted ? 'bg-gradient-to-r from-green-400 to-blue-400' : 'bg-gray-200'
                    }`} />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Main Form */}
        <FormProvider {...methods}>
          <motion.form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Form Header */}
            <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 px-6 sm:px-8 py-6">
              <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                    {React.createElement(steps[currentIndex].icon, {
                      className: "w-6 h-6 text-white"
                    })}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {steps[currentIndex].title}
                    </h2>
                    <p className="text-blue-100 text-sm mt-0.5">
                      {steps[currentIndex].subtitle}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-medium">
                    {currentIndex + 1}/{steps.length}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Form Content */}
            <div className="p-6 sm:p-8 min-h-[600px]">
              {renderStepContent()}
            </div>
            
            {/* Action Buttons */}
            <div className="border-t border-gray-200 bg-gray-50/50 px-6 sm:px-8 py-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 font-medium rounded-xl"
                    onClick={handleBack}
                    disabled={currentStep === steps[0].id}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </Button>
                </motion.div>
                
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  {currentStep !== steps[steps.length - 1].id && (
                    <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                      <span className="text-sm text-blue-700 font-medium">
                        Continue to {steps[currentIndex + 1]?.title.split(' ')[0]}
                      </span>
                    </div>
                  )}
                  
                  <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                    <Button 
                      type="submit" 
                      className="relative w-full sm:w-auto overflow-hidden px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold rounded-xl group"
                      disabled={isSubmitting}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : currentStep === steps[steps.length - 1].id ? (
                        <>
                          <Save className="w-5 h-5 mr-2" />
                          {id ? 'Update' : 'Create'} Company
                        </>
                      ) : (
                        <>
                          Save & Continue
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.form>
        </FormProvider>
      </div>
    </motion.div>
  );
};

export default EnhancedAddCompany;
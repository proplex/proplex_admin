import { lazy, Suspense, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, CheckCircle2, Loader2, Building, FileText, Shield, Banknote, Users, Scale, Info } from 'lucide-react';
import useCreateCompany from '@/hooks/useCreateCompany';
import useFetchCompany from '@/hooks/useFetchCompany';
import useUpdateCompany from '@/hooks/useUpdateCompany';
import toast from 'react-hot-toast';

// Lazy load components
const CompanyInfo = lazy(() => import('./CompanyInfo'));
const SpvMemo = lazy(() => import('./SpvMemo'));
const BankDetails = lazy(() => import('./BankDetails'));
const RoyaltyDistribution = lazy(() => import('./RoyaltyDistribution'));
const RiskAndDisclosures = lazy(() => import('./RiskAndDisclosures'));
const BoardMember = lazy(() => import('./BoardMember'));
const LegalAdvisor = lazy(() => import('./LegalAdvisors'));
const AdditionalInfo = lazy(() => import('./AdditionalInfo'));

const steps = [
  { id: 'company-info', title: 'Company Info', icon: Building },
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
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.98,
    transition: { duration: 0.4 }
  }
};

const sidebarVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1
    }
  }
};

const stepIconVariants = {
  initial: { scale: 0, opacity: 0, rotate: -180 },
  animate: { 
    scale: 1, 
    opacity: 1, 
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  hover: { scale: 1.1, rotate: 5, transition: { duration: 0.2 } },
  active: { scale: 1.2, rotate: 0, transition: { duration: 0.3, ease: "backOut" } }
};

const formVariants = {
  initial: { opacity: 0, y: 40, scale: 0.96 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.2
    }
  }
};

const buttonVariants = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  hover: { 
    scale: 1.05,
    y: -2,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  tap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
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
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
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
    setIsSubmitting(true);
    try {
      const { llp_agreement_copy_file, ...rest } = data;
      const payload = {
        ...rest,
        llp_agreement_copy: llp_agreement_copy_file,
      };

      if (!id) {
        await createCompany(payload);
        toast.success('Company created successfully!');
      } else {
        await updateCompany(id, payload);
        toast.success('Company updated successfully!');
      }
      
      if (currentStep === steps[steps.length - 1].id) {
        navigate('/companies');
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
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 md:p-8"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.div 
            className="lg:w-64 flex-shrink-0"
            variants={sidebarVariants}
          >
            <motion.h1 
              className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {id ? 'Update' : 'Create'} Company
            </motion.h1>
            
            <div className="relative">
              {steps.map((step, index) => {
                const Icon = step.icon || Building;
                const isActive = step.id === currentStep;
                const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
                const isDisabled = disabledSteps.includes(step.id);
                
                return (
                  <div key={step.id} className="relative flex flex-col items-center">
                    {index < steps.length - 1 && (
                      <motion.div 
                        className="absolute top-16 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-blue-200 to-gray-200"
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ scaleY: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {isCompleted && (
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-b from-blue-500 to-indigo-600"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
                          />
                        )}
                      </motion.div>
                    )}

                    <motion.button
                      type="button"
                      className={`relative mb-4 group ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                      variants={stepIconVariants}
                      whileHover={!isDisabled ? "hover" : undefined}
                      animate={isActive ? "active" : "animate"}
                      onClick={() => !isDisabled && changeStep(step.id)}
                      disabled={isDisabled}
                    >
                      {isActive && (
                        <motion.div 
                          className="absolute inset-0 rounded-full bg-blue-400 opacity-20"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.2, 0.4, 0.2]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      )}
                      
                      <div className={`
                        relative w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300
                        ${isActive 
                          ? 'bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-400 shadow-lg shadow-blue-500/30' 
                          : isCompleted 
                            ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-400 shadow-lg shadow-green-500/20' 
                            : 'bg-white border-gray-200 hover:border-blue-200'}
                        ${isDisabled ? 'opacity-50' : ''}
                      `}>
                        <Icon className={`w-6 h-6 ${
                          isActive || isCompleted ? 'text-white' : 'text-gray-400'
                        }`} />
                      </div>
                      
                      <div className={`text-sm font-medium mt-2 text-center ${
                        isActive ? 'text-blue-600 font-semibold' : 'text-gray-600'
                      }`}>
                        {step.title}
                      </div>
                    </motion.button>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            <FormProvider {...methods}>
              <motion.form
                className="h-full flex flex-col bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden"
                onSubmit={methods.handleSubmit(onSubmit)}
                variants={formVariants}
              >
                <div className="flex-1 p-6 overflow-y-auto">
                  {renderStepContent()}
                </div>
                
                <motion.div 
                  className="border-t border-gray-100 p-6 bg-white/50 backdrop-blur-sm"
                  variants={buttonVariants}
                >
                  <div className="flex justify-between items-center">
                    <motion.div
                      whileHover={{ x: -2 }}
                      whileTap={{ x: -5 }}
                    >
                      <Button
                        type="button"
                        variant="outline"
                        className="flex items-center gap-2 border-gray-200 bg-white hover:bg-gray-50"
                        onClick={handleBack}
                        disabled={currentStep === steps[0].id}
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </Button>
                    </motion.div>
                    
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">
                        Step {steps.findIndex(step => step.id === currentStep) + 1} of {steps.length}
                      </span>
                      
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          type="submit" 
                          className="relative overflow-hidden"
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
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              Save & Continue
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

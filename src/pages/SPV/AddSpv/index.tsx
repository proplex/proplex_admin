import { lazy, Suspense, useEffect, useMemo, useState, Component, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/Loading";
import { SPV_TABS } from "@/constants/global";
import queryString from "query-string";
import { useSpvApi } from "@/hooks/spv/useSpvApi";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  ArrowRight, 
  Save, 
  Loader2,
  FileText,
  FileCheck2,
  FileSignature,
  Users,
  FileSpreadsheet,
  FileCode2,
  Building2,
  File,
  Banknote,
  Files,
  Layers
} from "lucide-react";


// Lazy load components for better performance
const BasicInformation = lazy(() => import("./BasicInformation"));
const Memo = lazy(() => import("./Memo"));
const Escrow = lazy(() => import("./Escrow"));
const LegalDocuments = lazy(() => import("./LegalDocuments"));
const BoardMembers = lazy(() => import("./BoardMembers"));
const DAOCreation = lazy(() => import("./DAO"));

// Error Boundary Component
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error in SPV component:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600">Please refresh the page or try again later.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4
    }
  }
};

// Step Icons
const STEP_ICONS: Record<string, string> = {
  'basic-information': '🏢',
  'memo-terms': '📝',
  'escrow-bank-details': '💳',
  'legal-documents': '📄',
  'board-members': '👥',
  'dao-integration': '🔄'
};

// Enhanced Loading Component
const EnhancedLoading = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-center space-y-4">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="text-gray-600">Loading SPV data...</p>
    </div>
  </div>
);

// Step Indicator Component
const StepIndicator = ({ 
  steps, 
  currentStep, 
  onStepClick,
  completedSteps = []
}: {
  steps: Array<{ id: string; title: string; icon?: React.ReactNode }>;
  currentStep: string;
  onStepClick: (stepId: string) => void;
  completedSteps: string[];
}) => {
  const currentIndex = steps.findIndex(step => step.id === currentStep);
  
  return (
    <div className="w-full max-w-xs space-y-2">
      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(step.id);
        const isActive = step.id === currentStep;
        const status = isActive 
          ? 'active' 
          : isCompleted 
            ? 'completed' 
            : 'pending';
        
        const Icon = step.icon || <span>{index + 1}</span>;
            
        return (
          <button
            key={step.id}
            onClick={() => onStepClick(step.id)}
            className={cn(
              "w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left",
              isActive 
                ? "bg-blue-50 text-blue-700 font-medium" 
                : "hover:bg-gray-50 text-gray-600"
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
              isActive 
                ? "bg-blue-100 text-blue-700" 
                : isCompleted 
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-500"
            )}>
              {isCompleted ? '✓' : step.icon || <span>{index + 1}</span>}
            </div>
            <div>
              <div className="text-sm font-medium">{step.title}</div>
              <div className="text-xs text-gray-400">
                {status === 'active' ? 'In progress' : status}
              </div>
            </div>
            {isActive && (
              <div className="ml-auto w-2 h-2 rounded-full bg-blue-500"></div>
            )}
          </button>
        );
      })}
    </div>
  );
};

function Index() {
  const { getSpv, createSpv, updateSpv, spv } = useSpvApi();
  const { id = null } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const controls = useAnimation();
  
  const methods = useForm({
    values: spv,
  });

  const { watch, handleSubmit } = methods;
  const { isDirty } = methods.formState;
  const completedSteps = watch("completedSteps") || [];

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      getSpv(id).finally(() => setIsLoading(false));
    }
  }, [id]);

  const step = (queryParams["step"] as string) || "basic-information";
  const tab: string = Array.isArray(queryParams["tab"])
    ? queryParams["tab"][0] || "basic-information"
    : queryParams["tab"] || "basic-information";

  const renderStepContent = useMemo(() => {
    const steps = {
      "basic-information": <BasicInformation />,
      "memo-terms": <Memo />,
      "escrow-bank-details": <Escrow />,
      "legal-documents": <LegalDocuments />,
      "board-members": <BoardMembers />,
      "dao-integration": <DAOCreation />
    };

    return (
      <ErrorBoundary>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <Suspense fallback={<EnhancedLoading />}>
              {steps[step as keyof typeof steps] || <div>Step not found</div>}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </ErrorBoundary>
    );
  }, [step, tab]);

  const handleStepChange = (stepId: string) => {
    const params = new URLSearchParams(location.search);
    params.set('step', stepId);
    navigate({ search: params.toString() }, { replace: true });
  };

  const handleNext = async () => {
    const currentIndex = SPV_TABS.findIndex((tab: { id: string }) => tab.id === step);
    if (currentIndex < SPV_TABS.length - 1) {
      const nextStep = SPV_TABS[currentIndex + 1].id;
      
      // Mark current step as completed
      if (!completedSteps.includes(step)) {
        methods.setValue('completedSteps', [...completedSteps, step]);
      }
      
      handleStepChange(nextStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    const currentIndex = SPV_TABS.findIndex((tab: { id: string }) => tab.id === step);
    if (currentIndex > 0) {
      navigate(`/edit-spv/${id}?step=${SPV_TABS[currentIndex - 1].id}`);
    }
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      setIsSubmitting(true);
      
      await controls.start({
        opacity: [1, 0.8, 1],
        scale: [1, 0.99, 1],
        transition: { duration: 0.3 }
      });
      
      if (id) {
        // Update existing SPV
        const updatedData = { 
          ...data,
          completedSteps: completedSteps.includes(step as string)
            ? completedSteps
            : [...completedSteps, step]
        };
        await updateSpv(id as string, updatedData);
        
        toast.success('SPV updated successfully', {
          description: 'Your changes have been saved.',
          position: 'top-center' as const
        });
      } else {
        // Create new SPV
        const newSpv = await createSpv({
          ...data,
          completedSteps: [step]
        });
        
        toast.success('SPV created successfully', {
          description: 'The new SPV has been added to your portfolio.',
          position: 'top-center' as const
        });
        
        // Redirect to edit page with the new ID
        navigate(`/edit-spv/${newSpv.id}?step=${step}`);
        return;
      }
      
      // Move to next step if not the last step
      const currentIndex = SPV_TABS.findIndex((tab: { id: string }) => tab.id === step);
      if (currentIndex < SPV_TABS.length - 1) {
        const nextStep = SPV_TABS[currentIndex + 1].id;
        handleStepChange(nextStep);
      }
      
    } catch (error: any) {
      console.error('Error saving SPV:', error);
      toast.error(`Failed to ${id ? 'update' : 'create'} SPV`, {
        description: error?.message || 'Please try again.',
        position: 'top-center' as const
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <EnhancedLoading />;
  }

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
        <motion.div
          className="max-w-7xl mx-auto"
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <motion.div
              className="w-full lg:w-80 flex-shrink-0"
              variants={itemVariants}
            >
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
                <h3 className="font-medium text-gray-900 mb-4">Setup Steps</h3>
                <StepIndicator
                  steps={SPV_TABS}
                  currentStep={step}
                  onStepClick={handleStepChange}
                  completedSteps={completedSteps}
                />
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              className="flex-1"
              variants={itemVariants}
            >
              <FormProvider {...methods}>
                <form 
                  onSubmit={methods.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Step Header */}
                    <div className="border-b border-gray-200 p-6">
                      <motion.div
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-xl">
                          {STEP_ICONS[step as string] || '📄'}
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900">
                            {SPV_TABS.find(tab => tab.id === step)?.title || 'Step'}
                          </h2>
                          <p className="text-sm text-gray-500">
                            Step {SPV_TABS.findIndex(tab => tab.id === step) + 1} of {SPV_TABS.length}
                          </p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Step Content */}
                    <div className="p-6">
                      <ErrorBoundary>
                        <Suspense fallback={<EnhancedLoading />}>
                          {renderStepContent}
                        </Suspense>
                      </ErrorBoundary>
                    </div>

                    {/* Footer Actions */}
                    <div className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-xl">
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleBack}
                          disabled={SPV_TABS.findIndex(tab => tab.id === step) === 0}
                          className="w-full sm:w-auto"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Back
                        </Button>

                        <Button
                          type="submit"
                          className="w-full sm:w-auto"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              {SPV_TABS.findIndex(tab => tab.id === step) === SPV_TABS.length - 1 
                                ? 'Complete Setup' 
                                : 'Next Step'}
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </FormProvider>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </FormProvider>
  );
}

export default Index;

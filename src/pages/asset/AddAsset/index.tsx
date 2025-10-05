"use client"
import React, { 
  lazy, 
  Suspense, 
  useEffect, 
  useMemo, 
  useState, 
  useReducer, 
  Component, 
  ErrorInfo, 
  ReactNode,
  useCallback 
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import queryString from "query-string";
import { 
  ArrowLeft, 
  ArrowRight, 
  Save, 
  Building, 
  FileText, 
  CheckCircle2,
  Loader2,
  MapPin,
  CreditCard,
  Image,
  Shield,
  Settings,
  Star,
  Sparkles
} from "lucide-react";

// Error Boundary Component
// Custom ErrorBoundary component
// Error Boundary Component
// ===== Type Definitions =====
// Basic types
type InstrumentType = 'real-estate' | 'other';
type AssetStage = 'pre-construction' | 'under-construction' | 'completed' | 'ready-to-move' | 'other';

// NearByLocation type for better organization
interface NearByLocation {
  id?: string;
  name?: string;
  type?: string;
  distance?: number;
  unit?: string;
}

// Main form data interface
export interface FormData {
  id?: string;
  name: string;
  about: string;
  currency: string;
  instrumentType: InstrumentType;
  class: string;
  category: string;
  stage: AssetStage;
  style: string;
  nearByLocations?: NearByLocation[];
  [key: string]: unknown;
}

// Type for form fields that can be directly set
type FormField = Exclude<keyof FormData, 'nearByLocations'>;

// Error Boundary Component
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
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

// Step Component Props
export interface StepComponentProps {
  tab: string;
  step: string;
  asset: FormData;
  onFieldChange?: (field: string, value: unknown) => void;
}

// Step Tab Configuration
export interface StepTab {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  component?: React.ComponentType<StepComponentProps>;
  className?: string;
}

// Form State Types
type FormAction =
  | { type: 'SET_FIELD'; field: string; value: unknown }
  | { type: 'SET_FORM_DATA'; data: Partial<FormData> }
  | { type: 'SET_LOADING'; isLoading: boolean }
  | { type: 'SET_ERROR'; error: string | null };

interface FormState {
  formData: FormData;
  isLoading: boolean;
  error: string | null;
}


// Form Reducer
const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        },
      };
    case 'SET_FORM_DATA':
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.data,
        },
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.isLoading };
    case 'SET_ERROR':
    default:
      return state;
  }
};

// Import actual step components
const AssetInformation = lazy(() => import('./AssetInformation'));
const FeeStructure = lazy(() => import('./FeeStructure'));
const TokenInformation = lazy(() => import('./TokenInformation'));
const LocationPlaces = lazy(() => import('./LocationPlaces'));
const FeaturesAmenities = lazy(() => import('./FeaturesAndAmenities'));
const MediaDocuments = lazy(() => import('./MediaAndDocuments'));
const IssueDue = lazy(() => import('./IssueDue'));

// Animation variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number] 
    }
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    transition: { 
      duration: 0.3 
    } 
  }
};

// Step tabs configuration
const ASSET_STEPS_TABS: StepTab[] = [
  { 
    id: "asset-information", 
    title: "Asset Information", 
    subtitle: "Basic details", 
    icon: Building,
    component: AssetInformation 
  },
  { 
    id: "fee-structure", 
    title: "Fee Structure", 
    subtitle: "Costs", 
    icon: CreditCard,
    component: FeeStructure
  },
  { 
    id: "token-information", 
    title: "Token Information", 
    subtitle: "Token details", 
    icon: FileText,
    component: TokenInformation
  },
  { 
    id: "location-places", 
    title: "Location & Places", 
    subtitle: "Nearby locations", 
    icon: MapPin,
    component: LocationPlaces
  },
  { 
    id: "features-amenities", 
    title: "Features & Amenities", 
    subtitle: "Facilities", 
    icon: Star,
    component: FeaturesAmenities
  },
  { 
    id: "media-documents", 
    title: "Media & Documents", 
    subtitle: "Photos & files", 
    icon: Image,
    component: MediaDocuments
  },
  { 
    id: "issue-due", 
    title: "Issue & Due Diligence", 
    subtitle: "Legal & compliance", 
    icon: Shield,
    component: IssueDue
  }
];

import { Variants } from 'framer-motion';

const formVariants: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { 
    opacity: 1,
    x: 0,
    transition: { 
      duration: 0.4, 
      ease: [0.22, 1, 0.36, 1] as const
    }
  },
  exit: { 
    opacity: 0, 
    x: -20, 
    transition: { 
      duration: 0.3 
    } 
  }
};

const buttonVariants = {
  hover: { scale: 1.02, y: -1, transition: { duration: 0.2 } },
  tap: { scale: 0.98, transition: { duration: 0.1 } }
};

// Enhanced Loading Component
const EnhancedLoading = () => (
  <motion.div
    className="flex flex-col items-center justify-center h-64 gap-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className="relative">
      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-indigo-600 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
    </div>
    <p className="text-sm text-gray-600 font-medium">Loading content...</p>
  </motion.div>
);

// Mock component for demonstration
const MockStepContent = ({ title }: { title: string }) => (
  <div className="p-8 text-center">
    <div className="text-6xl mb-4">📝</div>
    <p className="text-gray-600 text-lg">{title} content goes here</p>
  </div>
);

const initialFormData: FormData = {
  name: '',
  about: '',
  currency: 'INR',
  instrumentType: 'real-estate',
  class: 'real-estate',
  category: 'residential',
  stage: 'pre-construction',
  style: 'modern',
  nearByLocations: []
};

const initialFormState: FormState = {
  formData: initialFormData,
  isLoading: false,
  error: null,
};

export function Index() {
  const { id = null } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [state, dispatch] = useReducer(formReducer, initialFormState);
  const { formData, isLoading, error } = state;
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const methods = useForm<FormData>({
    defaultValues: initialFormData,
    mode: 'onChange',
  });
  
  const onSubmit = async (data: FormData) => {
    try {
      setFormStatus('loading');
      dispatch({ type: 'SET_LOADING', isLoading: true });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Replace with actual API call
      // if (id) {
      //   await updateAsset(id, data);
      // } else {
      //   await createAsset(data);
      // }
      
      setFormStatus('success');
      
      // Move to next step or finish
      if (currentStepIndex === ASSET_STEPS_TABS.length - 1) {
        setTimeout(() => navigate('/assets'), 1000);
      } else {
        nextStep();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Submission failed';
      dispatch({ type: 'SET_ERROR', error: errorMessage });
      setFormStatus('error');
      console.error('Submission error:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', isLoading: false });
    }
  };

  const queryParams = queryString.parse(location.search);
  const step = typeof queryParams.step === 'string' ? queryParams.step : ASSET_STEPS_TABS[0]?.id || '';
  
  const disabledSteps = !id ? ASSET_STEPS_TABS.slice(1).map((step) => step.id) : [];
  
  // Load asset data when editing
  useEffect(() => {
    const loadAsset = async () => {
      if (id) {
        try {
          dispatch({ type: 'SET_LOADING', isLoading: true });
          // Replace with actual API call
          // const assetData = await getAsset(id);
          // if (assetData) {
          //   const { createdAt, updatedAt, __v, status, bookmarks, ...formData } = assetData;
          //   methods.reset(formData);
          //   dispatch({ type: 'SET_FORM_DATA', data: formData });
          // }
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to load asset';
          dispatch({ type: 'SET_ERROR', error: errorMessage });
        } finally {
          dispatch({ type: 'SET_LOADING', isLoading: false });
        }
      }
    };

    loadAsset();
  }, [id, methods]);

  const handleFieldChange = useCallback((field: string, value: unknown) => {
    if (methods) {
      // Only set the value if the field is a valid form field
      if (field in initialFormData || field === 'id') {
        methods.setValue(field, value as any);
        dispatch({ type: 'SET_FIELD', field, value });
      } else {
        console.warn(`Attempted to set invalid form field: ${field}`);
      }
    }
  }, [methods]);

  const renderStepContent = useMemo(() => {
    const currentStepData = ASSET_STEPS_TABS.find(s => s.id === step);
    const StepComponent = currentStepData?.component || (() => null);
    
    return (
      <ErrorBoundary>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={formVariants}
            className="h-full"
          >
            <Suspense fallback={<EnhancedLoading />}>
              {currentStepData?.component && (
                <StepComponent 
                  tab={step} 
                  step={step}
                  asset={formData}
                  onFieldChange={handleFieldChange}
                />
              )}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </ErrorBoundary>
    );
  }, [step, formData, handleFieldChange]);

  const currentStepIndex = ASSET_STEPS_TABS.findIndex(s => s.id === step);
  const progress = ((currentStepIndex + 1) / ASSET_STEPS_TABS.length) * 100;

  const nextStep = () => {
    if (currentStepIndex < ASSET_STEPS_TABS.length - 1) {
      const nextStepId = ASSET_STEPS_TABS[currentStepIndex + 1].id;
      const params = new URLSearchParams({ step: nextStepId });
      navigate(`/edit-asset/${id || 'new'}?${params.toString()}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const previousStep = () => {
    if (currentStepIndex > 0) {
      const prevStepId = ASSET_STEPS_TABS[currentStepIndex - 1].id;
      const params = new URLSearchParams({ step: prevStepId });
      navigate(`/edit-asset/${id || 'new'}?${params.toString()}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const changeStep = (stepId: string) => {
    const params = new URLSearchParams({ step: stepId });
    navigate(`/${id ? `edit-asset/${id}` : "add-asset"}?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (data: FormData) => {
    try {
      dispatch({ type: 'SET_LOADING', isLoading: true });
      dispatch({ type: 'SET_ERROR', error: null });
      
      const { nearByLocations, ...rest } = data;
      const payload = { ...rest };
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Replace with actual API call
      // if (id) {
      //   const updatedAsset = await updateAsset(id, payload);
      //   if (updatedAsset?.nearByLocations) {
      //     methods.setValue('nearByLocations', updatedAsset.nearByLocations);
      //   }
      // } else {
      //   await createAsset(payload);
      // }
      
      // Show success message
      // setShowSuccess(true);
      // setTimeout(() => setShowSuccess(false), 3000);
      
      // Move to next step or finish
      if (currentStepIndex === ASSET_STEPS_TABS.length - 1) {
        navigate('/assets');
      } else {
        nextStep();
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Submission failed';
      dispatch({ type: 'SET_ERROR', error: errorMessage });
      console.error('Submission error:', err);
    } finally {
      dispatch({ type: 'SET_LOADING', isLoading: false });
    }
  };
  
  // Field changes are handled by the handleFieldChange callback above

  // Show error message if any
  useEffect(() => {
    if (error) {
      // You can replace this with a toast notification
      console.error('Form Error:', error);
    }
  }, [error]);

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      {/* Error Notification */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="fixed top-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-lg z-50 max-w-md"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <div className="flex items-center">
              <div className="text-red-500 mr-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold">Error</p>
                <p>{error}</p>
              </div>
              <button
                onClick={() => dispatch({ type: 'SET_ERROR', error: null })}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
            {ASSET_STEPS_TABS.map((stepItem, index) => {
              const Icon = stepItem.icon;
              const isActive = stepItem.id === step;
              const isCompleted = currentStepIndex > index;
              const isDisabled = disabledSteps.includes(stepItem.id);
              
              return (
                <motion.button
                  key={stepItem.id}
                  type="button"
                  onClick={() => !isDisabled && changeStep(stepItem.id)}
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
                      {stepItem.title.split(' ')[0]}
                    </span>
                  </div>
                  
                  {/* Connecting Line */}
                  {index < ASSET_STEPS_TABS.length - 1 && (
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
                    {React.createElement(ASSET_STEPS_TABS[currentStepIndex].icon, {
                      className: "w-6 h-6 text-white"
                    })}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {ASSET_STEPS_TABS[currentStepIndex].title}
                    </h2>
                    <p className="text-blue-100 text-sm mt-0.5">
                      {ASSET_STEPS_TABS[currentStepIndex].subtitle}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-medium">
                    {currentStepIndex + 1}/{ASSET_STEPS_TABS.length}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Form Content */}
            <div className="p-6 sm:p-8 min-h-[600px]">
              {renderStepContent}
            </div>
            
            {/* Action Buttons */}
            <div className="border-t border-gray-200 bg-gray-50/50 px-6 sm:px-8 py-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 font-medium rounded-xl"
                    onClick={previousStep}
                    disabled={currentStepIndex === 0}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </Button>
                </motion.div>
                
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  {currentStepIndex !== ASSET_STEPS_TABS.length - 1 && (
                    <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                      <span className="text-sm text-blue-700 font-medium">
                        Continue to {ASSET_STEPS_TABS[currentStepIndex + 1]?.title.split(' ')[0]}
                      </span>
                    </div>
                  )}
                  
                  <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                    <Button 
                      type="submit" 
                      className="relative w-full sm:w-auto overflow-hidden px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold rounded-xl group"
                      disabled={formStatus === 'loading'}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      {formStatus === 'loading' ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : currentStepIndex === ASSET_STEPS_TABS.length - 1 ? (
                        <>
                          <Save className="w-5 h-5 mr-2" />
                          {id ? 'Update' : 'Create'} Asset
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

      {/* Success Notification */}
      <AnimatePresence>
        {formStatus === 'success' && (
          <motion.div
            className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
          >
            <CheckCircle2 className="w-6 h-6" />
            <span className="font-medium">
              {id ? 'Asset updated successfully!' : 'Asset created successfully!'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Index;
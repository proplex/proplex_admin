import { lazy, Suspense, useEffect, useMemo, Component, ErrorInfo, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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

import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useParams } from "react-router";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import queryString from "query-string";

// Types
interface StepTab {
  id: string;
  title: string;
  tabs?: Array<{ id: string; title: string }>;
}

interface StepIndicatorProps {
  steps: StepTab[];
  currentStep: string;
  changeStep: (stepId: string) => void;
  disabledSteps: string[];
}

interface FormData {
  nearByLocations?: any;
  [key: string]: any;
}

// Create a proper error boundary component with displayName
const ErrorFallback = () => <div>Failed to load component. Please try again.</div>;
ErrorFallback.displayName = 'ErrorFallback';

// Lazy-loaded components with simplified error handling
const AssetInformation = lazy(() => import("./AssetInformation"));
const AdditionalDetails = lazy(() => import("./AdditionalDetails"));
const IssueDue = lazy(() => import("./IssueDue"));
const TermsAndConditions = lazy(() => import("./TermsAndConditions"));
const FeaturesAndAmenities = lazy(() => import("./FeaturesAndAmenities"));
const LocationPlaces = lazy(() => import("./LocationPlaces"));
const TokenInformation = lazy(() => 
  import("./TokenInformation").then(module => ({ default: module.default }))
);
const MediaAndDocuments = lazy(() => import("./MediaAndDocuments"));
const FeeStructure = lazy(() => import("./FeeStructure"));

import { useAssetApi } from "@/hooks/asset/useAssetApi";
import type { AssetPayload } from "@/hooks/asset/useAssetApi";
import { removeKeyFromObject } from "@/helpers/global";
import { 
  ArrowLeft, 
  ArrowRight, 
  SaveIcon, 
  Building, 
  FileText, 
  CheckCircle2,
  Loader2,
  Sparkles,
  Home,
  Edit3,
  MapPin,
  CreditCard,
  Image,
  Shield,
  Settings,
  Star
} from "lucide-react";

// Import the actual ASSET_STEPS_TABS from constants
import { ASSET_STEPS_TABS } from "@/constants/global";

// Step icons mapping with type safety
interface StepIcons {
  [key: string]: React.ComponentType<{ className?: string }>;
}

const STEP_ICONS: StepIcons = {
  "asset-information": Building,
  "fee-structure": CreditCard,
  "additional-details": FileText,
  "issues-due-diligence": Shield,
  "tandc-faq": Settings,
  "features-amenities": Star,
  "token-information": CreditCard,
  "media-documents": Image,
  "location-places": MapPin,
} as const;

// Animation variants - Simplified to avoid TypeScript errors
const pageVariants = {
  initial: { 
    opacity: 0,
    scale: 0.98
  },
  animate: { 
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.4
    }
  }
};

const sidebarVariants = {
  initial: { 
    opacity: 0, 
    x: -50
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.1
    }
  }
};

const stepIconVariants = {
  initial: { 
    scale: 0,
    opacity: 0,
    rotate: -180
  },
  animate: { 
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.6
    }
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.2
    }
  },
  active: {
    scale: 1.2,
    rotate: 0,
    transition: {
      duration: 0.3
    }
  }
};

const lineVariants = {
  initial: { 
    scaleY: 0,
    opacity: 0
  },
  animate: { 
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: 0.8
    }
  }
};

const formVariants = {
  initial: { 
    opacity: 0, 
    y: 40,
    scale: 0.96
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 0.2
    }
  }
};

const contentVariants = {
  initial: { 
    opacity: 0,
    x: 30,
    scale: 0.98
  },
  animate: { 
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6
    }
  },
  exit: { 
    opacity: 0,
    x: -30,
    scale: 0.98,
    transition: {
      duration: 0.4
    }
  }
};

const buttonVariants = {
  initial: { 
    opacity: 0, 
    scale: 0.9,
    y: 20
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  },
  hover: { 
    scale: 1.05,
    y: -2,
    transition: {
      duration: 0.2
    }
  },
  tap: { 
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
};

const pulseVariants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity
    }
  }
};

// Enhanced Loading Component
const EnhancedLoading = () => (
  <motion.div
    className="flex items-center justify-center p-16"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="flex flex-col items-center gap-4 text-blue-600"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className="w-8 h-8" />
      </motion.div>
      <span className="text-lg font-medium">Loading content...</span>
    </motion.div>
  </motion.div>
);

// Enhanced Icon Sidebar Component
interface StepIconProps {
  id: string;
  label: string;
  tabs: Array<{ id: string }>;
}

const IconStepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep, changeStep, disabledSteps }) => {
  const currentIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <motion.div
      className="relative"
      variants={sidebarVariants}
      initial="initial"
      animate="animate"
    >
      {steps.map((step, index) => {
        const Icon = STEP_ICONS[step.id] || Building;
        const isActive = step.id === currentStep;
        const isCompleted = index < currentIndex;
        const isDisabled = disabledSteps.includes(step.id);
        const isNext = index === currentIndex + 1;

        return (
          <div key={step.id} className="relative flex flex-col items-center">
            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <motion.div
                className="absolute top-16 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-blue-200 to-gray-200"
                variants={lineVariants}
                style={{ originY: 0 }}
              >
                {/* Animated progress line */}
                {index < currentIndex && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-blue-500 to-indigo-600"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ 
                      duration: 0.8, 
                      ease: "easeOut",
                      delay: index * 0.1
                    }}
                    style={{ originY: 0 }}
                  />
                )}
              </motion.div>
            )}

            {/* Step Icon Container */}
            <motion.div
              className="relative mb-4 group cursor-pointer"
              variants={stepIconVariants}
              whileHover={!isDisabled ? "hover" : undefined}
              animate={isActive ? "active" : "animate"}
              onClick={() => !isDisabled && changeStep(step.id)}
            >
              {/* Glow effect for active step */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-blue-400 opacity-20"
                  variants={pulseVariants}
                  animate="animate"
                />
              )}

              {/* Icon background */}
              <motion.div
                className={`
                  relative w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300
                  ${isActive 
                    ? 'bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-400 shadow-lg shadow-blue-500/30' 
                    : isCompleted 
                    ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-400 shadow-lg shadow-green-500/20' 
                    : isDisabled
                    ? 'bg-gray-100 border-gray-300'
                    : isNext
                    ? 'bg-white border-blue-300 shadow-md hover:border-blue-400'
                    : 'bg-white border-gray-300 hover:border-gray-400'
                  }
                `}
                whileHover={!isDisabled ? {
                  y: -2,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                } : undefined}
              >
                <Icon 
                  className={`w-6 h-6 transition-colors duration-300 ${
                    isActive || isCompleted
                      ? 'text-white' 
                      : isDisabled
                      ? 'text-gray-400'
                      : 'text-gray-600 group-hover:text-blue-600'
                  }`} 
                />

                {/* Completion checkmark */}
                {isCompleted && !isActive && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </motion.div>

              {/* Tooltip */}
              <motion.div
                className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10"
                initial={{ x: -10 }}
                whileHover={{ x: 0 }}
              >
                {step.title}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45" />
              </motion.div>
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );
};

export function Index() {
  const { id = null } = useParams();
  const {
    createAsset,
    status,
    asset = {},
    getAsset,
    updateAsset,
    isPending,
  } = useAssetApi();
  const navigate = useNavigate();
  const location = useLocation();
  const controls = useAnimation();

  // ASSET_STEPS_TABS is now imported from constants

  useEffect(() => {
    const fetchAsset = async () => {
      if (id) {
        await getAsset(id);
      }
    };
    fetchAsset();
  }, [id]);

  useEffect(() => {
    controls.start("animate");
  }, [controls]);

  const queryParams = queryString.parse(location.search);
  const step = typeof queryParams.step === 'string' ? queryParams.step : ASSET_STEPS_TABS[0]?.id || '';
  const tab = typeof queryParams.tab === 'string' ? queryParams.tab : ASSET_STEPS_TABS[0]?.tabs?.[0]?.id || '';
  
  const methods = useForm({
    defaultValues: {
      class: "real-estate",
      category: "commercial",
      stage: "under-construction",
      currency: "INR",
    },
    values: removeKeyFromObject(asset, [
      "createdAt",
      "updatedAt",
      "__v",
      "status",
      "bookmarks",
    ]),
  });

  const { getValues, trigger, setValue, watch } = methods;
  const disabledSteps = !id 
    ? ASSET_STEPS_TABS.slice(1).map((step) => step.id)
    : [];

  const renderStepContent = useMemo(() => {
    if (!step) {
      return (
        <div className="p-8">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500">Invalid step configuration</p>
          </div>
        </div>
      );
    }

    const content = (() => {
      switch (step) {
        case "asset-information":
          return (
            <ErrorBoundary>
              <Suspense fallback={<EnhancedLoading />}>
                <AssetInformation step={step} tab={tab} asset={asset} />
              </Suspense>
            </ErrorBoundary>
          );
        case "fee-structure":
          return (
            <ErrorBoundary>
              <Suspense fallback={<EnhancedLoading />}>
                <FeeStructure />
              </Suspense>
            </ErrorBoundary>
          );
        case "token-information":
          return (
            <ErrorBoundary>
              <Suspense fallback={<EnhancedLoading />}>
                <TokenInformation step={step} tab={tab} asset={asset} />
              </Suspense>
            </ErrorBoundary>
          );
        case "media-documents":
          return (
            <ErrorBoundary>
              <Suspense fallback={<EnhancedLoading />}>
                <MediaAndDocuments step={step} tab={tab} />
              </Suspense>
            </ErrorBoundary>
          );
        case "issues-due-diligence":
          return (
            <ErrorBoundary>
              <Suspense fallback={<EnhancedLoading />}>
                <IssueDue step={step} tab={tab} />
              </Suspense>
            </ErrorBoundary>
          );
        case "features-amenities":
          return (
            <ErrorBoundary>
              <Suspense fallback={<EnhancedLoading />}>
                <FeaturesAndAmenities step={step} tab={tab} />
              </Suspense>
            </ErrorBoundary>
          );
        case "location-places":
          return (
            <ErrorBoundary>
              <Suspense fallback={<EnhancedLoading />}>
                <LocationPlaces step={step} tab={tab} />
              </Suspense>
            </ErrorBoundary>
          );
        case "additional-details":
          return (
            <ErrorBoundary>
              <Suspense fallback={<EnhancedLoading />}>
                <AdditionalDetails step={step} tab={tab} />
              </Suspense>
            </ErrorBoundary>
          );
        case "tandc-faq":
          return (
            <ErrorBoundary>
              <Suspense fallback={<EnhancedLoading />}>
                <TermsAndConditions tab={tab} />
              </Suspense>
            </ErrorBoundary>
          );
        default:
          return (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{(typeof step === 'string' ? step : '').replace(/-/g, ' ').toUpperCase()}</h2>
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🏗️</div>
                <p className="text-gray-500">This section is under construction</p>
              </div>
            </div>
          );
      }
    })();

    return (
      <ErrorBoundary>
        <AnimatePresence mode="wait" key={`${step}-${tab}`}>
          <motion.div
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {content}
          </motion.div>
        </AnimatePresence>
      </ErrorBoundary>
    );
  }, [step, tab, asset]);

  const nextStep = () => {
    const currentIndex = ASSET_STEPS_TABS.findIndex((ele) => ele.id === step);
    if (currentIndex !== -1) {
      const nextStep = ASSET_STEPS_TABS[currentIndex + 1];
      if (!nextStep) return;
      const params = new URLSearchParams({ step: nextStep.id });
      navigate(`/edit-asset/${id || 'new'}?${params.toString()}`);
    }
  };

  const nextTab = () => {
    const currentStepIndex = ASSET_STEPS_TABS.findIndex(
      (stepItem) => stepItem.id === step
    );
    if (currentStepIndex === -1) return;

    const currentStepObj = ASSET_STEPS_TABS[currentStepIndex];
    const tabs = currentStepObj.tabs || [];
    const currentTabIndex = tabs.findIndex((tabItem) => tabItem.id === tab);

    if (currentTabIndex === -1) return;

    if (currentTabIndex < tabs.length - 1) {
      const nextTabId = tabs[currentTabIndex + 1].id;
      const params = new URLSearchParams({ 
        step: step, 
        tab: nextTabId 
      });
      navigate(`/edit-asset/${id || 'new'}?${params.toString()}`);
    } else {
      const nextStepObj = ASSET_STEPS_TABS[currentStepIndex + 1];
      if (!nextStepObj) return;
      const nextTabId = nextStepObj.tabs?.[0]?.id;
      const params = new URLSearchParams({ step: nextStepObj.id });
      if (nextTabId) params.set("tab", nextTabId);
      navigate(`/edit-asset/${id || 'new'}?${params.toString()}`);
    }
  };

  const previousStep = () => {
    const currentIndex = ASSET_STEPS_TABS.findIndex((tabItem) => tabItem.id === step);
    if (currentIndex > 0) {
      const prevTab = ASSET_STEPS_TABS[currentIndex - 1];
      const prevTabId = prevTab.id;
      const firstSectionId = prevTab.tabs?.[0]?.id;

      const params = new URLSearchParams({ step: prevTabId });
      if (firstSectionId) params.append("tab", firstSectionId);
      navigate(`/edit-asset/${id || 'new'}?${params.toString()}`);
    }
  };

  const onSubmit = async (data: FormData) => {
    const { nearByLocations, ...rest } = data;
    const payload: AssetPayload = {
      name: rest.name || '',
      about: rest.about || '',
      currency: rest.currency || 'USD',
      instrumentType: (rest.instrumentType || 'real-estate') as AssetPayload['instrumentType'],
      class: rest.class || 'real-estate',
      category: rest.category || 'residential',
      stage: rest.stage || 'pre-construction',
      style: rest.style || 'modern',
      ...rest
    };
    if (id) {
      await updateAsset(id, payload).then((res) => {
        if (res) {
          setValue("nearByLocations", res.nearByLocations);
        }
      });
    } else {
      await createAsset(payload);
    }
  };

  const handleSubmitNext = async () => {
    const data = getValues();
    const isValid = await trigger();
    if (isValid) {
      const { nearByLocations, ...rest } = data;
      const payload = { ...rest };
      if (id) {
        await updateAsset(id, payload).then((res) => {
          if (res) {
            setValue("nearByLocations", res.nearByLocations);
          }
        });
        nextTab();
      } else {
        await createAsset(payload);
      }
    }
  };

  const changeStep = (stepId: string) => {
    const currentIndex = ASSET_STEPS_TABS.findIndex((ele) => ele.id === stepId);
    const nextStep = ASSET_STEPS_TABS[currentIndex];
    const params = new URLSearchParams({ step: nextStep.id });
    if (nextStep.tabs?.[0]?.id) params.append("tab", nextStep.tabs?.[0]?.id);
    navigate(`/${id ? `edit-asset/${id}` : "add-asset"}?${params.toString()}`);
  };

  const isLoading = isPending || status === "loading";
  const currentStepIndex = ASSET_STEPS_TABS.findIndex(s => s.id === step);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="max-w-[1600px] mx-auto flex">
        {/* Enhanced Icon Sidebar */}
        <motion.div
          className="w-24 flex-shrink-0 bg-white/80 backdrop-blur-sm border-r border-white/50 shadow-xl"
          variants={sidebarVariants}
        >
          <div className="sticky top-0 p-6">
            {/* Progress indicator */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-center">
                <div className="text-xs font-semibold text-gray-500 mb-2">PROGRESS</div>
                <div className="relative w-12 h-12 mx-auto">
                  <svg className="w-full h-full transform -rotate-90">
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
                        pathLength: (currentStepIndex + 1) / ASSET_STEPS_TABS.length 
                      }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      style={{
                        strokeDasharray: "0 1",
                      }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-700">
                      {currentStepIndex + 1}/{ASSET_STEPS_TABS.length}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <IconStepIndicator
              steps={ASSET_STEPS_TABS}
              currentStep={step}
              changeStep={changeStep}
              disabledSteps={disabledSteps}
            />
          </div>
        </motion.div>

        {/* Enhanced Main Content - Much Wider */}
        <motion.div
          className="flex-1 min-w-0 p-8"
          variants={formVariants}
        >
          <FormProvider {...methods}>
            <motion.form
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden h-full"
              onSubmit={methods.handleSubmit(onSubmit)}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              {/* Form Content */}
              <div className="min-h-[600px]">
                {renderStepContent}
              </div>

              {/* Enhanced Action Buttons */}
              <motion.div
                className="bg-gradient-to-r from-gray-50/90 to-blue-50/90 backdrop-blur-sm border-t border-gray-200/50 px-8 py-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex justify-between items-center">
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      type="button"
                      variant="outline"
                      disabled={step === "asset-information"}
                      onClick={previousStep}
                      className={`h-12 px-8 ${
                        step === "asset-information"
                          ? "cursor-not-allowed opacity-50"
                          : "hover:bg-gray-100 hover:border-gray-300 hover:shadow-lg"
                      } transition-all duration-200 border-gray-300 rounded-xl font-medium`}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous Step
                    </Button>
                  </motion.div>

                  <div className="flex gap-4">
                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Button
                        type="submit"
                        onClick={handleSubmitNext}
                        disabled={isLoading}
                        className="h-12 px-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl font-medium"
                      >
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="mr-2"
                          >
                            <Loader2 className="w-4 h-4" />
                          </motion.div>
                        ) : (
                          <SaveIcon className="w-4 h-4 mr-2" />
                        )}
                        {isLoading ? "Saving..." : "Save & Continue"}
                      </Button>
                    </motion.div>

                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Button
                        type="button"
                        onClick={nextTab}
                        disabled={isLoading || currentStepIndex === ASSET_STEPS_TABS.length - 1}
                        className="h-12 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next Section
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.form>
          </FormProvider>
        </motion.div>
      </div>

      {/* Success Notification */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <CheckCircle2 className="w-6 h-6 mr-2" />
            <span>Asset saved successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Index;

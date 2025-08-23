import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { CheckCircle2, AlertCircle, Building, Home, Car, LandPlot, ArrowRight, Info } from 'lucide-react';
import FormGenerator from "@/components/UseForm/FormGenerator";
import { assetInfoConfig } from "./assetInfoConfig";
import useLocations from "@/hooks/useLocations";
import DAO from "./DAO";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Animation variants - Simplified to avoid TypeScript errors
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

const cardVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: { duration: 0.2 }
  },
  selected: {
    scale: 1.05,
    transition: { duration: 0.3 }
  }
};

interface EnhancedAssetTypeProps {
  asset: any;
}

function Index({ asset }: EnhancedAssetTypeProps) {
  const { watch, setValue, formState: { errors } } = useFormContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Move hooks to top level to avoid Rules of Hooks violation
  const locationHooks = useLocations();
  
  // Generate form config at component level
  const assetFormConfig = useMemo(() => {
    return assetInfoConfig({ asset, locationHooks });
  }, [asset, locationHooks.countries, locationHooks.states, locationHooks.cities]);

  // Watch form values
  const category = watch('category');
  const stage = watch('stage');
  const assetName = watch('name');
  const company = watch('company');

  // Asset category options
  const categoryOptions = [
    {
      value: 'commercial',
      label: 'Commercial',
      icon: Building,
      description: 'Office buildings, retail spaces, warehouses',
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    },
    {
      value: 'holiday-homes',
      label: 'Holiday Homes',
      icon: Home,
      description: 'Vacation rentals, resorts, leisure properties',
      color: 'bg-green-50 border-green-200 hover:bg-green-100'
    },
    {
      value: 'residential',
      label: 'Residential',
      icon: Car,
      description: 'Apartments, houses, residential complexes',
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
    },
    {
      value: 'land',
      label: 'Land',
      icon: LandPlot,
      description: 'Undeveloped land, plots for development',
      color: 'bg-amber-50 border-amber-200 hover:bg-amber-100',
      disabled: true
    }
  ];

  // Asset stage options
  const stageOptions = [
    {
      value: 'under-construction',
      label: 'Under Construction',
      description: 'Property currently being built',
      disabled: true
    },
    {
      value: 'fully-rented',
      label: 'Fully Rented',
      description: 'Property with existing rental income'
    },
    {
      value: 'renovation',
      label: 'Under Renovation',
      description: 'Property being renovated or upgraded',
      disabled: true
    }
  ];

  // Check step completion
  useEffect(() => {
    const newCompletedSteps: number[] = [];
    
    if (category) newCompletedSteps.push(1);
    if (stage) newCompletedSteps.push(2);
    if (assetName) newCompletedSteps.push(3);
    if (company) newCompletedSteps.push(4);

    setCompletedSteps(newCompletedSteps);

    // Auto-advance to next step
    if (currentStep === 1 && category) {
      setTimeout(() => setCurrentStep(2), 500);
    } else if (currentStep === 2 && stage) {
      setTimeout(() => setCurrentStep(3), 500);
    }
  }, [category, stage, assetName, company, currentStep]);

  const handleCategorySelect = (value: string) => {
    setValue('category', value, { shouldValidate: true });
  };

  const handleStageSelect = (value: string) => {
    setValue('stage', value, { shouldValidate: true });
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <motion.div
            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
              completedSteps.includes(step)
                ? 'bg-green-500 border-green-500 text-white'
                : currentStep === step
                ? 'bg-blue-500 border-blue-500 text-white'
                : 'bg-gray-100 border-gray-300 text-gray-400'
            }`}
            whileHover={{ scale: 1.1 }}
            animate={completedSteps.includes(step) ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            {completedSteps.includes(step) ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <span className="text-sm font-semibold">{step}</span>
            )}
          </motion.div>
          {step < 4 && (
            <div className={`w-12 h-0.5 mx-2 ${
              completedSteps.includes(step) ? 'bg-green-500' : 'bg-gray-300'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderCategorySelection = () => (
    <motion.div
      variants={itemVariants}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Asset Category</h2>
        <p className="text-gray-600">Choose the type of asset you want to list</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categoryOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = category === option.value;
          
          return (
            <motion.div
              key={option.value}
              variants={cardVariants}
              initial="initial"
              whileHover={!option.disabled ? "hover" : undefined}
              animate={isSelected ? "selected" : "initial"}
            >
              <Card
                className={`cursor-pointer transition-all duration-300 h-32 ${
                  option.disabled ? 'opacity-50 cursor-not-allowed' : ''
                } ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'}`}
                onClick={() => !option.disabled && handleCategorySelect(option.value)}
              >
                <CardContent className="p-4 text-center h-full flex flex-col justify-center">
                  <Icon className="w-8 h-8 mx-auto mb-2 text-gray-700" />
                  <h3 className="font-semibold text-sm mb-1">{option.label}</h3>
                  {option.disabled && (
                    <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                  )}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mt-1"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" />
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {errors.category && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center text-red-500 text-sm mt-2"
        >
          <AlertCircle className="w-4 h-4 mr-2" />
          {errors.category.message as string}
        </motion.div>
      )}
    </motion.div>
  );

  const renderStageSelection = () => (
    <motion.div
      variants={itemVariants}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Asset Development Stage</h2>
        <p className="text-gray-600">What is the current status of your {category} property?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {stageOptions.map((option) => {
          const isSelected = stage === option.value;
          
          return (
            <motion.div
              key={option.value}
              variants={cardVariants}
              initial="initial"
              whileHover={!option.disabled ? "hover" : undefined}
              animate={isSelected ? "selected" : "initial"}
            >
              <Card
                className={`cursor-pointer transition-all duration-300 h-32 ${
                  option.disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'bg-white hover:bg-gray-50'
                } ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
                onClick={() => !option.disabled && handleStageSelect(option.value)}
              >
                <CardContent className="p-4 text-center h-full flex flex-col justify-center">
                  <h3 className="font-semibold text-lg mb-2">{option.label}</h3>
                  <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                  {option.disabled && (
                    <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                  )}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mt-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" />
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {errors.stage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center text-red-500 text-sm mt-2"
        >
          <AlertCircle className="w-4 h-4 mr-2" />
          {errors.stage.message as string}
        </motion.div>
      )}
    </motion.div>
  );

  const renderAssetDetails = () => (
    <motion.div
      variants={itemVariants}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Asset Information</h2>
        <p className="text-gray-600">Provide detailed information about your {category} property</p>
      </div>

      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-lg">Property Details</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FormGenerator(assetFormConfig)}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderCompanySelection = () => (
    <motion.div
      variants={itemVariants}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Company & DAO Configuration</h2>
        <p className="text-gray-600">Select the company (SPV) that will manage this asset</p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Choose an existing company or create a new SPV (Special Purpose Vehicle) to manage this asset.
        </AlertDescription>
      </Alert>

      <Card className="p-6">
        <DAO asset={asset} />
      </Card>
    </motion.div>
  );

  const renderNavigationButtons = () => (
    <div className="flex justify-between mt-8">
      <Button
        variant="outline"
        onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
        disabled={currentStep === 1}
      >
        Previous
      </Button>
      
      {currentStep < 4 ? (
        <Button
          onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
          disabled={
            (currentStep === 1 && !category) ||
            (currentStep === 2 && !stage) ||
            (currentStep === 3 && !assetName)
          }
        >
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      ) : (
        <Button
          disabled={!company}
          className="bg-green-600 hover:bg-green-700"
        >
          Continue to Next Section
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      )}
    </div>
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="max-w-6xl mx-auto p-6"
    >
      {renderStepIndicator()}
      
      <AnimatePresence mode="wait">
        <motion.div key={currentStep}>
          {currentStep === 1 && renderCategorySelection()}
          {currentStep === 2 && renderStageSelection()}
          {currentStep === 3 && renderAssetDetails()}
          {currentStep === 4 && renderCompanySelection()}
        </motion.div>
      </AnimatePresence>

      {renderNavigationButtons()}
    </motion.div>
  );
}

export default Index;

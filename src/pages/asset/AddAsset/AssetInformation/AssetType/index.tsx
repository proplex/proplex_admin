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

  const handleCategorySelect = (value: string) => {
    setValue('category', value, { shouldValidate: true });
  };

  const handleStageSelect = (value: string) => {
    setValue('stage', value, { shouldValidate: true });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="max-w-6xl mx-auto p-6 space-y-8"
    >
      {/* Category Selection */}
      <motion.div variants={itemVariants} className="space-y-6">
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

      {/* Stage Selection */}
      <motion.div variants={itemVariants} className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Asset Development Stage</h2>
          <p className="text-gray-600">
            What is the current status of your {category || 'property'}?
          </p>
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

      {/* Asset Details Form */}
      <motion.div variants={itemVariants} className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Asset Information</h2>
          <p className="text-gray-600">
            Provide detailed information about your {category || 'property'}
          </p>
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

      {/* Company Selection */}
      <motion.div variants={itemVariants} className="space-y-6">
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
    </motion.div>
  );
}

export default Index;

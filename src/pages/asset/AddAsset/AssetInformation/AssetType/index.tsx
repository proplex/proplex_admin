import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { 
  CheckCircle2, AlertCircle, Building, Home, Car, LandPlot, ArrowRight, Info,
  Server, Snowflake, Truck, Coffee, Zap, ShoppingBag, Hotel, Building2
} from 'lucide-react';
import FormGenerator from "@/components/UseForm/FormGenerator";
import { assetInfoConfig } from "./assetInfoConfig";
import useLocations from "@/hooks/useLocations";
import DAO from "./DAO";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { enhancedAssetCategories, getSubCategoriesForCategory } from './enhancedAssetCategories';
import { getCategorySpecificFields } from './categorySpecificFields';

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
  
  // Watch form values
  const category = watch('category');
  const subCategory = watch('subCategory');
  const stage = watch('stage');
  const assetName = watch('name');
  const company = watch('company');

  // Get enhanced asset categories
  const categoryOptions = enhancedAssetCategories();
  
  // Get sub-categories for selected category
  const subCategoryOptions = category ? getSubCategoriesForCategory(category) : [];

  // Generate form config at component level
  const assetFormConfig = useMemo(() => {
    return assetInfoConfig({ asset, locationHooks });
  }, [asset, locationHooks.countries, locationHooks.states, locationHooks.cities]);

  // Get category-specific fields
  const categorySpecificFields = useMemo(() => {
    if (category && subCategory) {
      return getCategorySpecificFields({ category, subCategory });
    }
    return [];
  }, [category, subCategory]);

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
    // Clear sub-category when category changes
    setValue('subCategory', '', { shouldValidate: true });
  };

  const handleSubCategorySelect = (value: string) => {
    setValue('subCategory', value, { shouldValidate: true });
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
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="flex items-center text-sm">
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span> Available Categories
            </span>
            <span className="flex items-center text-sm ml-4">
              <span className="inline-block w-3 h-3 bg-gray-300 rounded-full mr-1"></span> Coming Soon
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categoryOptions.map((option) => {
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
                  className={`cursor-pointer transition-all duration-300 h-40 ${
                    option.disabled ? 'opacity-50 cursor-not-allowed' : ''
                  } ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'}`}
                  onClick={() => !option.disabled && handleCategorySelect(option.value)}
                >
                  <CardContent className="p-4 text-center h-full flex flex-col justify-center relative">
                    {!option.disabled && (
                      <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full"></div>
                    )}
                    <div className="w-10 h-10 mx-auto mb-3 text-gray-700">
                      {option.icon}
                    </div>
                    <h3 className="font-semibold text-sm mb-2">{option.label}</h3>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{option.description}</p>
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

      {/* Sub-Category Selection */}
      <AnimatePresence>
        {category && subCategoryOptions.length > 0 && (
          <motion.div 
            variants={itemVariants} 
            initial="initial"
            animate="animate"
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Sub-Category</h2>
              <p className="text-gray-600">
                Choose the specific type of {categoryOptions.find(opt => opt.value === category)?.label.toLowerCase()} asset
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {subCategoryOptions.map((option) => {
                const isSelected = subCategory === option.value;
                
                return (
                  <motion.div
                    key={option.value}
                    variants={cardVariants}
                    initial="initial"
                    whileHover="hover"
                    animate={isSelected ? "selected" : "initial"}
                  >
                    <Card
                      className={`cursor-pointer transition-all duration-300 h-48 ${
                        isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
                      }`}
                      onClick={() => handleSubCategorySelect(option.value)}
                    >
                      <CardContent className="p-4 h-full flex flex-col justify-center">
                        <h3 className="font-semibold text-lg mb-3 text-gray-900">{option.label}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">{option.description}</p>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="mt-auto flex justify-center"
                          >
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {errors.subCategory && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center text-red-500 text-sm mt-2 justify-center"
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                {errors.subCategory.message as string}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

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

        {/* Category-Specific Fields */}
        <AnimatePresence>
          {categorySpecificFields.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-lg">
                    {subCategory && subCategoryOptions.find(opt => opt.value === subCategory)?.label} Specifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {FormGenerator(categorySpecificFields)}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Company Selection */}
      <motion.div variants={itemVariants} className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Company & DAO Configuration</h2>
          <p className="text-gray-600">Select the company (SPV) that will manage this asset</p>
        </div>


        <Card className="p-6">
          <DAO asset={asset} />
        </Card>
      </motion.div>
    </motion.div>
  );
}

export default Index;

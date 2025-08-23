import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import {
  Calculator,
  DollarSign,
  FileText,
  ChevronDown,
  ChevronUp,
  Info,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Banknote,
  Building,
  Scale,
  Shield,
  Settings,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { useFeeCalculation } from '@/hooks/useFeeCalculation';

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

const categoryIcons = {
  registration: Building,
  legal: Scale,
  platform: Settings,
  brokerage: TrendingUp,
  technical: BarChart3,
  miscellaneous: FileText
};

interface FeeStructureComponentProps {
  showComparison?: boolean;
  allowCustomization?: boolean;
  compactMode?: boolean;
}

export const FeeStructureComponent: React.FC<FeeStructureComponentProps> = ({
  showComparison = true,
  allowCustomization = false,
  compactMode = false
}) => {
  const { control, watch, setValue } = useFormContext();
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['registration', 'legal', 'platform']);
  const [showNotes, setShowNotes] = useState(false);

  const {
    calculationResult,
    isCalculating,
    errors,
    basePropertyValue,
    category,
    feeStructure,
    applyDefaultBaseValue,
    validateBaseValue,
    getComparisonWithAverage
  } = useFeeCalculation();

  const comparison = getComparisonWithAverage();

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryName) 
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const handleBaseValueChange = (value: string) => {
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (!isNaN(numericValue)) {
      setValue('basePropertyValue', numericValue);
    }
  };

  const getCategoryDisplayName = (categoryKey: string): string => {
    const names: Record<string, string> = {
      registration: 'Registration & Transfer',
      legal: 'Legal & Regulatory',
      platform: 'Platform & Technology',
      brokerage: 'Brokerage & Advisory',
      technical: 'Technical & Due Diligence',
      miscellaneous: 'Miscellaneous & Other'
    };
    return names[categoryKey] || categoryKey;
  };

  if (!category) {
    return (
      <Card className="border-2 border-dashed border-gray-300">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Calculator className="w-12 h-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Select Asset Category</h3>
          <p className="text-sm text-gray-500 text-center">
            Choose an asset category to view the fee structure and calculations
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Fee Structure</h2>
                <p className="text-sm text-gray-600 font-normal mt-1">
                  {feeStructure?.categoryName || 'Asset Category Fees'}
                </p>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Base Property Value Input */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Banknote className="w-5 h-5 text-green-600" />
              Base Property Value
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="basePropertyValue">Property Value (USD)</Label>
                <Input
                  id="basePropertyValue"
                  type="text"
                  value={basePropertyValue ? basePropertyValue.toLocaleString() : ''}
                  onChange={(e) => handleBaseValueChange(e.target.value)}
                  placeholder="Enter property value"
                  className="text-lg font-semibold"
                />
              </div>
              {feeStructure && (
                <div className="flex items-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={applyDefaultBaseValue}
                    className="whitespace-nowrap"
                  >
                    Use Default
                    <br />
                    <span className="text-xs text-gray-500">
                      ${feeStructure.basePropertyValue.toLocaleString()}
                    </span>
                  </Button>
                </div>
              )}
            </div>

            {showComparison && comparison && (
              <Alert className={comparison.isAboveAverage ? "bg-orange-50 border-orange-200" : "bg-green-50 border-green-200"}>
                <TrendingUp className="w-4 h-4" />
                <AlertDescription>
                  {comparison.isAboveAverage ? "Above" : "Below"} category average by{" "}
                  <strong>{comparison.formattedDifference}</strong> (
                  {comparison.percentageDifference > 0 ? "+" : ""}
                  {comparison.percentageDifference.toFixed(1)}%)
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Fee Breakdown */}
      {calculationResult && (
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-purple-600" />
                  Fee Breakdown
                </div>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                  {calculationResult.totalPercentage.toFixed(1)}% Total
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {calculationResult.categorizedFees.map((categoryGroup, index) => {
                const Icon = categoryIcons[categoryGroup.category as keyof typeof categoryIcons] || FileText;
                const isExpanded = expandedCategories.includes(categoryGroup.category);
                
                return (
                  <motion.div
                    key={categoryGroup.category}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div
                      className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => toggleCategory(categoryGroup.category)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-gray-600" />
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {getCategoryDisplayName(categoryGroup.category)}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {categoryGroup.fees.length} fee{categoryGroup.fees.length !== 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="font-semibold text-gray-900">
                              {categoryGroup.formattedTotal}
                            </div>
                            <div className="text-sm text-gray-500">
                              {categoryGroup.fees.reduce((sum, fee) => sum + fee.percentage, 0).toFixed(2)}%
                            </div>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 space-y-3"
                          >
                            {categoryGroup.fees.map((fee) => (
                              <div
                                key={fee.id}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded border-l-4 border-l-blue-500"
                              >
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <h5 className="font-medium text-gray-900">{fee.name}</h5>
                                    {fee.required && (
                                      <Badge variant="secondary" className="text-xs bg-red-100 text-red-700">
                                        Required
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600 mt-1">{fee.description}</p>
                                </div>
                                <div className="text-right ml-4">
                                  <div className="font-semibold text-gray-900">
                                    {fee.formattedAmount}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {fee.percentage}%
                                  </div>
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Total Summary */}
      {calculationResult && (
        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">Base Property Value</div>
                  <div className="text-xl font-bold text-gray-900">
                    {calculationResult.formattedBaseValue}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">Total Fees</div>
                  <div className="text-xl font-bold text-blue-600">
                    {calculationResult.formattedTotalFees}
                  </div>
                  <div className="text-sm text-gray-500">
                    ({calculationResult.totalPercentage.toFixed(1)}%)
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">Gross Total Value</div>
                  <div className="text-2xl font-bold text-green-600">
                    {calculationResult.formattedGrossTotal}
                  </div>
                  <div className="text-sm text-gray-500">Token Supply Basis</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Notes */}
      {calculationResult && calculationResult.notes.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-amber-600" />
                  Important Notes
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotes(!showNotes)}
                >
                  {showNotes ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </CardTitle>
            </CardHeader>
            <AnimatePresence>
              {showNotes && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <CardContent>
                    <ul className="space-y-2">
                      {calculationResult.notes.map((note, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{note}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      )}

      {/* Errors */}
      {errors.length > 0 && (
        <motion.div variants={itemVariants}>
          <Alert className="bg-red-50 border-red-200">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <AlertDescription>
              <ul className="space-y-1">
                {errors.map((error, index) => (
                  <li key={index} className="text-red-700">{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FeeStructureComponent;
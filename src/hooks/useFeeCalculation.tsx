import { useState, useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { 
  CATEGORY_FEE_STRUCTURES,
  CategoryFeeStructure,
  FeeItem as ConfigFeeItem,
  calculateFeeAmount,
  calculateGrossTotal,
  getFeeStructureByCategory,
  formatCurrency,
  getCategorizedFees
} from '@/config/feeStructure';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchFeeStructure, calculateFees } from '@/store/features/feeCalculationSlice';

// Type alias to resolve the conflict between different FeeItem types
type FeeItem = ConfigFeeItem;

export interface CalculatedFee {
  id: string;
  name: string;
  description: string;
  percentage: number;
  amount: number;
  formattedAmount: string;
  category: string;
  required: boolean;
}

export interface FeeCalculationResult {
  basePropertyValue: number;
  formattedBaseValue: string;
  category: string;
  categoryName: string;
  feeItems: CalculatedFee[];
  categorizedFees: Array<{
    category: string;
    fees: CalculatedFee[];
    total: number;
    formattedTotal: string;
  }>;
  totalFees: number;
  totalPercentage: number;
  grossTotal: number;
  formattedTotalFees: string;
  formattedGrossTotal: string;
  currency: string;
  isValid: boolean;
  notes: string[];
}

export interface UseFeeCalculationOptions {
  baseValueField?: string;
  categoryField?: string;
  currency?: string;
  enableRealTimeCalculation?: boolean;
}

export const useFeeCalculation = (options: UseFeeCalculationOptions = {}) => {
  const {
    baseValueField = 'basePropertyValue',
    categoryField = 'category',
    currency = 'USD',
    enableRealTimeCalculation = true
  } = options;

  const { watch, setValue } = useFormContext();
  const [isCalculating, setIsCalculating] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // Watch for changes in base value and category
  const basePropertyValue = watch(baseValueField);
  const category = watch(categoryField);

  // Get fee structure for selected category
  const feeStructure = useMemo(() => {
    if (!category) return null;
    return getFeeStructureByCategory(category);
  }, [category]);

  // Calculate fees based on current inputs
  const calculationResult = useMemo((): FeeCalculationResult | null => {
    if (!feeStructure || !basePropertyValue || basePropertyValue <= 0) {
      return null;
    }

    setIsCalculating(true);
    
    try {
      const calculatedFees: CalculatedFee[] = feeStructure.feeItems.map(feeItem => {
        const amount = calculateFeeAmount(basePropertyValue, feeItem.percentage);
        return {
          id: feeItem.id,
          name: feeItem.name,
          description: feeItem.description,
          percentage: feeItem.percentage,
          amount,
          formattedAmount: formatCurrency(amount, currency),
          category: feeItem.category || 'miscellaneous',
          required: feeItem.required
        };
      });

      const totalFees = calculatedFees.reduce((sum, fee) => sum + fee.amount, 0);
      const totalPercentage = calculatedFees.reduce((sum, fee) => sum + fee.percentage, 0);
      const grossTotal = basePropertyValue + totalFees;

      // Group fees by category
      const categorizedFees = getCategorizedFees(feeStructure.feeItems).map(group => {
        const groupFees = calculatedFees.filter(fee => fee.category === group.category);
        const groupTotal = groupFees.reduce((sum, fee) => sum + fee.amount, 0);
        
        return {
          category: group.category,
          fees: groupFees,
          total: groupTotal,
          formattedTotal: formatCurrency(groupTotal, currency)
        };
      });

      const result: FeeCalculationResult = {
        basePropertyValue,
        formattedBaseValue: formatCurrency(basePropertyValue, currency),
        category: feeStructure.categoryId,
        categoryName: feeStructure.categoryName,
        feeItems: calculatedFees,
        categorizedFees,
        totalFees,
        totalPercentage,
        grossTotal,
        formattedTotalFees: formatCurrency(totalFees, currency),
        formattedGrossTotal: formatCurrency(grossTotal, currency),
        currency,
        isValid: true,
        notes: feeStructure.notes || []
      };

      setErrors([]);
      return result;
    } catch (error) {
      setErrors([`Calculation error: ${error instanceof Error ? error.message : 'Unknown error'}`]);
      return null;
    } finally {
      setIsCalculating(false);
    }
  }, [feeStructure, basePropertyValue, currency]);

  // Update form with calculated values
  useEffect(() => {
    if (enableRealTimeCalculation && calculationResult) {
      setValue('totalFees', calculationResult.totalFees);
      setValue('grossTotal', calculationResult.grossTotal);
      setValue('feeBreakdown', calculationResult.feeItems);
    }
  }, [calculationResult, setValue, enableRealTimeCalculation]);

  // Preset base value based on category defaults
  const applyDefaultBaseValue = () => {
    if (feeStructure && !basePropertyValue) {
      setValue(baseValueField, feeStructure.basePropertyValue);
    }
  };

  // Validation functions
  const validateBaseValue = (value: number): string[] => {
    const validationErrors: string[] = [];
    
    if (!value || value <= 0) {
      validationErrors.push('Base property value must be greater than 0');
    }
    
    if (value > 1000000000) {
      validationErrors.push('Base property value seems unreasonably high');
    }
    
    if (value < 100000) {
      validationErrors.push('Base property value seems too low for institutional real estate');
    }
    
    return validationErrors;
  };

  const validateCategory = (): string[] => {
    const validationErrors: string[] = [];
    
    if (!category) {
      validationErrors.push('Asset category must be selected');
    }
    
    if (category && !feeStructure) {
      validationErrors.push('Invalid asset category selected');
    }
    
    return validationErrors;
  };

  // Get default values for a category
  const getCategoryDefaults = (categoryId: string) => {
    const structure = getFeeStructureByCategory(categoryId);
    return structure ? {
      basePropertyValue: structure.basePropertyValue,
      currency: structure.currency,
      expectedGrossTotal: structure.grossTotal
    } : null;
  };

  // Calculate fee for specific percentage
  const calculateCustomFee = (amount: number, percentage: number): number => {
    return calculateFeeAmount(amount, percentage);
  };

  // Get comparison with category average
  const getComparisonWithAverage = () => {
    if (!calculationResult || !feeStructure) return null;
    
    const averageGrossTotal = feeStructure.grossTotal;
    const currentGrossTotal = calculationResult.grossTotal;
    const difference = currentGrossTotal - averageGrossTotal;
    const percentageDifference = (difference / averageGrossTotal) * 100;
    
    return {
      averageGrossTotal,
      formattedAverageGrossTotal: formatCurrency(averageGrossTotal, currency),
      difference,
      formattedDifference: formatCurrency(Math.abs(difference), currency),
      percentageDifference,
      isAboveAverage: difference > 0
    };
  };

  return {
    // Calculation results
    calculationResult,
    isCalculating,
    errors,
    
    // Form integration
    basePropertyValue,
    category,
    feeStructure,
    
    // Actions
    applyDefaultBaseValue,
    calculateCustomFee,
    
    // Validation
    validateBaseValue,
    validateCategory,
    
    // Utilities
    getCategoryDefaults,
    getComparisonWithAverage,
    formatCurrency: (amount: number) => formatCurrency(amount, currency),
    
    // Available categories
    availableCategories: CATEGORY_FEE_STRUCTURES.map(structure => ({
      id: structure.categoryId,
      name: structure.categoryName,
      baseValue: structure.basePropertyValue,
      formattedBaseValue: formatCurrency(structure.basePropertyValue, currency)
    }))
  };
};

interface UseFeeCalculationWithReduxReturn {
  feeItems: FeeItem[];
  calculatedFees: Record<string, number>;
  totalAmount: number;
  loading: boolean;
  error: string | null;
  fetchFeeStructure: (categoryId: string) => void;
  calculateFees: (baseAmount: number, feeItems: FeeItem[]) => void;
}

const useFeeCalculationWithRedux = (): UseFeeCalculationWithReduxReturn => {
  const dispatch = useAppDispatch();
  const { feeItems: reduxFeeItems, calculatedFees, totalAmount, loading, error } = useAppSelector(
    (state) => state.feeCalculation
  );

  // Convert Redux FeeItem to ConfigFeeItem format
  const feeItems: FeeItem[] = reduxFeeItems.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    percentage: item.percentage,
    fixedAmount: item.fixedAmount,
    required: item.required,
    category: item.category as 'registration' | 'legal' | 'platform' | 'brokerage' | 'technical' | 'miscellaneous' | undefined
  }));

  const handleFetchFeeStructure = useCallback(
    (categoryId: string) => {
      dispatch(fetchFeeStructure(categoryId));
    },
    [dispatch]
  );

  const handleCalculateFees = useCallback(
    (baseAmount: number, feeItems: FeeItem[]) => {
      // Convert ConfigFeeItem to Redux FeeItem format
      const reduxFeeItems = feeItems.map(item => ({
        ...item,
        fixedAmount: item.fixedAmount || 0,
        category: item.category || 'miscellaneous'
      }));
      dispatch(calculateFees({ baseAmount, feeItems: reduxFeeItems }));
    },
    [dispatch]
  );

  return {
    feeItems,
    calculatedFees,
    totalAmount,
    loading,
    error,
    fetchFeeStructure: handleFetchFeeStructure,
    calculateFees: handleCalculateFees,
  };
};

export default useFeeCalculation;
export { useFeeCalculationWithRedux };

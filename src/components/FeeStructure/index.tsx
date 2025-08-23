export { default as FeeStructureComponent, type FeeStructureComponentProps } from './FeeStructureComponent';
export { useFeeCalculation, type FeeCalculationResult, type CalculatedFee, type UseFeeCalculationOptions } from '@/hooks/useFeeCalculation';
export { 
  CATEGORY_FEE_STRUCTURES,
  calculateFeeAmount,
  calculateGrossTotal,
  getFeeStructureByCategory,
  formatCurrency,
  getCategorizedFees,
  type FeeItem,
  type CategoryFeeStructure
} from '@/config/feeStructure';
import { z } from 'zod';
import { CATEGORY_FEE_STRUCTURES } from '@/config/feeStructure';

/**
 * Fee Structure Validation Schema
 * Ensures proper validation of fee-related form fields
 */
export const feeStructureValidationSchema = z.object({
  basePropertyValue: z
    .number({
      required_error: 'Base property value is required',
      invalid_type_error: 'Base property value must be a number'
    })
    .min(100000, 'Base property value must be at least $100,000')
    .max(1000000000, 'Base property value cannot exceed $1 billion')
    .refine(
      (value) => value > 0,
      'Base property value must be greater than 0'
    ),
  
  category: z
    .string({
      required_error: 'Asset category is required'
    })
    .min(1, 'Asset category must be selected')
    .refine(
      (value) => CATEGORY_FEE_STRUCTURES.some(structure => structure.categoryId === value),
      'Invalid asset category selected'
    ),
  
  currency: z
    .string()
    .default('USD')
    .refine(
      (value) => ['USD', 'EUR', 'GBP', 'INR'].includes(value),
      'Invalid currency selected'
    ),
  
  totalFees: z
    .number()
    .optional(),
  
  grossTotal: z
    .number()
    .optional(),
  
  feeBreakdown: z
    .array(z.object({
      id: z.string(),
      name: z.string(),
      amount: z.number(),
      percentage: z.number(),
      category: z.string(),
      required: z.boolean()
    }))
    .optional(),
  
  approvedFeeStructure: z
    .boolean()
    .default(false)
    .refine(
      (value) => value === true,
      'Fee structure must be reviewed and approved before proceeding'
    )
});

export type FeeStructureValidation = z.infer<typeof feeStructureValidationSchema>;

/**
 * Business Logic Validation Functions
 */
export class FeeStructureValidator {
  /**
   * Validates base property value against category expectations
   */
  static validatePropertyValueForCategory(value: number, category: string): {
    isValid: boolean;
    warnings: string[];
    errors: string[];
  } {
    const structure = CATEGORY_FEE_STRUCTURES.find(s => s.categoryId === category);
    
    if (!structure) {
      return {
        isValid: false,
        warnings: [],
        errors: ['Invalid category selected']
      };
    }
    
    const warnings: string[] = [];
    const errors: string[] = [];
    
    // Check if value is significantly different from category baseline
    const baseline = structure.basePropertyValue;
    const deviation = Math.abs(value - baseline) / baseline;
    
    if (deviation > 2) { // More than 200% deviation
      warnings.push(
        `Property value (${this.formatCurrency(value)}) is significantly different from typical ${structure.categoryName} assets (${this.formatCurrency(baseline)})`
      );
    }
    
    // Category-specific validations
    switch (category) {
      case 'data-centers-edge':
        if (value < 10000000) {
          warnings.push('Data centers typically require significant investment for infrastructure');
        }
        break;
        
      case 'hotels-resorts':
        if (value < 5000000) {
          warnings.push('Hotel properties typically have higher values due to operational complexity');
        }
        break;
        
      case 'renewable-industrial-parks':
        if (value < 15000000) {
          warnings.push('Renewable energy projects typically require substantial initial investment');
        }
        break;
    }
    
    return {
      isValid: errors.length === 0,
      warnings,
      errors
    };
  }
  
  /**
   * Validates calculated fees against expected ranges
   */
  static validateFeeCalculation(baseValue: number, calculatedTotal: number, category: string): {
    isValid: boolean;
    warnings: string[];
    errors: string[];
  } {
    const structure = CATEGORY_FEE_STRUCTURES.find(s => s.categoryId === category);
    
    if (!structure) {
      return {
        isValid: false,
        warnings: [],
        errors: ['Invalid category for fee calculation']
      };
    }
    
    const warnings: string[] = [];
    const errors: string[] = [];
    
    // Calculate expected total
    const expectedTotal = baseValue + (baseValue * structure.totalPercentage / 100);
    const deviation = Math.abs(calculatedTotal - expectedTotal) / expectedTotal;
    
    if (deviation > 0.01) { // More than 1% deviation
      errors.push(
        `Calculated total (${this.formatCurrency(calculatedTotal)}) does not match expected total (${this.formatCurrency(expectedTotal)})`
      );
    }
    
    // Validate individual fee ranges
    const totalPercentage = (calculatedTotal - baseValue) / baseValue * 100;
    
    if (totalPercentage < 5) {
      warnings.push('Total fee percentage seems low - please verify all costs are included');
    }
    
    if (totalPercentage > 15) {
      warnings.push('Total fee percentage is high - please review fee structure');
    }
    
    return {
      isValid: errors.length === 0,
      warnings,
      errors
    };
  }
  
  /**
   * Validates that all required fees are included
   */
  static validateRequiredFees(feeBreakdown: any[], category: string): {
    isValid: boolean;
    warnings: string[];
    errors: string[];
  } {
    const structure = CATEGORY_FEE_STRUCTURES.find(s => s.categoryId === category);
    
    if (!structure) {
      return {
        isValid: false,
        warnings: [],
        errors: ['Invalid category for fee validation']
      };
    }
    
    const warnings: string[] = [];
    const errors: string[] = [];
    
    // Check all required fees are present
    const requiredFees = structure.feeItems.filter(fee => fee.required);
    const providedFeeIds = feeBreakdown.map(fee => fee.id);
    
    for (const requiredFee of requiredFees) {
      if (!providedFeeIds.includes(requiredFee.id)) {
        errors.push(`Required fee missing: ${requiredFee.name}`);
      }
    }
    
    // Check for unexpected fees
    const expectedFeeIds = structure.feeItems.map(fee => fee.id);
    for (const providedFee of feeBreakdown) {
      if (!expectedFeeIds.includes(providedFee.id)) {
        warnings.push(`Unexpected fee included: ${providedFee.name}`);
      }
    }
    
    return {
      isValid: errors.length === 0,
      warnings,
      errors
    };
  }
  
  /**
   * Comprehensive validation of the entire fee structure
   */
  static validateCompleteFeeStructure(data: any): {
    isValid: boolean;
    warnings: string[];
    errors: string[];
    summary: {
      basePropertyValue: number;
      totalFees: number;
      grossTotal: number;
      feePercentage: number;
      category: string;
    };
  } {
    const warnings: string[] = [];
    const errors: string[] = [];
    
    // Basic schema validation
    try {
      feeStructureValidationSchema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors.push(...error.errors.map(e => e.message));
      }
    }
    
    if (errors.length > 0) {
      return {
        isValid: false,
        warnings,
        errors,
        summary: {
          basePropertyValue: 0,
          totalFees: 0,
          grossTotal: 0,
          feePercentage: 0,
          category: ''
        }
      };
    }
    
    // Business logic validations
    const propertyValidation = this.validatePropertyValueForCategory(data.basePropertyValue, data.category);
    warnings.push(...propertyValidation.warnings);
    errors.push(...propertyValidation.errors);
    
    if (data.grossTotal && data.totalFees) {
      const calculationValidation = this.validateFeeCalculation(data.basePropertyValue, data.grossTotal, data.category);
      warnings.push(...calculationValidation.warnings);
      errors.push(...calculationValidation.errors);
    }
    
    if (data.feeBreakdown) {
      const feeValidation = this.validateRequiredFees(data.feeBreakdown, data.category);
      warnings.push(...feeValidation.warnings);
      errors.push(...feeValidation.errors);
    }
    
    const totalFees = data.totalFees || 0;
    const feePercentage = data.basePropertyValue > 0 ? (totalFees / data.basePropertyValue) * 100 : 0;
    
    return {
      isValid: errors.length === 0,
      warnings: [...new Set(warnings)], // Remove duplicates
      errors: [...new Set(errors)], // Remove duplicates
      summary: {
        basePropertyValue: data.basePropertyValue,
        totalFees,
        grossTotal: data.grossTotal || data.basePropertyValue + totalFees,
        feePercentage,
        category: data.category
      }
    };
  }
  
  private static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }
}

/**
 * React Hook Form validation rules for fee structure fields
 */
export const feeStructureValidationRules = {
  basePropertyValue: {
    required: 'Base property value is required',
    min: {
      value: 100000,
      message: 'Minimum property value is $100,000'
    },
    max: {
      value: 1000000000,
      message: 'Maximum property value is $1 billion'
    },
    validate: {
      positive: (value: number) => value > 0 || 'Property value must be positive',
      reasonable: (value: number) => {
        if (value < 500000) {
          return 'Property value seems low for institutional real estate';
        }
        return true;
      }
    }
  },
  
  category: {
    required: 'Asset category is required',
    validate: {
      valid: (value: string) => {
        const isValid = CATEGORY_FEE_STRUCTURES.some(structure => structure.categoryId === value);
        return isValid || 'Invalid asset category selected';
      }
    }
  },
  
  approvedFeeStructure: {
    required: 'Fee structure approval is required',
    validate: {
      approved: (value: boolean) => value === true || 'Please review and approve the fee structure before proceeding'
    }
  }
};
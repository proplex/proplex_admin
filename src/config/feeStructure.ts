/**
 * Category-Specific Fee Structure Configuration
 * 
 * This configuration defines the complete fee structure for each of the 8 high-IRR
 * tokenizable real estate asset categories, including base property values,
 * percentage-based fees, and category-specific requirements.
 */

export interface FeeItem {
  id: string;
  name: string;
  description: string;
  percentage: number;
  fixedAmount?: number;  // Fixed USD amount for this base property value
  required: boolean;
  category?: 'registration' | 'legal' | 'platform' | 'brokerage' | 'technical' | 'miscellaneous';
}

export interface CategoryFeeStructure {
  categoryId: string;
  categoryName: string;
  basePropertyValue: number;
  currency: string;
  feeItems: FeeItem[];
  totalPercentage: number;
  grossTotal: number;
  notes?: string[];
}

export const CATEGORY_FEE_STRUCTURES: CategoryFeeStructure[] = [
  {
    categoryId: 'data-centers-edge',
    categoryName: 'Data-Centers & Edge Locations',
    basePropertyValue: 25000000,
    currency: 'USD',
    totalPercentage: 5.8,
    grossTotal: 26450000,
    feeItems: [
      {
        id: 'registration-transfer-duty',
        name: 'Registration / Transfer Duty',
        description: 'Assumes 1.5% stamp duty (SG) or deed tax (US)',
        percentage: 1.50,
        fixedAmount: 375000,
        required: true,
        category: 'registration'
      },
      {
        id: 'legal-regulatory',
        name: 'Legal & Regulatory (Title, Zoning, Compliance)',
        description: 'Includes data-hosting licence filing',
        percentage: 0.60,
        fixedAmount: 150000,
        required: true,
        category: 'legal'
      },
      {
        id: 'platform-tokenisation',
        name: 'Platform Tokenisation & Smart-Contract Audit',
        description: 'ERC-3643 issuance + custody setup',
        percentage: 1.00,
        fixedAmount: 250000,
        required: true,
        category: 'platform'
      },
      {
        id: 'brokerage-advisory',
        name: 'Brokerage / M&A Advisory',
        description: 'Off-market sourcing fee',
        percentage: 2.00,
        fixedAmount: 500000,
        required: true,
        category: 'brokerage'
      },
      {
        id: 'technical-due-diligence',
        name: 'Technical Due-Diligence (Power, Cooling, Fiber)',
        description: 'Third-party engineering review',
        percentage: 0.40,
        fixedAmount: 100000,
        required: true,
        category: 'technical'
      },
      {
        id: 'miscellaneous-fees',
        name: 'Miscellaneous (Survey, Escrow, Insurance Binder)',
        description: 'Environmental & fiber-route survey',
        percentage: 0.30,
        fixedAmount: 75000,
        required: true,
        category: 'miscellaneous'
      }
    ],
    notes: [
      'Token supply will be issued against this figure',
      'Data-hosting licence may require additional regulatory approval time',
      'Fiber connectivity assessment is critical for valuation'
    ]
  },
  
  {
    categoryId: 'cold-storage-hubs',
    categoryName: 'Cold-Storage Hubs',
    basePropertyValue: 18000000,
    currency: 'USD',
    totalPercentage: 6.1,
    grossTotal: 19098000,
    feeItems: [
      {
        id: 'registration-transfer-duty',
        name: 'Registration / Transfer Duty',
        description: 'Standard transfer tax',
        percentage: 1.50,
        fixedAmount: 270000,
        required: true,
        category: 'registration'
      },
      {
        id: 'legal-fda-haccp',
        name: 'Legal (FDA / HACCP licensing)',
        description: 'Food safety and pharmaceutical compliance',
        percentage: 0.80,
        fixedAmount: 144000,
        required: true,
        category: 'legal'
      },
      {
        id: 'platform-tokenisation',
        name: 'Platform Tokenisation',
        description: 'Smart contract deployment and audit',
        percentage: 1.00,
        fixedAmount: 180000,
        required: true,
        category: 'platform'
      },
      {
        id: 'brokerage',
        name: 'Brokerage',
        description: 'Transaction advisory fee',
        percentage: 2.00,
        fixedAmount: 360000,
        required: true,
        category: 'brokerage'
      },
      {
        id: 'cold-chain-audit',
        name: 'Cold-Chain Compliance Audit',
        description: 'Temperature control system verification',
        percentage: 0.50,
        fixedAmount: 90000,
        required: true,
        category: 'technical'
      },
      {
        id: 'miscellaneous',
        name: 'Misc. (Phase-I ESA, Title Insurance)',
        description: 'Environmental assessment and insurance',
        percentage: 0.30,
        fixedAmount: 54000,
        required: true,
        category: 'miscellaneous'
      }
    ],
    notes: [
      'FDA/HACCP certification required for food-grade facilities',
      'Temperature monitoring system audit essential',
      'Environmental assessment critical for cold storage operations'
    ]
  },

  {
    categoryId: 'last-mile-logistics',
    categoryName: 'Last-Mile Logistics Warehouses',
    basePropertyValue: 12000000,
    currency: 'USD',
    totalPercentage: 5.9,
    grossTotal: 12708000,
    feeItems: [
      {
        id: 'registration-transfer-duty',
        name: 'Registration / Transfer Duty',
        description: 'Property transfer tax',
        percentage: 1.50,
        fixedAmount: 180000,
        required: true,
        category: 'registration'
      },
      {
        id: 'legal-zoning',
        name: 'Legal & Zoning',
        description: 'Zoning compliance and permits',
        percentage: 0.70,
        fixedAmount: 84000,
        required: true,
        category: 'legal'
      },
      {
        id: 'platform-tokenisation',
        name: 'Platform Tokenisation',
        description: 'Token issuance and smart contracts',
        percentage: 1.00,
        fixedAmount: 120000,
        required: true,
        category: 'platform'
      },
      {
        id: 'brokerage',
        name: 'Brokerage',
        description: 'Real estate brokerage fee',
        percentage: 2.00,
        fixedAmount: 240000,
        required: true,
        category: 'brokerage'
      },
      {
        id: 'building-survey',
        name: 'Building Survey & Appraisal',
        description: 'Professional property assessment',
        percentage: 0.40,
        fixedAmount: 48000,
        required: true,
        category: 'technical'
      },
      {
        id: 'miscellaneous',
        name: 'Misc.',
        description: 'Additional closing costs',
        percentage: 0.30,
        fixedAmount: 36000,
        required: true,
        category: 'miscellaneous'
      }
    ],
    notes: [
      'Proximity to major transport hubs affects valuation',
      'Loading dock capacity assessment required',
      'Traffic flow and accessibility studies recommended'
    ]
  },

  {
    categoryId: 'coworking-flexible-office',
    categoryName: 'Co-Working & Flexible Office Chains',
    basePropertyValue: 10000000,
    currency: 'USD',
    totalPercentage: 6.1,
    grossTotal: 10610000,
    feeItems: [
      {
        id: 'registration-transfer-duty',
        name: 'Registration / Transfer Duty',
        description: 'Property transfer tax',
        percentage: 1.50,
        fixedAmount: 150000,
        required: true,
        category: 'registration'
      },
      {
        id: 'legal-multi-lease',
        name: 'Legal (multi-lease abstraction)',
        description: 'Complex lease structure review',
        percentage: 0.80,
        fixedAmount: 80000,
        required: true,
        category: 'legal'
      },
      {
        id: 'platform-tokenisation',
        name: 'Platform Tokenisation',
        description: 'Token structure for portfolio assets',
        percentage: 1.00,
        fixedAmount: 100000,
        required: true,
        category: 'platform'
      },
      {
        id: 'brokerage',
        name: 'Brokerage',
        description: 'Portfolio acquisition fee',
        percentage: 2.00,
        fixedAmount: 200000,
        required: true,
        category: 'brokerage'
      },
      {
        id: 'ffe-valuation',
        name: 'FF&E Valuation & Inventory',
        description: 'Furniture, fixtures & equipment assessment',
        percentage: 0.50,
        fixedAmount: 50000,
        required: true,
        category: 'technical'
      },
      {
        id: 'miscellaneous',
        name: 'Misc.',
        description: 'Additional transaction costs',
        percentage: 0.30,
        fixedAmount: 30000,
        required: true,
        category: 'miscellaneous'
      }
    ],
    notes: [
      'Portfolio roll-up structure may require additional complexity',
      'FF&E valuation critical for co-working spaces',
      'Multi-lease abstraction for various tenant agreements'
    ]
  },

  {
    categoryId: 'renewable-industrial-parks',
    categoryName: 'Renewable-Industrial Parks',
    basePropertyValue: 30000000,
    currency: 'USD',
    totalPercentage: 6.1,
    grossTotal: 31830000,
    feeItems: [
      {
        id: 'registration-transfer-duty',
        name: 'Registration / Transfer Duty',
        description: 'Land and improvements transfer tax',
        percentage: 1.50,
        fixedAmount: 450000,
        required: true,
        category: 'registration'
      },
      {
        id: 'legal-ppa-interconnection',
        name: 'Legal (PPA & interconnection)',
        description: 'Power purchase agreements and grid connection',
        percentage: 0.80,
        fixedAmount: 240000,
        required: true,
        category: 'legal'
      },
      {
        id: 'platform-tokenisation',
        name: 'Platform Tokenisation',
        description: 'Green asset tokenisation structure',
        percentage: 1.00,
        fixedAmount: 300000,
        required: true,
        category: 'platform'
      },
      {
        id: 'brokerage',
        name: 'Brokerage',
        description: 'Specialized renewable energy brokerage',
        percentage: 2.00,
        fixedAmount: 600000,
        required: true,
        category: 'brokerage'
      },
      {
        id: 'technical-yield-studies',
        name: 'Technical & Yield Studies',
        description: 'Energy production and efficiency analysis',
        percentage: 0.50,
        fixedAmount: 150000,
        required: true,
        category: 'technical'
      },
      {
        id: 'miscellaneous',
        name: 'Misc.',
        description: 'Environmental and grid studies',
        percentage: 0.30,
        fixedAmount: 90000,
        required: true,
        category: 'miscellaneous'
      }
    ],
    notes: [
      'PPA agreements critical for revenue projections',
      'Grid interconnection studies may take additional time',
      'Environmental impact assessments required'
    ]
  },

  {
    categoryId: 'high-street-flagship-retail',
    categoryName: 'High-Street Flagship Retail',
    basePropertyValue: 15000000,
    currency: 'USD',
    totalPercentage: 6.1,
    grossTotal: 15915000,
    feeItems: [
      {
        id: 'registration-transfer-duty',
        name: 'Registration / Transfer Duty',
        description: 'Commercial property transfer tax',
        percentage: 1.50,
        fixedAmount: 225000,
        required: true,
        category: 'registration'
      },
      {
        id: 'legal-zoning-overlays',
        name: 'Legal (zoning overlays)',
        description: 'Commercial zoning and overlay districts',
        percentage: 0.80,
        fixedAmount: 120000,
        required: true,
        category: 'legal'
      },
      {
        id: 'platform-tokenisation',
        name: 'Platform Tokenisation',
        description: 'Retail asset tokenisation',
        percentage: 1.00,
        fixedAmount: 150000,
        required: true,
        category: 'platform'
      },
      {
        id: 'brokerage',
        name: 'Brokerage',
        description: 'Premium retail location brokerage',
        percentage: 2.00,
        fixedAmount: 300000,
        required: true,
        category: 'brokerage'
      },
      {
        id: 'retail-trade-area-study',
        name: 'Retail Trade-Area Study',
        description: 'Market analysis and foot traffic study',
        percentage: 0.50,
        fixedAmount: 75000,
        required: true,
        category: 'technical'
      },
      {
        id: 'miscellaneous',
        name: 'Misc.',
        description: 'Additional retail-specific costs',
        percentage: 0.30,
        fixedAmount: 45000,
        required: true,
        category: 'miscellaneous'
      }
    ],
    notes: [
      'Trade area analysis critical for flagship locations',
      'Foot traffic and visibility studies essential',
      'Zoning overlays may restrict certain uses'
    ]
  },

  {
    categoryId: 'hotels-resorts',
    categoryName: 'Hotels & Resorts',
    basePropertyValue: 40000000,
    currency: 'USD',
    totalPercentage: 6.1,
    grossTotal: 42440000,
    feeItems: [
      {
        id: 'registration-transfer-duty',
        name: 'Registration / Transfer Duty',
        description: 'Hospitality property transfer tax',
        percentage: 1.50,
        fixedAmount: 600000,
        required: true,
        category: 'registration'
      },
      {
        id: 'legal-branding-management',
        name: 'Legal (branding & management agreements)',
        description: 'Hotel brand and management contract review',
        percentage: 0.80,
        fixedAmount: 320000,
        required: true,
        category: 'legal'
      },
      {
        id: 'platform-tokenisation',
        name: 'Platform Tokenisation',
        description: 'Hospitality asset tokenisation',
        percentage: 1.00,
        fixedAmount: 400000,
        required: true,
        category: 'platform'
      },
      {
        id: 'brokerage',
        name: 'Brokerage',
        description: 'Hospitality specialized brokerage',
        percentage: 2.00,
        fixedAmount: 800000,
        required: true,
        category: 'brokerage'
      },
      {
        id: 'pip-review',
        name: 'Property Improvement Plan (PIP) Review',
        description: 'Required improvements and capital planning',
        percentage: 0.50,
        fixedAmount: 200000,
        required: true,
        category: 'technical'
      },
      {
        id: 'miscellaneous',
        name: 'Misc.',
        description: 'Hospitality-specific transaction costs',
        percentage: 0.30,
        fixedAmount: 120000,
        required: true,
        category: 'miscellaneous'
      }
    ],
    notes: [
      'Brand affiliation agreements may affect valuation',
      'PIP requirements can impact capital planning',
      'Management agreements critical for operations'
    ]
  },

  {
    categoryId: 'mixed-use-complexes',
    categoryName: 'Mixed-Use Complexes',
    basePropertyValue: 20000000,
    currency: 'USD',
    totalPercentage: 6.1,
    grossTotal: 21220000,
    feeItems: [
      {
        id: 'registration-transfer-duty',
        name: 'Registration / Transfer Duty',
        description: 'Multi-use property transfer tax',
        percentage: 1.50,
        fixedAmount: 300000,
        required: true,
        category: 'registration'
      },
      {
        id: 'legal-multi-use-strata',
        name: 'Legal (multi-use zoning & strata)',
        description: 'Complex zoning and strata title issues',
        percentage: 0.80,
        fixedAmount: 160000,
        required: true,
        category: 'legal'
      },
      {
        id: 'platform-tokenisation',
        name: 'Platform Tokenisation',
        description: 'Mixed-use asset tokenisation structure',
        percentage: 1.00,
        fixedAmount: 200000,
        required: true,
        category: 'platform'
      },
      {
        id: 'brokerage',
        name: 'Brokerage',
        description: 'Mixed-use development brokerage',
        percentage: 2.00,
        fixedAmount: 400000,
        required: true,
        category: 'brokerage'
      },
      {
        id: 'multi-use-appraisal',
        name: 'Multi-use Appraisal & Segregation',
        description: 'Complex valuation for different use types',
        percentage: 0.50,
        fixedAmount: 100000,
        required: true,
        category: 'technical'
      },
      {
        id: 'miscellaneous',
        name: 'Misc.',
        description: 'Additional mixed-use complexity costs',
        percentage: 0.30,
        fixedAmount: 60000,
        required: true,
        category: 'miscellaneous'
      }
    ],
    notes: [
      'Strata title structures add legal complexity',
      'Multi-use appraisal requires specialized expertise',
      'Zoning compliance across different use types'
    ]
  }
];

/**
 * Helper functions for fee calculations
 */
export const calculateFeeAmount = (baseValue: number, percentage: number): number => {
  return Math.round(baseValue * (percentage / 100));
};

export const calculateGrossTotal = (baseValue: number, feeItems: FeeItem[]): number => {
  const totalFees = feeItems.reduce((sum, fee) => {
    return sum + calculateFeeAmount(baseValue, fee.percentage);
  }, 0);
  return baseValue + totalFees;
};

export const getFeeStructureByCategory = (categoryId: string): CategoryFeeStructure | undefined => {
  return CATEGORY_FEE_STRUCTURES.find(structure => structure.categoryId === categoryId);
};

export const calculateTotalFeePercentage = (feeItems: FeeItem[]): number => {
  return feeItems.reduce((sum, fee) => sum + fee.percentage, 0);
};

export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getCategorizedFees = (feeItems: FeeItem[]) => {
  const categories = ['registration', 'legal', 'platform', 'brokerage', 'technical', 'miscellaneous'] as const;
  return categories.map(category => ({
    category,
    fees: feeItems.filter(fee => fee.category === category)
  })).filter(group => group.fees.length > 0);
};
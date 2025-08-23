/**
 * Embedded Finance Solutions Configuration
 * 
 * This configuration defines comprehensive DeFi and FinTech features
 * for each of the 8 high-IRR tokenizable real estate asset categories.
 */

export interface FinanceSolution {
  id: string;
  name: string;
  description: string;
  category: 'defi' | 'credit' | 'insurance' | 'yield' | 'payments' | 'trading';
  features: string[];
  riskLevel: 'low' | 'medium' | 'high';
  minimumAmount?: number;
  maximumLTV?: number;
  interestRate?: string;
  paymentFrequency?: string;
  lockupPeriod?: string;
  enabled: boolean;
}

export interface CategoryFinanceConfig {
  categoryId: string;
  categoryName: string;
  solutions: FinanceSolution[];
  totalSolutions: number;
  primaryFeatures: string[];
  riskProfile: 'conservative' | 'moderate' | 'aggressive';
}

export const EMBEDDED_FINANCE_SOLUTIONS: CategoryFinanceConfig[] = [
  {
    categoryId: 'data-centers-edge',
    categoryName: 'Data-Centers & Edge Locations',
    riskProfile: 'moderate',
    primaryFeatures: [
      'Bridge Credit Lines',
      'Auto-minting Capital Calls',
      'BNPL for Tenants',
      'Parametric Uptime Insurance'
    ],
    totalSolutions: 4,
    solutions: [
      {
        id: 'bridge-credit-line',
        name: 'Bridge Credit Line',
        description: 'Auto-issue bridge-credit line collateralised by server-rack tokens',
        category: 'credit',
        riskLevel: 'medium',
        maximumLTV: 75,
        interestRate: 'Micro-dripped from tenant power-usage payments',
        features: [
          'Server-rack token collateralization',
          'Interest from tenant power payments',
          'Automated credit issuance',
          'Real-time power usage tracking'
        ],
        enabled: true
      },
      {
        id: 'capital-call-tokens',
        name: 'Capital Call Auto-Minting',
        description: 'Auto-mint tokens when UPS/cooling thresholds breached',
        category: 'defi',
        riskLevel: 'medium',
        features: [
          'Threshold-based auto-minting',
          'UPS and cooling monitoring',
          'kWh-boosted yield rewards',
          'Infrastructure upgrade funding'
        ],
        enabled: true
      },
      {
        id: 'tenant-bnpl',
        name: 'Tenant BNPL',
        description: 'Split quarterly rack-rent into six daily stablecoin streams',
        category: 'payments',
        riskLevel: 'low',
        paymentFrequency: 'Daily (6 instalments per quarter)',
        features: [
          'Quarterly rent splitting',
          'Daily stablecoin payments',
          'Co-location client flexibility',
          'Automated payment processing'
        ],
        enabled: true
      },
      {
        id: 'parametric-uptime-insurance',
        name: 'Parametric Uptime Insurance',
        description: 'Instant payments if SLA drops below 99.9%',
        category: 'insurance',
        riskLevel: 'low',
        features: [
          '99.9% SLA threshold',
          'Instant wallet payments',
          'Embedded premium pool',
          'Automated claim settlement'
        ],
        enabled: true
      }
    ]
  },
  {
    categoryId: 'cold-storage-hubs',
    categoryName: 'Cold-Storage Hubs',
    riskProfile: 'conservative',
    primaryFeatures: [
      'Cold-Chain Parametric Cover',
      'CapEx Financing Tokens',
      'Micro-Leverage Vault',
      'Dynamic Cash-Flow Splitter'
    ],
    totalSolutions: 4,
    solutions: [
      {
        id: 'cold-chain-parametric-cover',
        name: 'Cold-Chain Parametric Cover',
        description: 'Temperature sensor triggers for >2°C deviation',
        category: 'insurance',
        riskLevel: 'low',
        features: [
          '2°C deviation triggers',
          'USDC settlement within minutes',
          'Temperature sensor integration',
          'Automated claim processing'
        ],
        enabled: true
      },
      {
        id: 'capex-blast-freezer-tokens',
        name: 'CapEx Blast-Freezer Tokens',
        description: 'Finance retrofits with temperature-fee bonuses',
        category: 'defi',
        riskLevel: 'medium',
        features: [
          'Blast-freezer retrofit funding',
          'Temperature-fee bonus rewards',
          'Base rent enhancement',
          'Infrastructure improvement ROI'
        ],
        enabled: true
      },
      {
        id: 'micro-leverage-vault',
        name: 'Micro-Leverage Vault',
        description: 'Borrow 60% LTV against frozen-inventory receipts',
        category: 'credit',
        riskLevel: 'medium',
        maximumLTV: 60,
        features: [
          'Frozen-inventory collateral',
          '60% loan-to-value ratio',
          'In-wallet borrowing',
          'No collateral withdrawal required'
        ],
        enabled: true
      },
      {
        id: 'dynamic-cashflow-splitter',
        name: 'Dynamic Cash-Flow Splitter',
        description: 'Route storage fees to OPEX, debt service, and wallets',
        category: 'yield',
        riskLevel: 'low',
        features: [
          'Simultaneous fee routing',
          'OPEX allocation',
          'Debt service payments',
          'Token-holder distributions'
        ],
        enabled: true
      }
    ]
  },
  {
    categoryId: 'last-mile-logistics',
    categoryName: 'Last-Mile Logistics Warehouses',
    riskProfile: 'moderate',
    primaryFeatures: [
      'Drone-Deck Revenue Swaps',
      'Embedded Vacancy Hedge',
      'Tenant BNPL',
      'CapCall Engine'
    ],
    totalSolutions: 4,
    solutions: [
      {
        id: 'drone-deck-revenue-swaps',
        name: 'Drone-Deck Revenue Swaps',
        description: 'Pre-sell future landing-fee income for upfront stablecoin',
        category: 'trading',
        riskLevel: 'medium',
        features: [
          'Future landing-fee income',
          'Upfront stablecoin payment',
          'Revenue pre-selling',
          'Drone infrastructure monetization'
        ],
        enabled: true
      },
      {
        id: 'embedded-vacancy-hedge',
        name: 'Embedded Vacancy Hedge',
        description: 'Auto-purchase put options funded by 0.3% of daily rent flow',
        category: 'insurance',
        riskLevel: 'low',
        interestRate: '0.3% of daily rent',
        features: [
          'Automated put option purchases',
          '0.3% daily rent funding',
          'Vacancy protection',
          'Embedded hedge strategy'
        ],
        enabled: true
      },
      {
        id: 'tenant-bnpl-3pl',
        name: 'Tenant BNPL for 3PLs',
        description: 'Convert monthly dock-door rent into 90-day on-chain instalments',
        category: 'payments',
        riskLevel: 'low',
        paymentFrequency: '90-day instalments',
        features: [
          'Monthly rent conversion',
          '90-day payment terms',
          'On-chain instalments',
          '3PL client flexibility'
        ],
        enabled: true
      },
      {
        id: 'capcall-robot-engine',
        name: 'CapCall Robot Engine',
        description: 'Issue micro-tokens for automated loading-robot upgrades',
        category: 'defi',
        riskLevel: 'medium',
        features: [
          'Micro-token issuance',
          'Loading robot upgrades',
          'Per-scan fee rewards',
          'Automation infrastructure funding'
        ],
        enabled: true
      }
    ]
  },
  {
    categoryId: 'coworking-flexible-office',
    categoryName: 'Co-Working & Flexible Office Chains',
    riskProfile: 'moderate',
    primaryFeatures: [
      'Desk-Booking Cash-Stream Splits',
      'Revenue-Share NFT Collateral',
      'Tenant BNPL for Startups',
      'Forward-Yield Marketplace'
    ],
    totalSolutions: 4,
    solutions: [
      {
        id: 'desk-booking-splits',
        name: 'Desk-Booking Cash-Stream Splits',
        description: 'Split micro-payments to cleaners, landlords and token wallets in real time',
        category: 'yield',
        riskLevel: 'low',
        features: [
          'Real-time payment splitting',
          'Cleaner allocations',
          'Landlord distributions',
          'Token wallet payments'
        ],
        enabled: true
      },
      {
        id: 'revenue-share-nft-collateral',
        name: 'Revenue-Share NFT Collateral',
        description: 'NFTs double as collateral for same-day 50% LTV credit lines',
        category: 'credit',
        riskLevel: 'medium',
        maximumLTV: 50,
        features: [
          'NFT collateralization',
          'Same-day credit approval',
          '50% loan-to-value',
          'Revenue-share backing'
        ],
        enabled: true
      },
      {
        id: 'startup-bnpl',
        name: 'Startup BNPL',
        description: 'Convert quarterly licence fees into weekly stablecoin slices',
        category: 'payments',
        riskLevel: 'medium',
        paymentFrequency: 'Weekly',
        features: [
          'Quarterly fee conversion',
          'Weekly payment slices',
          'Stablecoin payments',
          'Startup-friendly terms'
        ],
        enabled: true
      },
      {
        id: 'forward-yield-marketplace',
        name: 'Forward-Yield Marketplace',
        description: 'Lock 12-month desk-rent at fixed APR directly in dApp',
        category: 'trading',
        riskLevel: 'low',
        lockupPeriod: '12 months',
        features: [
          '12-month rent locking',
          'Fixed APR rates',
          'In-dApp marketplace',
          'Yield certainty'
        ],
        enabled: true
      }
    ]
  },
  {
    categoryId: 'renewable-industrial-parks',
    categoryName: 'Renewable-Industrial Parks',
    riskProfile: 'moderate',
    primaryFeatures: [
      'Solar-Yield Swaps',
      'Green Tax Credit Marketplace',
      'Battery Storage Cap-Calls',
      'Embedded Weather Insurance'
    ],
    totalSolutions: 4,
    solutions: [
      {
        id: 'solar-yield-swaps',
        name: 'Solar-Yield Swaps',
        description: 'Trade tomorrow\'s kWh proceeds for today\'s stablecoin via internal AMM',
        category: 'trading',
        riskLevel: 'medium',
        features: [
          'Future kWh trading',
          'Internal AMM system',
          'Immediate stablecoin access',
          'Energy yield monetization'
        ],
        enabled: true
      },
      {
        id: 'green-tax-credit-marketplace',
        name: 'Green Tax Credit Marketplace',
        description: 'Surface IRA or SG credits with one-click sale to wallets',
        category: 'trading',
        riskLevel: 'low',
        features: [
          'IRA/SG tax credit access',
          'One-click sales',
          'Direct wallet transfers',
          'Tax credit monetization'
        ],
        enabled: true
      },
      {
        id: 'battery-storage-capcalls',
        name: 'Battery Storage Cap-Calls',
        description: 'Mint fractional tokens to fund extra megapacks for higher arbitrage revenue',
        category: 'defi',
        riskLevel: 'medium',
        features: [
          'Fractional token minting',
          'Megapack funding',
          'Arbitrage revenue increase',
          'Storage capacity expansion'
        ],
        enabled: true
      },
      {
        id: 'embedded-weather-insurance',
        name: 'Embedded Weather Insurance',
        description: 'Cover weather-driven output drops with auto-deducted premiums',
        category: 'insurance',
        riskLevel: 'low',
        features: [
          'Weather-driven coverage',
          'Output drop protection',
          'Auto-deducted premiums',
          'Daily yield integration'
        ],
        enabled: true
      }
    ]
  },
  {
    categoryId: 'high-street-flagship-retail',
    categoryName: 'High-Street Flagship Retail',
    riskProfile: 'moderate',
    primaryFeatures: [
      'Footfall-Linked BNPL',
      'Revenue-Floor Tokens',
      'Lease-Transaction Mining',
      'Micro-Margin Vault'
    ],
    totalSolutions: 4,
    solutions: [
      {
        id: 'footfall-linked-bnpl',
        name: 'Footfall-Linked BNPL',
        description: 'Pay rent as % of daily sales instead of fixed quarterly sums',
        category: 'payments',
        riskLevel: 'medium',
        features: [
          'Sales percentage payments',
          'Daily sales tracking',
          'Flexible rent structure',
          'Luxury brand optimization'
        ],
        enabled: true
      },
      {
        id: 'revenue-floor-tokens',
        name: 'Revenue-Floor Tokens',
        description: 'Put protection tokens with insurance pool payouts when sales dip',
        category: 'insurance',
        riskLevel: 'low',
        features: [
          'Put protection mechanism',
          'Sales threshold monitoring',
          'Insurance pool payouts',
          'Revenue floor guarantees'
        ],
        enabled: true
      },
      {
        id: 'lease-transaction-mining',
        name: 'Lease-Transaction Mining',
        description: 'Rebate shoppers with micro-property-cash-back tokens on tap payments',
        category: 'yield',
        riskLevel: 'low',
        features: [
          'Tap-to-pay rebates',
          'Micro-property tokens',
          'Shopper cash-back',
          'Transaction mining rewards'
        ],
        enabled: true
      },
      {
        id: 'micro-margin-vault',
        name: 'Micro-Margin Vault',
        description: 'Leverage flagship-store tokens up to 55% LTV in marketplace',
        category: 'credit',
        riskLevel: 'medium',
        maximumLTV: 55,
        features: [
          'Flagship token leverage',
          '55% loan-to-value',
          'In-marketplace borrowing',
          'Micro-margin access'
        ],
        enabled: true
      }
    ]
  },
  {
    categoryId: 'hotels-resorts',
    categoryName: 'Hotels & Resorts',
    riskProfile: 'moderate',
    primaryFeatures: [
      'Guest-Spend Streaming',
      'Loyalty-Token Collateral',
      'Occupancy Parametric Swaps',
      'CapEx Spa/Pool Tokens'
    ],
    totalSolutions: 4,
    solutions: [
      {
        id: 'guest-spend-streaming',
        name: 'Guest-Spend Streaming',
        description: 'Split nightly room revenue to housekeeping, OTA fees and token wallets atomically',
        category: 'yield',
        riskLevel: 'low',
        features: [
          'Atomic revenue splitting',
          'Housekeeping allocations',
          'OTA fee management',
          'Token wallet distributions'
        ],
        enabled: true
      },
      {
        id: 'loyalty-token-collateral',
        name: 'Loyalty-Token Collateral',
        description: 'Stake hotel tokens for instant room upgrades with embedded credit',
        category: 'credit',
        riskLevel: 'low',
        features: [
          'Hotel token staking',
          'Instant room upgrades',
          'Embedded credit system',
          'Guest loyalty rewards'
        ],
        enabled: true
      },
      {
        id: 'occupancy-parametric-swaps',
        name: 'Occupancy Parametric Swaps',
        description: 'Hedge low-season dips by selling future RevPAR in advance',
        category: 'trading',
        riskLevel: 'medium',
        features: [
          'Low-season hedging',
          'Future RevPAR sales',
          'Advance revenue access',
          'Occupancy protection'
        ],
        enabled: true
      },
      {
        id: 'capex-spa-pool-tokens',
        name: 'CapEx Spa/Pool Tokens',
        description: 'Auto-distribute bonus room-night yield for spa/pool renovations',
        category: 'defi',
        riskLevel: 'medium',
        features: [
          'Spa/pool renovation funding',
          'Bonus yield distribution',
          'Room-night rewards',
          'Facility upgrade ROI'
        ],
        enabled: true
      }
    ]
  },
  {
    categoryId: 'mixed-use-complexes',
    categoryName: 'Mixed-Use Complexes',
    riskProfile: 'moderate',
    primaryFeatures: [
      'Layer-2 Zoning Tokens',
      'Integrated Parking BNPL',
      'Cross-Use Yield Swaps',
      'Whole-Complex HELOC'
    ],
    totalSolutions: 4,
    solutions: [
      {
        id: 'layer2-zoning-tokens',
        name: 'Layer-2 Zoning Tokens',
        description: 'Arbitrage between retail, office and parking cash-flows without gas fees',
        category: 'trading',
        riskLevel: 'low',
        features: [
          'Gas-free rebalancing',
          'Multi-use arbitrage',
          'Retail/office/parking flows',
          'Layer-2 efficiency'
        ],
        enabled: true
      },
      {
        id: 'integrated-parking-bnpl',
        name: 'Integrated Parking BNPL',
        description: 'Convert daily parking fees into weekly stablecoin instalments',
        category: 'payments',
        riskLevel: 'low',
        paymentFrequency: 'Weekly instalments',
        features: [
          'Daily fee conversion',
          'Weekly payment terms',
          'Stablecoin instalments',
          'Commuter convenience'
        ],
        enabled: true
      },
      {
        id: 'cross-use-yield-swaps',
        name: 'Cross-Use Yield Swaps',
        description: 'Swap retail rent slice for office rent exposure at mid-day reset prices',
        category: 'trading',
        riskLevel: 'medium',
        features: [
          'Rent slice swapping',
          'Cross-exposure trading',
          'Mid-day price resets',
          'Flexible yield allocation'
        ],
        enabled: true
      },
      {
        id: 'whole-complex-heloc',
        name: 'Whole-Complex HELOC',
        description: 'Revolving credit line collateralised by entire token bundle via governance',
        category: 'credit',
        riskLevel: 'medium',
        features: [
          'Token bundle collateral',
          'Revolving credit access',
          'Governance-controlled',
          'Complex-wide financing'
        ],
        enabled: true
      }
    ]
  }
];

/**
 * Helper functions for embedded finance operations
 */
export const getFinanceSolutionsByCategory = (categoryId: string): CategoryFinanceConfig | undefined => {
  return EMBEDDED_FINANCE_SOLUTIONS.find(config => config.categoryId === categoryId);
};

export const getEnabledSolutions = (categoryId: string): FinanceSolution[] => {
  const config = getFinanceSolutionsByCategory(categoryId);
  return config ? config.solutions.filter(solution => solution.enabled) : [];
};

export const getSolutionsByType = (categoryId: string, type: FinanceSolution['category']): FinanceSolution[] => {
  const enabled = getEnabledSolutions(categoryId);
  return enabled.filter(solution => solution.category === type);
};

export const calculateRiskScore = (solutions: FinanceSolution[]): number => {
  const riskWeights = { low: 1, medium: 2, high: 3 };
  const totalRisk = solutions.reduce((sum, solution) => sum + riskWeights[solution.riskLevel], 0);
  return totalRisk / solutions.length;
};
"
import { 
  Building, 
  Home, 
  Car, 
  LandPlot, 
  Server, 
  Snowflake, 
  Truck, 
  Coffee, 
  Zap, 
  ShoppingBag, 
  Hotel, 
  Building2 
} from 'lucide-react';

export interface SubCategory {
  value: string;
  label: string;
  description: string;
}

export interface AssetCategory {
  type: string;
  name: string;
  icon: React.ReactNode;
  className: string;
  label: string;
  value: string;
  disabled?: boolean;
  description: string;
  subCategories: SubCategory[];
}

export const enhancedAssetCategories = (): AssetCategory[] => {
  // First, define all categories
  const allCategories = [
    {
      type: 'button',
      name: 'category',
      icon: <Coffee className='w-8 h-8' />,
      className: 'h-32 w-full',
      label: 'Co-Working & Flexible Office Chains',
      value: 'coworking-flexible-office',
      description: 'Modern workspace and office solutions',
      subCategories: [
        {
          value: 'downtown-hot-desk-networks',
          label: 'Downtown Hot-Desk Networks',
          description: 'Flexible workspace solutions in prime urban locations'
        },
        {
          value: 'tech-hub-incubator-suites',
          label: 'Tech-Hub Incubator Suites',
          description: 'Specialized workspace for technology startups and innovation'
        },
        {
          value: 'enterprise-managed-office-floors',
          label: 'Enterprise Managed Office Floors',
          description: 'Fully-serviced office spaces for established businesses'
        }
      ]
    },
    {
      type: 'button',
      name: 'category',
      icon: <ShoppingBag className='w-8 h-8' />,
      className: 'h-32 w-full',
      label: 'High-Street Flagship Retail',
      value: 'high-street-flagship-retail',
      description: 'Premium retail and commercial spaces',
      subCategories: [
        {
          value: 'luxury-brand-flagship-stores',
          label: 'Luxury Brand Flagship Stores',
          description: 'Premium retail spaces for luxury and high-end brands'
        },
        {
          value: 'prime-fb-corner-lots',
          label: 'Prime F&B Corner Lots',
          description: 'Strategic food and beverage locations in high-traffic areas'
        },
        {
          value: 'experiential-showroom-spaces',
          label: 'Experiential Showroom Spaces',
          description: 'Interactive retail environments for brand experiences'
        }
      ]
    },
    {
      type: 'button',
      name: 'category',
      icon: <Hotel className='w-8 h-8' />,
      className: 'h-32 w-full',
      label: 'Hotels & Resorts',
      value: 'hotels-resorts',
      description: 'Hospitality and tourism real estate',
      subCategories: [
        {
          value: 'luxury-city-center-hotels',
          label: 'Luxury City Center Hotels',
          description: 'Premium urban hospitality properties in central business districts'
        },
        {
          value: 'resort-island-beachfront-properties',
          label: 'Resort Island & Beachfront Properties',
          description: 'Destination resort properties with prime waterfront locations'
        },
        {
          value: 'extended-stay-suite-hotels',
          label: 'Extended-Stay Suite Hotels',
          description: 'Long-term accommodation facilities for business and leisure travelers'
        }
      ]
    },
    {
      type: 'button',
      name: 'category',
      icon: <Building className='w-8 h-8' />,
      className: 'h-32 w-full',
      label: 'Commercial',
      value: 'commercial',
      description: 'Traditional commercial real estate properties',
      subCategories: [
        {
          value: 'office-buildings',
          label: 'Office Buildings',
          description: 'Traditional office spaces and commercial buildings'
        },
        {
          value: 'retail-spaces',
          label: 'Retail Spaces',
          description: 'Shopping centers, malls, and retail establishments'
        },
        {
          value: 'industrial-warehouses',
          label: 'Industrial Warehouses',
          description: 'General purpose warehouses and industrial facilities'
        }
      ]
    },
    {
      type: 'button',
      name: 'category',
      icon: <Server className='w-8 h-8' />,
      className: 'h-32 w-full',
      label: 'Data-Centers & Edge Locations',
      value: 'data-centers-edge',
      disabled: true,
      description: 'High-performance computing infrastructure assets',
      subCategories: [
        {
          value: 'hyperscale-data-centers',
          label: 'Hyperscale Data-Center Buildings',
          description: 'Large-scale data center facilities for cloud computing and enterprise storage'
        },
        {
          value: 'micro-edge-data-halls',
          label: 'Micro Edge Data Halls',
          description: 'Small-scale edge computing facilities for low-latency applications'
        },
        {
          value: '5g-edge-node-sites',
          label: '5G Edge Node Sites',
          description: 'Telecommunications infrastructure for 5G network deployment'
        }
      ]
    },
    {
      type: 'button',
      name: 'category',
      icon: <Snowflake className='w-8 h-8' />,
      className: 'h-32 w-full',
      label: 'Cold-Storage Hubs',
      value: 'cold-storage-hubs',
      disabled: true,
      description: 'Temperature-controlled storage and logistics facilities',
      subCategories: [
        {
          value: 'food-grade-refrigerated-warehouses',
          label: 'Food-Grade Refrigerated Warehouses',
          description: 'Temperature-controlled storage facilities for food and beverage supply chains'
        },
        {
          value: 'pharmaceutical-temperature-controlled-vaults',
          label: 'Pharmaceutical Temperature-Controlled Vaults',
          description: 'Specialized storage for pharmaceutical and medical products'
        },
        {
          value: 'blast-freezer-storage-units',
          label: 'Blast-Freezer Storage Units',
          description: 'Rapid-freeze storage facilities for perishable goods'
        }
      ]
    },
    {
      type: 'button',
      name: 'category',
      icon: <Truck className='w-8 h-8' />,
      className: 'h-32 w-full',
      label: 'Last-Mile Logistics Warehouses',
      value: 'last-mile-logistics',
      disabled: true,
      description: 'Modern distribution and fulfillment centers',
      subCategories: [
        {
          value: 'urban-fulfillment-centers',
          label: 'Urban Fulfillment Centers',
          description: 'City-based distribution centers for e-commerce and retail fulfillment'
        },
        {
          value: 'multi-level-ramp-up-warehouses',
          label: 'Multi-Level Ramp-Up Warehouses',
          description: 'Vertically integrated warehouse facilities with automated systems'
        },
        {
          value: 'temperature-controlled-cold-chain-pods',
          label: 'Temperature-Controlled Cold-Chain Pods',
          description: 'Specialized last-mile delivery hubs for temperature-sensitive goods'
        }
      ]
    },
    {
      type: 'button',
      name: 'category',
      icon: <Zap className='w-8 h-8' />,
      className: 'h-32 w-full',
      label: 'Renewable-Industrial Parks',
      value: 'renewable-industrial-parks',
      disabled: true,
      description: 'Sustainable energy and manufacturing facilities',
      subCategories: [
        {
          value: 'solar-powered-manufacturing-parks',
          label: 'Solar-Powered Manufacturing Parks',
          description: 'Industrial facilities powered by renewable solar energy'
        },
        {
          value: 'utility-scale-battery-storage-yards',
          label: 'Utility-Scale Battery Storage Yards',
          description: 'Large-scale energy storage facilities for grid stabilization'
        },
        {
          value: 'green-hydrogen-production-plants',
          label: 'Green Hydrogen Production Plants',
          description: 'Clean hydrogen production facilities using renewable energy'
        }
      ]
    },
    {
      type: 'button',
      name: 'category',
      icon: <Building2 className='w-8 h-8' />,
      className: 'h-32 w-full',
      label: 'Mixed-Use Complexes',
      value: 'mixed-use-complexes',
      disabled: true,
      description: 'Integrated multi-purpose development projects',
      subCategories: [
        {
          value: 'retail-office-hybrid-towers',
          label: 'Retail-Office Hybrid Towers',
          description: 'Vertical mixed-use developments combining retail and office spaces'
        },
        {
          value: 'transit-oriented-developments',
          label: 'Transit-Oriented Developments (TOD)',
          description: 'Integrated developments centered around public transportation hubs'
        },
        {
          value: 'vertical-retail-residential-office-stacks',
          label: 'Vertical Retail-Residential-Office Stacks',
          description: 'Comprehensive mixed-use towers with residential, retail, and office components'
        }
      ]
    },
    {
      type: 'button',
      name: 'category',
      icon: <Home className='w-8 h-8' />,
      className: 'h-32 w-full',
      label: 'Holiday Homes',
      value: 'holiday-homes',
      disabled: true,
      description: 'Vacation and leisure residential properties',
      subCategories: [
        {
          value: 'beach-villas',
          label: 'Beach Villas',
          description: 'Luxury vacation homes with beachfront access'
        },
        {
          value: 'mountain-chalets',
          label: 'Mountain Chalets',
          description: 'Alpine and mountain retreat properties'
        },
        {
          value: 'city-vacation-apartments',
          label: 'City Vacation Apartments',
          description: 'Urban vacation rental properties'
        }
      ]
    },
    {
      type: 'button',
      name: 'category',
      icon: <Car className='w-8 h-8' />,
      className: 'h-32 w-full',
      label: 'Residential',
      value: 'residential',
      disabled: true,
      description: 'Residential real estate properties',
      subCategories: [
        {
          value: 'luxury-apartments',
          label: 'Luxury Apartments',
          description: 'High-end residential apartment complexes'
        },
        {
          value: 'single-family-homes',
          label: 'Single Family Homes',
          description: 'Individual residential houses and properties'
        },
        {
          value: 'affordable-housing',
          label: 'Affordable Housing',
          description: 'Budget-friendly residential developments'
        }
      ]
    },
    {
      type: 'button',
      name: 'category',
      icon: <LandPlot className='w-8 h-8' />,
      className: 'h-32 w-full',
      label: 'Land',
      value: 'land',
      disabled: true,
      description: 'Undeveloped land and plots',
      subCategories: [
        {
          value: 'development-plots',
          label: 'Development Plots',
          description: 'Land designated for future development'
        },
        {
          value: 'agricultural-land',
          label: 'Agricultural Land',
          description: 'Farmland and agricultural properties'
        },
        {
          value: 'commercial-land',
          label: 'Commercial Land',
          description: 'Land zoned for commercial development'
        }
      ]
    }
  ];

  // Separate enabled and disabled categories
  const enabledCategories = allCategories.filter(category => !category.disabled);
  const disabledCategories = allCategories.filter(category => category.disabled);

  // Return the reorganized array with enabled categories first
  return [...enabledCategories, ...disabledCategories];
};

// Helper function to get sub-categories for a specific category
export const getSubCategoriesForCategory = (categoryValue: string): SubCategory[] => {
  const category = enhancedAssetCategories().find(cat => cat.value === categoryValue);
  return category?.subCategories || [];
};

// Helper function to get category by value
export const getCategoryByValue = (categoryValue: string): AssetCategory | undefined => {
  return enhancedAssetCategories().find(cat => cat.value === categoryValue);
};

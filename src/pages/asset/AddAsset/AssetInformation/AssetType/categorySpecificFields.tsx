import { FormFieldConfig } from "@/components/UseForm/ControllerMap";
import { useFormContext } from "react-hook-form";

interface CategorySpecificFieldsProps {
  category: string;
  subCategory: string;
}

/**
 * Category-specific form fields for different asset types
 * These fields appear in addition to the basic asset information fields
 */
export const getCategorySpecificFields = ({ 
  category, 
  subCategory 
}: CategorySpecificFieldsProps): FormFieldConfig[] => {
  const { control } = useFormContext();
  
  const getDataCenterFields = (): FormFieldConfig[] => {
    if (subCategory === 'hyperscale-data-centers') {
      return [
        {
          type: "number" as const,
          name: "serverCapacity",
          control,
          label: "Server Capacity (Racks)",
          rules: { required: "Server capacity is required" },
        },
        {
          type: "number" as const,
          name: "powerCapacity",
          control,
          label: "Power Capacity (MW)",
          rules: { required: "Power capacity is required" },
        },
        {
          type: "select" as const,
          name: "tierLevel",
          control,
          label: "Data Center Tier Level",
          options: [
            { label: "Tier I", value: "tier-1" },
            { label: "Tier II", value: "tier-2" },
            { label: "Tier III", value: "tier-3" },
            { label: "Tier IV", value: "tier-4" },
          ],
          rules: { required: "Tier level is required" },
        },
        {
          type: "text" as const,
          name: "connectivityProviders",
          control,
          label: "Connectivity Providers",
          placeholder: "e.g., AWS, Azure, Google Cloud",
        }
      ];
    }
    
    if (subCategory === 'micro-edge-data-halls') {
      return [
        {
          type: "number" as const,
          name: "edgeNodes",
          control,
          label: "Number of Edge Nodes",
          rules: { required: "Number of edge nodes is required" },
        },
        {
          type: "number" as const,
          name: "latencyMs",
          control,
          label: "Average Latency (ms)",
          rules: { required: "Latency specification is required" },
        },
        {
          type: "text" as const,
          name: "coverageArea",
          control,
          label: "Coverage Area (km radius)",
          rules: { required: "Coverage area is required" },
        }
      ];
    }
    
    return [];
  };

  const getColdStorageFields = (): FormFieldConfig[] => {
    const commonFields: FormFieldConfig[] = [
      {
        type: "number" as const,
        name: "storageCapacity",
        control,
        label: "Storage Capacity (cubic meters)",
        rules: { required: "Storage capacity is required" },
      },
      {
        type: "text" as const,
        name: "temperatureRange",
        control,
        label: "Temperature Range (°C)",
        placeholder: "e.g., -25 to -18",
        rules: { required: "Temperature range is required" },
      },
      {
        type: "select" as const,
        name: "certifications",
        control,
        label: "Certifications",
        options: [
          { label: "HACCP", value: "haccp" },
          { label: "FDA", value: "fda" },
          { label: "WHO GMP", value: "who-gmp" },
          { label: "ISO 22000", value: "iso-22000" },
        ],
      }
    ];

    if (subCategory === 'pharmaceutical-temperature-controlled-vaults') {
      return [
        ...commonFields,
        {
          type: "select" as const,
          name: "validationLevel",
          control,
          label: "Validation Level",
          options: [
            { label: "IQ (Installation Qualification)", value: "iq" },
            { label: "OQ (Operational Qualification)", value: "oq" },
            { label: "PQ (Performance Qualification)", value: "pq" },
          ],
          rules: { required: "Validation level is required" },
        }
      ];
    }

    return commonFields;
  };

  const getLogisticsFields = (): FormFieldConfig[] => {
    return [
      {
        type: "number" as const,
        name: "warehouseArea",
        control,
        label: "Warehouse Area (sq ft)",
        rules: { required: "Warehouse area is required" },
      },
      {
        type: "number" as const,
        name: "dockDoors",
        control,
        label: "Number of Dock Doors",
        rules: { required: "Number of dock doors is required" },
      },
      {
        type: "number" as const,
        name: "clearHeight",
        control,
        label: "Clear Height (feet)",
        rules: { required: "Clear height is required" },
      },
      {
        type: "switch" as const,
        name: "automatedSystems",
        control,
        label: "Automated Sorting Systems",
      },
      {
        type: "text" as const,
        name: "proximityToTransport",
        control,
        label: "Proximity to Transport Hubs",
        placeholder: "Distance to nearest airport, port, highway",
      }
    ];
  };

  const getCoWorkingFields = (): FormFieldConfig[] => {
    return [
      {
        type: "number" as const,
        name: "totalDesks",
        control,
        label: "Total Desk Capacity",
        rules: { required: "Desk capacity is required" },
      },
      {
        type: "number" as const,
        name: "privateOffices",
        control,
        label: "Number of Private Offices",
      },
      {
        type: "number" as const,
        name: "meetingRooms",
        control,
        label: "Number of Meeting Rooms",
      },
      {
        type: "switch" as const,
        name: "has24HourAccess",
        control,
        label: "24/7 Access Available",
      },
      {
        type: "text" as const,
        name: "amenitiesIncluded",
        control,
        label: "Included Amenities",
        placeholder: "WiFi, Printing, Coffee, Reception, etc.",
      }
    ];
  };

  const getRenewableFields = (): FormFieldConfig[] => {
    if (subCategory === 'solar-powered-manufacturing-parks') {
      return [
        {
          type: "number" as const,
          name: "solarCapacity",
          control,
          label: "Solar Capacity (MW)",
          rules: { required: "Solar capacity is required" },
        },
        {
          type: "number" as const,
          name: "manufacturingArea",
          control,
          label: "Manufacturing Area (sq ft)",
          rules: { required: "Manufacturing area is required" },
        },
        {
          type: "text" as const,
          name: "industrialZoning",
          control,
          label: "Industrial Zoning Classification",
        }
      ];
    }

    if (subCategory === 'utility-scale-battery-storage-yards') {
      return [
        {
          type: "number" as const,
          name: "batteryCapacity",
          control,
          label: "Battery Storage Capacity (MWh)",
          rules: { required: "Battery capacity is required" },
        },
        {
          type: "text" as const,
          name: "batteryTechnology",
          control,
          label: "Battery Technology",
          placeholder: "e.g., Lithium-ion, Flow battery",
        },
        {
          type: "number" as const,
          name: "gridConnectionCapacity",
          control,
          label: "Grid Connection Capacity (MW)",
        }
      ];
    }

    return [
      {
        type: "number" as const,
        name: "renewableCapacity",
        control,
        label: "Renewable Energy Capacity (MW)",
        rules: { required: "Renewable capacity is required" },
      },
      {
        type: "select" as const,
        name: "sustainabilityCertifications",
        control,
        label: "Sustainability Certifications",
        options: [
          { label: "LEED Platinum", value: "leed-platinum" },
          { label: "LEED Gold", value: "leed-gold" },
          { label: "BREEAM Outstanding", value: "breeam-outstanding" },
          { label: "Green Star", value: "green-star" },
        ],
      }
    ];
  };

  const getRetailFields = (): FormFieldConfig[] => {
    return [
      {
        type: "number" as const,
        name: "retailSpace",
        control,
        label: "Retail Space (sq ft)",
        rules: { required: "Retail space is required" },
      },
      {
        type: "number" as const,
        name: "frontage",
        control,
        label: "Street Frontage (feet)",
        rules: { required: "Street frontage is required" },
      },
      {
        type: "number" as const,
        name: "footTraffic",
        control,
        label: "Daily Foot Traffic",
        placeholder: "Average number of pedestrians per day",
      },
      {
        type: "switch" as const,
        name: "cornerLocation",
        control,
        label: "Corner Location",
      },
      {
        type: "text" as const,
        name: "nearbyAnchors",
        control,
        label: "Nearby Anchor Tenants",
        placeholder: "Major brands or stores in proximity",
      }
    ];
  };

  const getHotelFields = (): FormFieldConfig[] => {
    return [
      {
        type: "number" as const,
        name: "numberOfRooms",
        control,
        label: "Number of Rooms",
        rules: { required: "Number of rooms is required" },
      },
      {
        type: "select" as const,
        name: "starRating",
        control,
        label: "Star Rating",
        options: [
          { label: "3 Star", value: "3-star" },
          { label: "4 Star", value: "4-star" },
          { label: "5 Star", value: "5-star" },
          { label: "Luxury", value: "luxury" },
        ],
        rules: { required: "Star rating is required" },
      },
      {
        type: "number" as const,
        name: "averageOccupancy",
        control,
        label: "Average Occupancy Rate (%)",
        placeholder: "Annual average occupancy percentage",
      },
      {
        type: "text" as const,
        name: "brandAffiliation",
        control,
        label: "Brand Affiliation",
        placeholder: "e.g., Marriott, Hilton, Independent",
      },
      {
        type: "text" as const,
        name: "proximityToAttractions",
        control,
        label: "Proximity to Attractions",
        placeholder: "Distance to major tourist attractions",
      }
    ];
  };

  const getMixedUseFields = (): FormFieldConfig[] => {
    return [
      {
        type: "number" as const,
        name: "totalFloors",
        control,
        label: "Total Floors",
        rules: { required: "Number of floors is required" },
      },
      {
        type: "number" as const,
        name: "retailArea",
        control,
        label: "Retail Area (sq ft)",
      },
      {
        type: "number" as const,
        name: "officeArea",
        control,
        label: "Office Area (sq ft)",
      },
      {
        type: "number" as const,
        name: "residentialUnits",
        control,
        label: "Residential Units",
      },
      {
        type: "switch" as const,
        name: "transitConnected",
        control,
        label: "Transit Connected",
      },
      {
        type: "text" as const,
        name: "mixedUseComponents",
        control,
        label: "Mixed-Use Components",
        placeholder: "Retail, Office, Residential, Hotel, etc.",
      }
    ];
  };

  // Return appropriate fields based on category
  switch (category) {
    case 'data-centers-edge':
      return getDataCenterFields();
    case 'cold-storage-hubs':
      return getColdStorageFields();
    case 'last-mile-logistics':
      return getLogisticsFields();
    case 'coworking-flexible-office':
      return getCoWorkingFields();
    case 'renewable-industrial-parks':
      return getRenewableFields();
    case 'high-street-flagship-retail':
      return getRetailFields();
    case 'hotels-resorts':
      return getHotelFields();
    case 'mixed-use-complexes':
      return getMixedUseFields();
    default:
      return [];
  }
};
interface AmenityFeature {
  id: string;
  label: string;
  description?: string;
  category: 'amenity' | 'feature';
}

interface CategoryAmenitiesFeatures {
  [key: string]: {
    amenities: AmenityFeature[];
    features: AmenityFeature[];
  };
}

export const categorySpecificAmenitiesFeatures: CategoryAmenitiesFeatures = {
  'data-centers-edge': {
    amenities: [
      { id: 'redundant-power', label: 'Redundant Power Systems', category: 'amenity' },
      { id: 'precision-cooling', label: 'Precision Cooling Systems', category: 'amenity' },
      { id: 'fire-suppression', label: 'Advanced Fire Suppression', category: 'amenity' },
      { id: 'biometric-access', label: 'Biometric Access Control', category: 'amenity' },
      { id: 'carrier-neutral', label: 'Carrier Neutral Facility', category: 'amenity' },
      { id: 'backup-generators', label: 'Backup Power Generators', category: 'amenity' },
      { id: 'monitoring-noc', label: '24/7 Network Operations Center', category: 'amenity' },
      { id: 'cable-management', label: 'Advanced Cable Management', category: 'amenity' }
    ],
    features: [
      { id: 'uptime-guarantee', label: '99.9%+ Uptime Guarantee', category: 'feature' },
      { id: 'scalable-infrastructure', label: 'Scalable Infrastructure', category: 'feature' },
      { id: 'edge-computing-ready', label: 'Edge Computing Ready', category: 'feature' },
      { id: 'fiber-connectivity', label: 'High-Speed Fiber Connectivity', category: 'feature' },
      { id: 'compliance-certifications', label: 'SOC 2/ISO 27001 Certified', category: 'feature' },
      { id: 'colocation-services', label: 'Colocation Services Available', category: 'feature' },
      { id: 'cloud-on-ramps', label: 'Direct Cloud On-Ramps', category: 'feature' }
    ]
  },
  
  'cold-storage-hubs': {
    amenities: [
      { id: 'temperature-monitoring', label: 'Continuous Temperature Monitoring', category: 'amenity' },
      { id: 'backup-refrigeration', label: 'Backup Refrigeration Systems', category: 'amenity' },
      { id: 'dock-levelers', label: 'Hydraulic Dock Levelers', category: 'amenity' },
      { id: 'insulated-docks', label: 'Insulated Loading Docks', category: 'amenity' },
      { id: 'alarm-systems', label: 'Temperature Alarm Systems', category: 'amenity' },
      { id: 'emergency-power', label: 'Emergency Power Backup', category: 'amenity' },
      { id: 'pest-control', label: 'Integrated Pest Control', category: 'amenity' },
      { id: 'air-curtains', label: 'Air Curtain Systems', category: 'amenity' }
    ],
    features: [
      { id: 'haccp-certified', label: 'HACCP Certified Facility', category: 'feature' },
      { id: 'multi-temperature-zones', label: 'Multiple Temperature Zones', category: 'feature' },
      { id: 'blast-freezing', label: 'Blast Freezing Capability', category: 'feature' },
      { id: 'inventory-management', label: 'WMS Integration Ready', category: 'feature' },
      { id: 'cold-chain-compliance', label: 'Cold Chain Compliance', category: 'feature' },
      { id: 'energy-efficient', label: 'Energy Efficient Systems', category: 'feature' },
      { id: 'automated-storage', label: 'Automated Storage Options', category: 'feature' }
    ]
  },
  
  'last-mile-logistics': {
    amenities: [
      { id: 'loading-docks', label: 'Multiple Loading Docks', category: 'amenity' },
      { id: 'cross-docking', label: 'Cross-Docking Facilities', category: 'amenity' },
      { id: 'sortation-systems', label: 'Automated Sortation Systems', category: 'amenity' },
      { id: 'vehicle-charging', label: 'EV Charging Stations', category: 'amenity' },
      { id: 'parking-fleet', label: 'Fleet Vehicle Parking', category: 'amenity' },
      { id: 'office-space', label: 'Administrative Office Space', category: 'amenity' },
      { id: 'employee-facilities', label: 'Employee Break Facilities', category: 'amenity' },
      { id: 'security-systems', label: 'Advanced Security Systems', category: 'amenity' }
    ],
    features: [
      { id: 'highway-access', label: 'Direct Highway Access', category: 'feature' },
      { id: 'urban-proximity', label: 'Urban Center Proximity', category: 'feature' },
      { id: 'scalable-operations', label: 'Scalable Operations Design', category: 'feature' },
      { id: 'same-day-delivery', label: 'Same-Day Delivery Capable', category: 'feature' },
      { id: 'multi-carrier', label: 'Multi-Carrier Compatible', category: 'feature' },
      { id: 'automation-ready', label: 'Automation Integration Ready', category: 'feature' },
      { id: 'sustainable-design', label: 'Sustainable Design Features', category: 'feature' }
    ]
  },
  
  'coworking-flexible-office': {
    amenities: [
      { id: 'high-speed-wifi', label: 'High-Speed WiFi', category: 'amenity' },
      { id: 'printing-services', label: 'Printing & Scanning Services', category: 'amenity' },
      { id: 'coffee-kitchen', label: 'Coffee Bar & Kitchen', category: 'amenity' },
      { id: 'reception-services', label: 'Reception Services', category: 'amenity' },
      { id: 'mail-handling', label: 'Mail & Package Handling', category: 'amenity' },
      { id: 'cleaning-services', label: 'Daily Cleaning Services', category: 'amenity' },
      { id: 'wellness-room', label: 'Wellness/Meditation Room', category: 'amenity' },
      { id: 'bike-storage', label: 'Bike Storage', category: 'amenity' }
    ],
    features: [
      { id: '24-7-access', label: '24/7 Building Access', category: 'feature' },
      { id: 'flexible-membership', label: 'Flexible Membership Options', category: 'feature' },
      { id: 'meeting-room-booking', label: 'Meeting Room Booking System', category: 'feature' },
      { id: 'community-events', label: 'Community Events Program', category: 'feature' },
      { id: 'business-support', label: 'Business Support Services', category: 'feature' },
      { id: 'networking-opportunities', label: 'Networking Opportunities', category: 'feature' },
      { id: 'tech-startup-focus', label: 'Tech Startup Focused', category: 'feature' }
    ]
  },
  
  'renewable-industrial-parks': {
    amenities: [
      { id: 'solar-panels', label: 'On-Site Solar Panel Systems', category: 'amenity' },
      { id: 'energy-storage', label: 'Battery Energy Storage', category: 'amenity' },
      { id: 'ev-charging-infrastructure', label: 'EV Charging Infrastructure', category: 'amenity' },
      { id: 'smart-grid', label: 'Smart Grid Connectivity', category: 'amenity' },
      { id: 'water-recycling', label: 'Water Recycling Systems', category: 'amenity' },
      { id: 'waste-management', label: 'Integrated Waste Management', category: 'amenity' },
      { id: 'green-spaces', label: 'Green Spaces & Landscaping', category: 'amenity' },
      { id: 'research-facilities', label: 'R&D Lab Facilities', category: 'amenity' }
    ],
    features: [
      { id: 'carbon-neutral', label: 'Carbon Neutral Operations', category: 'feature' },
      { id: 'leed-certified', label: 'LEED Platinum Certified', category: 'feature' },
      { id: 'renewable-energy-surplus', label: 'Renewable Energy Surplus', category: 'feature' },
      { id: 'sustainability-reporting', label: 'Sustainability Reporting', category: 'feature' },
      { id: 'green-technology-focus', label: 'Green Technology Focus', category: 'feature' },
      { id: 'circular-economy', label: 'Circular Economy Design', category: 'feature' },
      { id: 'government-incentives', label: 'Government Incentive Eligible', category: 'feature' }
    ]
  },
  
  'high-street-flagship-retail': {
    amenities: [
      { id: 'window-displays', label: 'Premium Window Display Space', category: 'amenity' },
      { id: 'customer-parking', label: 'Customer Parking Available', category: 'amenity' },
      { id: 'storage-areas', label: 'Back-of-House Storage', category: 'amenity' },
      { id: 'fitting-rooms', label: 'Luxury Fitting Rooms', category: 'amenity' },
      { id: 'pos-infrastructure', label: 'POS System Infrastructure', category: 'amenity' },
      { id: 'security-systems-retail', label: 'Retail Security Systems', category: 'amenity' },
      { id: 'climate-control', label: 'Premium Climate Control', category: 'amenity' },
      { id: 'delivery-access', label: 'Dedicated Delivery Access', category: 'amenity' }
    ],
    features: [
      { id: 'high-foot-traffic', label: 'High Foot Traffic Location', category: 'feature' },
      { id: 'brand-visibility', label: 'Maximum Brand Visibility', category: 'feature' },
      { id: 'corner-location-retail', label: 'Prime Corner Location', category: 'feature' },
      { id: 'tourist-destination', label: 'Tourist Destination Area', category: 'feature' },
      { id: 'luxury-district', label: 'Luxury Shopping District', category: 'feature' },
      { id: 'experiential-space', label: 'Experiential Retail Ready', category: 'feature' },
      { id: 'omnichannel-ready', label: 'Omnichannel Retail Ready', category: 'feature' }
    ]
  },
  
  'hotels-resorts': {
    amenities: [
      { id: 'spa-wellness', label: 'Spa & Wellness Center', category: 'amenity' },
      { id: 'fitness-center', label: 'State-of-Art Fitness Center', category: 'amenity' },
      { id: 'swimming-pool', label: 'Swimming Pool Complex', category: 'amenity' },
      { id: 'restaurants-bars', label: 'Multiple Restaurants & Bars', category: 'amenity' },
      { id: 'conference-facilities', label: 'Conference & Event Facilities', category: 'amenity' },
      { id: 'concierge-services', label: 'Concierge Services', category: 'amenity' },
      { id: 'valet-parking', label: 'Valet Parking Service', category: 'amenity' },
      { id: 'room-service', label: '24/7 Room Service', category: 'amenity' }
    ],
    features: [
      { id: 'luxury-accommodations', label: 'Luxury Accommodations', category: 'feature' },
      { id: 'scenic-location', label: 'Scenic Location/Views', category: 'feature' },
      { id: 'business-travel-ready', label: 'Business Travel Optimized', category: 'feature' },
      { id: 'leisure-destination', label: 'Leisure Destination', category: 'feature' },
      { id: 'brand-affiliation-luxury', label: 'Luxury Brand Affiliation', category: 'feature' },
      { id: 'event-hosting', label: 'Large Event Hosting Capable', category: 'feature' },
      { id: 'extended-stay-services', label: 'Extended Stay Services', category: 'feature' }
    ]
  },
  
  'mixed-use-complexes': {
    amenities: [
      { id: 'shared-facilities', label: 'Shared Common Facilities', category: 'amenity' },
      { id: 'parking-garage', label: 'Multi-Level Parking Garage', category: 'amenity' },
      { id: 'retail-shopping', label: 'Integrated Retail Shopping', category: 'amenity' },
      { id: 'dining-options', label: 'Multiple Dining Options', category: 'amenity' },
      { id: 'transit-access', label: 'Direct Transit Access', category: 'amenity' },
      { id: 'green-spaces-mixed', label: 'Integrated Green Spaces', category: 'amenity' },
      { id: 'community-center', label: 'Community Center', category: 'amenity' },
      { id: 'childcare-facilities', label: 'Childcare Facilities', category: 'amenity' }
    ],
    features: [
      { id: 'walkable-community', label: 'Walkable Community Design', category: 'feature' },
      { id: 'live-work-play', label: 'Live-Work-Play Integration', category: 'feature' },
      { id: 'sustainable-development', label: 'Sustainable Development', category: 'feature' },
      { id: 'smart-building-tech', label: 'Smart Building Technology', category: 'feature' },
      { id: 'diverse-tenant-mix', label: 'Diverse Tenant Mix', category: 'feature' },
      { id: 'urban-revitalization', label: 'Urban Revitalization Project', category: 'feature' },
      { id: 'future-expansion', label: 'Future Expansion Capability', category: 'feature' }
    ]
  },
  
  // Legacy categories for backward compatibility
  'commercial': {
    amenities: [
      { id: 'elevator-access', label: 'Elevator Access', category: 'amenity' },
      { id: 'parking-commercial', label: 'Parking Facilities', category: 'amenity' },
      { id: 'security-commercial', label: 'Security Systems', category: 'amenity' },
      { id: 'hvac-commercial', label: 'HVAC Systems', category: 'amenity' },
      { id: 'conference-rooms', label: 'Conference Rooms', category: 'amenity' },
      { id: 'reception-area', label: 'Reception Area', category: 'amenity' }
    ],
    features: [
      { id: 'prime-location', label: 'Prime Business Location', category: 'feature' },
      { id: 'public-transport', label: 'Public Transport Access', category: 'feature' },
      { id: 'flexible-layout', label: 'Flexible Floor Layout', category: 'feature' },
      { id: 'modern-infrastructure', label: 'Modern Infrastructure', category: 'feature' }
    ]
  },
  
  'holiday-homes': {
    amenities: [
      { id: 'private-pool', label: 'Private Swimming Pool', category: 'amenity' },
      { id: 'garden-outdoor', label: 'Garden & Outdoor Space', category: 'amenity' },
      { id: 'fully-furnished', label: 'Fully Furnished', category: 'amenity' },
      { id: 'wifi-entertainment', label: 'WiFi & Entertainment Systems', category: 'amenity' },
      { id: 'kitchen-facilities', label: 'Full Kitchen Facilities', category: 'amenity' },
      { id: 'cleaning-service', label: 'Cleaning Service Available', category: 'amenity' }
    ],
    features: [
      { id: 'vacation-rental-ready', label: 'Vacation Rental Ready', category: 'feature' },
      { id: 'scenic-views', label: 'Scenic Views', category: 'feature' },
      { id: 'privacy', label: 'Privacy & Seclusion', category: 'feature' },
      { id: 'tourist-attractions-nearby', label: 'Tourist Attractions Nearby', category: 'feature' }
    ]
  },
  
  'residential': {
    amenities: [
      { id: 'gym-fitness', label: 'Gym & Fitness Center', category: 'amenity' },
      { id: 'swimming-pool-residential', label: 'Swimming Pool', category: 'amenity' },
      { id: 'playground', label: 'Children\'s Playground', category: 'amenity' },
      { id: 'security-guard', label: '24/7 Security', category: 'amenity' },
      { id: 'visitor-parking', label: 'Visitor Parking', category: 'amenity' },
      { id: 'maintenance-service', label: 'Maintenance Services', category: 'amenity' }
    ],
    features: [
      { id: 'family-friendly', label: 'Family-Friendly Community', category: 'feature' },
      { id: 'school-proximity', label: 'Near Good Schools', category: 'feature' },
      { id: 'gated-community', label: 'Gated Community', category: 'feature' },
      { id: 'resale-value', label: 'Strong Resale Value', category: 'feature' }
    ]
  },
  
  'land': {
    amenities: [
      { id: 'utilities-available', label: 'Utilities Available', category: 'amenity' },
      { id: 'road-access', label: 'Paved Road Access', category: 'amenity' },
      { id: 'water-supply', label: 'Water Supply Connection', category: 'amenity' },
      { id: 'electricity-connection', label: 'Electricity Connection', category: 'amenity' }
    ],
    features: [
      { id: 'development-potential', label: 'High Development Potential', category: 'feature' },
      { id: 'zoning-approved', label: 'Zoning Approved', category: 'feature' },
      { id: 'investment-opportunity', label: 'Investment Opportunity', category: 'feature' },
      { id: 'future-appreciation', label: 'Future Appreciation Potential', category: 'feature' }
    ]
  }
};

// Helper functions
export const getAmenitiesForCategory = (category: string): AmenityFeature[] => {
  return categorySpecificAmenitiesFeatures[category]?.amenities || [];
};

export const getFeaturesForCategory = (category: string): AmenityFeature[] => {
  return categorySpecificAmenitiesFeatures[category]?.features || [];
};

export const getAllAmenitiesFeatures = (category: string) => {
  return categorySpecificAmenitiesFeatures[category] || { amenities: [], features: [] };
};
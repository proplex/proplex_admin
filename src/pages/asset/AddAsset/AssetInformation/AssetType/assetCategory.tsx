

import { Building, Home, Car, LandPlot } from 'lucide-react';

export const assetCategory = () => {
  return [
    {
      type: 'button',
      name: 'category',
      icon: <Building className='w-8 h-8' />,
      className: 'h-32 w-full',
      label: 'Commercial',
      value: 'commercial',
    },
    {
      type: 'button',
      name: 'category',
      icon: <Home className='w-8 h-8' />,
      className: 'h-32 w-full',
      label: 'Holiday Homes',
      value: 'holiday-homes',
    },
    {
      type: 'button',
      name: 'category',
      icon: <Car className='w-8 h-8' />,
      className: 'h-32 w-full',
      label: 'Residential',
      value: 'residential',
    },
    {
      type: 'button',
      name: 'category',
      icon: <LandPlot className='w-8 h-8' />,
      className: 'h-32 w-full',
      label: 'Land',
      value: 'land',
      disabled: true,
    },
  ];
};

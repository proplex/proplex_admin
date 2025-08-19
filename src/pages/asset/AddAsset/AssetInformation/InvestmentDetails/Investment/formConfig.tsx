

import { FormFieldConfig } from '@/components/UseForm/ControllerMap';
import { useFormContext } from 'react-hook-form';

export const formConfig = (): FormFieldConfig[] => {
  const { control } = useFormContext();
  return [
    {
      type: 'number',
      name: 'investmentPerformance.targetCapitalAppreciation',
      control,
      label: 'Target Capital Appreciation',
      placeholder: 'Enter Target Capital Appreciation',
    },
    {
      type: 'number',
      name: 'investmentPerformance.estimatedReturnsAsPerLockInPeriod',
      control,
      label: 'Select Number of Years',
      placeholder: 'Enter Number of Years',
    },
  ];
};

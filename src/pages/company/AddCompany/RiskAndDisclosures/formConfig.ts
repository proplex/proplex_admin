import { useFormContext } from 'react-hook-form';
import { FormFieldConfig } from '@/components/UseForm/ControllerMap';

export const riskFormConfig = (): FormFieldConfig[] => {
  const { control } = useFormContext();
   return  [
  {
    name: 'risk_disclosure',
    label: 'Risk & Disclosure Statement',
    control,
    type: 'textarea',
    placeholder: 'Describe the key risks and disclosures related to your company...',
    rules: {
      required: 'Risk disclosure is required',
      maxLength: {
        value: 1000,
        message: 'Risk disclosure should not exceed 1000 characters',
      },
    },
    bottomText: 'Provide a comprehensive overview of material risks, including market, operational, and regulatory risks'
  },
];
};
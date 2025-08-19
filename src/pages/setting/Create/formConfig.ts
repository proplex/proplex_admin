

import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';

interface FormData {
  name: string;
  value: string;
}

interface FormFieldConfig {
  label: string;
  name: keyof FormData;
  type: string;
  control: Control<FormData>;
  setValue?: UseFormSetValue<FormData>;
  watch?: UseFormWatch<FormData>;
  clearErrors?: (name?: keyof FormData | (keyof FormData)[]) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const formConfig = ({
  control,
  setValue,
  watch,
  clearErrors,
}: {
  control: Control<FormData>;
  setValue?: UseFormSetValue<FormData>;
  watch?: UseFormWatch<FormData>;
  clearErrors?: (name?: keyof FormData | (keyof FormData)[]) => void;
}): FormFieldConfig[] => [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    control,
  },
  {
    label: 'Value',
    name: 'value',
    type: 'text',
    control,
 
  },
];

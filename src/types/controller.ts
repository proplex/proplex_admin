

import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';

export interface InputControllerProps {
  field: {
    id: string;
    key: string;
    name: string;
    label: string;
    placeholder: string;
    type: 'text' | 'number' | 'email' | 'password' | 'url';
    isRequired: boolean;
    defaultValue?: string | null | number;
    gridCols: number;
    isHidden?: boolean;
    additionalLabels: string
    disabled?: boolean; 
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  setError?: any;
  clearErrors?: any;
  errors?: Record<string, { message: string }> | {};
}

export interface SelectControllerProps {
  field: {
    id: string;
    key: string;
    name: string;
    label: string;
    options: Array<{ value: string ; label: string }>; // Define options type
    isRequired: boolean;
    controlType: 'select';
    defaultValue: string | null;
    gridCols?: number;
    isHidden?: boolean;
  };
  control: any; // Replace with the correct type for control if available
  setValue: (name: string, value: any) => void;
  watch: (name: string) => any;
  setError: (name: string, error: any) => void;
  clearErrors: (name: string) => void;
  errors: Record<string, any>; // Adjust based on your error object type
}

export interface CheckboxControllerProps {
  field: {
    id: string;
    key: string;
    name: string;
    label: string;
    isRequired: boolean;
    defaultValue: boolean;
    gridCols?: number;
    isHidden?: boolean;
  };
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  setError?: any;
  clearErrors?: any;
  errors?: Record<string, { message: string }> | {};
}

export interface TextareaControllerProps {
  id: string;
  field: {
    id: string;
    key: string;
    name: string;
    label: string;
    placeholder: string;
    isRequired: boolean;
    gridCols?: number;
    isHidden?: boolean;
  };
  name: string;
  label: string;
  placeholder?: string;
  isRequired?: boolean;
  control: any;
  errors?: Record<string, { message: string }>;
  defaultValue?: string | number;
  [key: string]: any;
}

export interface FileControllerProps {
  field: {
    id: string;
    key: string;
    name: string;
    label: string;
    isRequired: boolean;
    defaultValue?: string;
    gridCols: number;
    noOfFiles: number;
    accept: string[];
    isHidden?: boolean;
  };
  control: any;
  setValue: (name: string, value: any, options?: any) => void;
  watch: (name: string) => any;
  setError: (name: string, error: any, options?: any) => void;
  clearErrors: (name: string) => void;
  errors: any;
}

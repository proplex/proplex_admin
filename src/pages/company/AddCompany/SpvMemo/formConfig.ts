import { FormFieldConfig } from "@/components/UseForm/ControllerMap";


// Define the formConfig function with the parameter type and return type
const formConfig = ({control}: { control: any }): FormFieldConfig[] => [
  {
    name: 'spv_memo',
    label: 'SPV Memo Details',
    type: 'textarea',
    control,
    placeholder: 'Describe the purpose, structure, and key details of the Special Purpose Vehicle...',
    rules: {
      required: 'SPV Memo is required',
      maxLength: {
        value: 1000,
        message: 'SPV Memo should not exceed 1000 characters',
      },
    },
    bottomText: 'Provide comprehensive details about the SPV including its purpose, structure, and relationship to the main entity'
  },
];

export default formConfig;
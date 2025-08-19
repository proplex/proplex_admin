import { FormFieldConfig } from "@/components/UseForm/ControllerMap";


// Define the formConfig function with the parameter type and return type
const formConfig = ({control}: { control: any }): FormFieldConfig[] => [
  {
    name: 'spv_memo',
    label: 'SPV Memo',
    type: 'textarea',
    control,
    rules: {
      required: 'SPV Memo is required',
      maxLength: {
        value: 500,
        message: 'SPV Memo should not exceed 500 characters',
      },
    },
  },
];

export default formConfig;

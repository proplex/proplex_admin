import { FormFieldConfig } from '@/components/UseForm/ControllerMap';
import { AdvisorType } from '@/constants/global';
import { useFormContext } from 'react-hook-form';

const formConfig = ({ index }: { index: number }): FormFieldConfig[] => {
  const { control } = useFormContext();
  return [
    {
      name: `LLPAdvisorsMembers.${index}.name`,
      label: 'Full Name',
      type: 'text',
      control,
      placeholder: 'Enter the legal advisor\'s full name',
      rules: {
        required: 'Name is required',
        pattern: {
          value: /^[a-zA-Z\s]*$/,
          message: 'Only letters and spaces are allowed',
        },
      },
      bottomText: 'Enter the full legal name of the advisor'
    },
    {
      name: `LLPAdvisorsMembers.${index}.firm`,
      label: 'Law Firm',
      type: 'text',
      control,
      placeholder: 'e.g., Smith & Associates LLP',
      rules: {
        required: 'Law firm is required',
      },
      bottomText: 'The name of the law firm the advisor represents'
    },
    {
      name: `LLPAdvisorsMembers.${index}.email`,
      label: 'Email Address',
      type: 'email',
      control,
      placeholder: 'e.g., advisor@lawfirm.com',
      rules: {
        required: 'Email is required',
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: 'Invalid email address',
        },
      },
      bottomText: 'Official email for legal communications'
    },
    {
      name: `LLPAdvisorsMembers.${index}.phone_number`,
      label: 'Phone Number',
      type: 'tel',
      control,
      placeholder: 'e.g., +1 (555) 123-4567',
      rules: {
        required: 'Phone number is required',
        pattern: {
          value: /^[0-9+\-\s\(\)]*$/,
          message: 'Invalid phone number format',
        },
      },
      bottomText: 'Include country code for international numbers'
    },
    {
      name: `LLPAdvisorsMembers.${index}.area_of_expertise`,
      label: 'Area of Expertise',
      type: 'text',
      control,
      placeholder: 'e.g., Corporate Law, Tax Law, Real Estate',
      bottomText: 'Specify the advisor\'s legal specializations'
    },
    {
      name: `LLPAdvisorsMembers.${index}.type`,
      label: 'Advisor Type',
      type: 'select',
      options: AdvisorType,
      control,
      rules: {
        required: 'Advisor type is required',
      },
      bottomText: 'Select the category that best describes this advisor'
    },
    {
      name: `LLPAdvisorsMembers.${index}.note`,
      label: 'Admin Notes',
      type: 'textarea',
      control,
      placeholder: 'Add any additional notes about this advisor...',
      rules: {
        maxLength: {
          value: 200,
          message: 'Note should not exceed 200 characters',
        },
      },
      bottomText: 'Private notes for administrative purposes only'
    },
  ];
};
export default formConfig;
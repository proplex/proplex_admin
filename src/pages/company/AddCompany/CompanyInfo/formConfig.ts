import { FormFieldConfig } from '@/components/UseForm/ControllerMap';
import { IncorporationType, InstrumentOptions, IndustryOptions } from '@/constants/global';
import { capitalizeFirstLetter } from '@/helpers/global';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const formConfig = (): FormFieldConfig[] => {
  const { id = null } = useParams();
  const { control, watch } = useFormContext();
  const incorporation_type = watch('incorporation_type');
  const isPrivate = incorporation_type === 'private limited';
  const isEdit = id ? true : false;
  
  return [
    {
      name: 'name',
      label: 'Company Name',
      type: 'text',
      control,
      placeholder: 'Enter company name',
      rules: {
        required: 'Company name is required',
        pattern: {
          value: /^[A-Za-z\s]+$/i,
          message: 'Only letters are allowed',
        },
      },
      disabled: isEdit,
      fullWidth: true,
    },
    {
      name: 'industry',
      label: 'Industry',
      type: 'select',
      options: IndustryOptions,
      control,
      placeholder: 'Select industry',
      rules: {
        required: 'Industry is required',
      },
    },
    {
      name: 'instrument',
      label: 'Instrument',
      type: 'select',
      options: InstrumentOptions,
      control,
      placeholder: 'Select instrument',
      rules: {
        required: 'Instrument is required',
      },
    },
    {
      name: 'incorporation_type',
      label: 'Incorporation Type',
      type: 'select',
      options: IncorporationType,
      control,
      placeholder: 'Select incorporation type',
    },
    
    // Contact Information
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      control,
      placeholder: 'company@example.com',
      rules: {
        required: 'Email is required',
        pattern: {
          value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
          message: 'Invalid email address',
        },
      },
      disabled: isEdit,
      fullWidth: true,
    },
    {
      name: 'pan_number',
      label: 'PAN Number',
      type: 'text',
      control,
      placeholder: 'ABCDE1234F',
      rules: {
        required: 'PAN number is required',
        pattern: {
          value: /[A-Z]{5}[0-9]{4}[A-Z]{1}/,
          message: 'Invalid PAN number (e.g. ABCDE1234F)',
        },
      },
      disabled: isEdit,
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      control,
      placeholder: '9876543210',
      rules: {
        required: 'Phone number is required',
        pattern: {
          value: /^[0-9]{10}$/i,
          message: 'Invalid phone number (10 digits required)',
        },
      },
      disabled: isEdit,
    },
    
    // Location Information
    {
      name: 'address',
      label: 'Address',
      type: 'textarea',
      control,
      placeholder: 'Enter complete address',
      fullWidth: true,
      rules: {
        required: 'Address is required',
      },
    },
    {
      name: 'city',
      label: 'City',
      type: 'text',
      control,
      placeholder: 'Enter city',
      rules: {
        required: 'City is required',
        pattern: {
          value: /^[A-Za-z\s]+$/i,
          message: 'Only letters are allowed',
        },
      },
    },
    {
      name: 'state',
      label: 'State',
      type: 'text',
      control,
      placeholder: 'Enter state',
      rules: {
        required: 'State is required',
        pattern: {
          value: /^[A-Za-z\s]+$/i,
          message: 'Only letters are allowed',
        },
      },
    },
    {
      name: 'pincode',
      label: 'Pincode',
      type: 'text',
      control,
      placeholder: '123456',
      rules: {
        required: 'Pincode is required',
        pattern: {
          value: /^[0-9]{6}$/i,
          message: 'Invalid pincode (6 digits required)',
        },
      },
    },
    
    // Document Uploads
    {
      name: 'llp_agreement_copy',
      label: `Upload ${capitalizeFirstLetter(incorporation_type)} Document`,
      type: 'file',
      noOfFiles: 1,
      accept: ['image/*', '.pdf'],
      control,
      hidden: isPrivate,
      fullWidth: true,
    },
    {
      name: 'moa',
      label: 'MOA Document',
      type: 'file',
      noOfFiles: 1,
      accept: ['image/*', '.pdf'],
      control,
      hidden: !isPrivate,
      fullWidth: true,
    },
    {
      name: 'aoi',
      label: 'AOI Document',
      type: 'file',
      noOfFiles: 1,
      accept: ['image/*', '.pdf'],
      control,
      hidden: !isPrivate,
      fullWidth: true,
    },
  ];
};

export default formConfig;
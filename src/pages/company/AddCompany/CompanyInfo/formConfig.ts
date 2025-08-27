import { FormFieldConfig } from '@/components/UseForm/ControllerMap';
import { IncorporationType, InstrumentOptions, IndustryOptions } from '@/constants/global';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const formConfig = (): FormFieldConfig[] => {
  const { id = null } = useParams();
  const { control, watch } = useFormContext();
  const incorporation_type = watch('incorporation_type');
  const isPrivate = incorporation_type === 'private limited';
  const isEdit = id ? true : false;
  
  return [
    // Company Info
    {
      name: 'name',
      label: 'Company Name',
      type: 'text',
      control,
      placeholder: 'Enter company name',
      rules: { required: 'Company name is required' },
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
      rules: { required: 'Industry is required' },
    },
    {
      name: 'instrument',
      label: 'Instrument',
      type: 'select',
      options: InstrumentOptions,
      control,
      placeholder: 'Select instrument',
      rules: { required: 'Instrument is required' },
    },
    {
      name: 'incorporation_type',
      label: 'Incorporation Type',
      type: 'select',
      options: IncorporationType,
      control,
      placeholder: 'Select incorporation type',
    },
    {
      name: 'jurisdiction',
      label: 'Jurisdiction / Country',
      type: 'text',
      control,
      placeholder: 'Enter jurisdiction',
      rules: { required: 'Jurisdiction is required' },
    },

    // SPV Info
    {
      name: 'spv_type',
      label: 'SPV Type',
      type: 'select',
      options: [
        { value: 'asset_holding', label: 'Asset-Holding SPV' },
        { value: 'project_specific', label: 'Project-Specific SPV' },
        { value: 'investment', label: 'Investment SPV' },
        { value: 'joint_venture', label: 'Joint-Venture SPV' },
      ],
      control,
      placeholder: 'Select SPV type',
      rules: { required: 'SPV type is required' },
    },

    // Contact
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      control,
      placeholder: 'company@example.com',
      rules: { required: 'Email is required' },
      disabled: isEdit,
      fullWidth: true,
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      control,
      placeholder: '+1 234 567 890',
      rules: { required: 'Phone number is required' },
      disabled: isEdit,
    },
    {
      name: 'address',
      label: 'Registered Address',
      type: 'textarea',
      control,
      placeholder: 'Enter full address',
      fullWidth: true,
      rules: { required: 'Address is required' },
    },

    // Compliance
    {
      name: 'registration_number',
      label: 'Company Registration Number / Tax ID',
      type: 'text',
      control,
      placeholder: 'Enter registration number',
      rules: { required: 'Registration number is required' },
    },

    // Documents
    {
      name: 'certificate_of_incorporation',
      label: 'Certificate of Incorporation',
      type: 'file',
      noOfFiles: 1,
      accept: ['image/*', '.pdf'],
      control,
      fullWidth: true,
      rules: { required: 'Certificate of Incorporation is required' },
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
      name: 'aoa',
      label: 'AOA Document',
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



import { FormFieldConfig } from '@/components/UseForm/ControllerMap';
import { IncorporationType, InstrumentOptions } from '@/constants/global';
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
      rules: {
        required: 'Company name is required',
        pattern: {
          value: /^[A-Za-z\s]+$/i,
          message: 'Only letters are allowed',
        },
      },
      disabled: isEdit,
    },
    {
      name: 'instrument',
      label: 'Instrument',
      type: 'select',
      options: InstrumentOptions,
      control,
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
    },
    {
      name: 'llp_agreement_copy',
      label: `Upload ${capitalizeFirstLetter(incorporation_type)} Document`,
      type: 'file',
      noOfFiles: 1,
      accept: ['image/*', '.pdf'],
      control,
      hidden: isPrivate,
    },
    {
      name: 'moa',
      label: 'MOA Document',
      type: 'file',
      noOfFiles: 1,
      accept: ['image/*', '.pdf'],
      control,
      hidden: !isPrivate,
    },
    {
      name: 'aoi',
      label: 'AOI Document',
      type: 'file',
      noOfFiles: 1,
      accept: ['image/*', '.pdf'],
      control,
      hidden: !isPrivate,
    },

    {
      name: 'email',
      label: 'Email',
      type: 'email',
      control,
      rules: {
        required: 'Email is required',
        pattern: {
          value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
          message: 'Invalid email address',
        },
      },
      disabled: isEdit,
    },
    {
      name: 'pan_number',
      label: 'PAN Number',
      type: 'text',
      control,
      rules: {
        required: 'PAN number is required',
        pattern: {
          value: /[A-Z]{5}[0-9]{4}[A-Z]{1}/,
          message: 'Invalid PAN number',
        },
      },
      disabled: isEdit,
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'tel',
      control,
      rules: {
        required: 'Phone number is required',
        pattern: {
          value: /^[0-9]{10}$/i,
          message: 'Invalid phone number',
        },
      },
      disabled: isEdit,
    },
    {
      name: 'city',
      label: 'City',
      type: 'text',
      control,
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
      rules: {
        required: 'Pincode is required',
        pattern: {
          value: /^[0-9]{6}$/i,
          message: 'Invalid pincode',
        },
      },
    },
    {
      name: 'address',
      label: 'Address',
      type: 'textarea',
      control,
      fullWidth: true,
    },
  ];
};

export default formConfig;

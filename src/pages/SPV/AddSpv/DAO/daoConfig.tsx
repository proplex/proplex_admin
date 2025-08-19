

import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export const daoFormConfig = () => {
  const { control } = useFormContext<any>();
  return [
  
    {
      label: 'DAO Name',
      name: `daoConfiguration.daoName`,
      type: 'text',
      fullWidth: false,
      control,
      rules: {
        required: 'DAO Name is required',
        maxLength: {
          value: 50,
          message: 'DAO Name cannot exceed 50 characters',
        },
      },
    },
    {
      label: 'Token Symbol',
      name: `daoConfiguration.tokenSymbol`,
      type: 'text',
      fullWidth: false,
      control,
      rules: {
        required: 'Token Symbol is required',
        maxLength: {
          value: 10,
          message: 'Token Symbol cannot exceed 10 characters',
        },
      },
    },
  ];
};

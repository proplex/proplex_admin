import React from 'react'
import { Building2 } from 'lucide-react'
import FormGenerator from '@/components/UseForm/FormGenerator'
import { formConfig } from './formConfig'
import { useFormContext } from 'react-hook-form';
const index = () => {
    const { control } = useFormContext<any>();
  return (
    <div className='p-4  rounded-lg'>
      <div className=' flex items-center gap-2'>
        <Building2 />
        <h1 className='text-2xl font-bold'>Basic Information</h1>
      </div>
      <span className='text-sm text-gray-500'>
        Enter the basic information for the SPV or LLC
      </span>
      <div className='grid grid-cols-2 gap-4 mt-4'>
        {FormGenerator(formConfig())}
      </div>
    </div>
  );
}

export default index

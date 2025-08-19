

import { useFormContext } from 'react-hook-form';
import { riskFormConfig } from './formConfig';
import FormGenerator from '@/components/UseForm/FormGenerator';

const Index = () => {
  return (
    <div>
      <h1 className='text-2xl font-semibold text-gray-800 mb-4'>Risk</h1>
      <div className='grid grid-cols-1 gap-6'>
        {FormGenerator(riskFormConfig())}
      </div>
    </div>
  );
};

export default Index;

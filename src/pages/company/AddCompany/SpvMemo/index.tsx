

import formConfig from './formConfig';
import FormGenerator from '@/components/UseForm/FormGenerator';
import { useFormContext } from 'react-hook-form';

const Index = () => {
  const { control } = useFormContext();
  return (
    <div>
      <h1 className='text-2xl font-semibold text-gray-800 mb-4'>SPV Memo</h1>
      <div className='grid grid-cols-1 gap-6'>
        {FormGenerator(formConfig({ control }))}
      </div>
    </div>
  );
};

export default Index;

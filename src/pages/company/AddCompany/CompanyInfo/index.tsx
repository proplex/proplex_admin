
import FormGenerator from '@/components/UseForm/FormGenerator';
import formConfig from './formConfig';

const Index = () => {
  return (
    <div>
      <h1 className='text-2xl font-semibold text-gray-800 mb-4'>
        Company Information
      </h1>
      <div className='grid grid-cols-2 gap-6'>
        {FormGenerator(formConfig())}
      </div>
    </div>
  );
};

export default Index;

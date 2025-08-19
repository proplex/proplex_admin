import React from 'react'
import FormGenerator from '@/components/UseForm/FormGenerator';
import formConfig from './formConfig';  


const AssetHostedBy = () => {
  return (
    <div>
      <div>
        <h1 className='text-2xl font-bold mb-2'>Asset Hosted By</h1>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        {FormGenerator(formConfig())}
      </div>
    </div>
  );
}

export default AssetHostedBy

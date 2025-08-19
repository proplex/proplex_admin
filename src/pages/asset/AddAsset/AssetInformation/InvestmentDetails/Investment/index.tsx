import React from 'react'
import { useForm } from 'react-hook-form'
import { formConfig } from './formConfig'
import FormGenerator from '@/components/UseForm/FormGenerator'
import Collapseble from '@/components/ui/collapse'
import InfoTag from '@/components/cards/asset/InfoTag'
import { ChartLine } from 'lucide-react';

const index = () => {
  const methods = useForm();
  const control = methods.control;
  const data = [
    {
      name: 'Target IRR',
      tag: 'Gross',
      amount: '$787,500',
    },
    {
      name: 'Yearly Return',
      tag: 'Net',
      amount: '$708,570',
    },
    {
      name: 'Investment Multipler',
      tag: 'Gross',
      amount: '1.1X',
    },
    {
      name: 'Investment Multipler',
      tag: 'Net',
      amount: '1.0X',
    },
  ];
  const capitalGainData = [
    {
      name: 'Capital Gains',
      tag: 'LTCG:12.5%',
      amount: '$98,456',
    },
    {
      name: 'Capital Gains',
      tag: 'LTCG:30.0%',
      amount: '$234,567',
    },
  ];
  return (
    <div>
      <h1 className='text-2xl font-bold'>Investment Performance</h1>
      <div className='grid grid-cols-2 gap-4'>
        {FormGenerator(formConfig())}
      </div>
      <InfoTag
        info='Estimated SALE Price (1 Year)'
        amount='$100,000'
        icon={<ChartLine />}
      />
      <InfoTag
        info='Estimated Return (1 Years)'
        amount='$100,000'
        icon={<ChartLine />}
      />
    </div>
  );
};

export default index

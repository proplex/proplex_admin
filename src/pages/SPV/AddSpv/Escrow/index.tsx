import FormGenerator from '@/components/UseForm/FormGenerator'
import { Banknote, Info } from 'lucide-react'
import React from 'react'
import { formConfig } from './formConfig'

const index = () => {
  return (
    <div className="p-4 bg-white  border-gray-100">
      <div className="flex items-center gap-3 rounded-lg">
        <Banknote className="text-black " />
        <h1 className="text-xl font-extrabold text-gray-800">Escrow Bank Details</h1>
      </div>
      <span className="block text-md text-gray-600 ">
        Add the bank details for the escrow account for SPV
      </span>
      <div className="border p-2 rounded-xl flex flex-col gap-1 mt-5">
        <div className="flex items-center gap-3 text-black">
          <Info size={16} className="stroke-2"/> 
          <h2 className="text-lg font-bold">Important</h2>
        </div>
        <span className="text-sm text-gray-700 pl-6">
          Ensure that the bank account is specifically set up for the SPV and separated from personal or other business accounts.
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {FormGenerator(formConfig())}
      </div>
    </div>
  )
}

export default index

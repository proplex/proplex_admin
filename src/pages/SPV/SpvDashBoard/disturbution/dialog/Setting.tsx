import { Button } from '@/components/ui/button'
import FormGenerator from '@/components/UseForm/FormGenerator'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { seetingFormConfig } from './seetingFormConfig'

const Setting = () => {
  const methods = useForm()
  return (
    <div className=''>
      <FormProvider {...methods}>
        {/* <div className="grid grid-cols-2 gap-4"> */}
          <form className='grid grid-cols-2 gap-4'>
            {FormGenerator(seetingFormConfig({ control: methods.control }))}
            
          </form>

        {/* </div> */}
      </FormProvider>
    </div>
  )
}

export default Setting

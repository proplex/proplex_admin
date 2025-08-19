

// ** @format */

import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { formConfig } from './formConfig';
import { X } from 'lucide-react';
import FormGenerator from '@/components/UseForm/FormGenerator';
import useEmployee from '@/hooks/useEmployee';
import { useNavigate, useParams } from 'react-router-dom';

function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addEmployee } = useEmployee();
  const methods = useForm();
  const { control } = methods;

  const onSubmit = async (data: any) => {
    try {
      await addEmployee({
        ...data,
        avatar: data.avatar_file,
      });
    } catch (error: any) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className='flex flex-col p-6 gap-4'>
      <div className='w-full text-black flex justify-between'>
        <h1 className='text-2xl font-bold'>
          {id ? 'Edit Employee' : 'Add Employee'}
        </h1>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className='rounded-lg flex-1 overflow-y-auto space-y-4'
        >
          <div className='grid grid-cols-2 gap-4'>
            {FormGenerator(formConfig({ control }))}
          </div>
          <div className='flex justify-end gap-4'>
            <Button type='submit' className=''>
              Submit
            </Button>
            <Button type='button' onClick={handleCancel} variant='outline'>
              Cancel
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default EmployeeForm;



import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useForm, FormProvider } from 'react-hook-form';
import { feeConfig } from './formConfig';
import FormGenerator from '@/components/UseForm/FormGenerator';
import useEOI from '@/hooks/useEOI';

const Add: React.FC<any> = ({ selectedItem, setSelectedItem, fetchEois }) => {
  const isEdit = !!selectedItem?.id;
  const { status, createEoi } = useEOI();

  const methods = useForm({
    values: {
      value: selectedItem?.value || '',
      type: selectedItem?.type?.toString() || '',
    },
  });

  const onFormSubmit = async (data: any) => {
    const { value, type } = data;
    if (!value || !type) return;
    const payload = {
      value,
      type: parseInt(type),
    };
    await createEoi(payload);
    fetchEois();
    setSelectedItem(null);
    methods.reset();
  };

  const handleOnClose = () => {
    setSelectedItem(null);
  };

  return (
    <Dialog open={!!selectedItem} onOpenChange={handleOnClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit EOI' : 'Add EOI'}</DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <div className='space-y-4'>
            <form onSubmit={methods.handleSubmit(onFormSubmit)}>
              {FormGenerator(
                feeConfig({
                  control: methods.control,
                })
              )}
              <div className='flex justify-end mt-2 gap-3'>
                <Button type='button' variant='outline' onClick={handleOnClose}>
                  Cancel
                </Button>
                <Button type='submit' disabled={status === 'creating'}>
                  {status === 'creating' ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </form>
          </div>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default Add;

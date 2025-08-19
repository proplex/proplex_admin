
import React from 'react';
import { formConfig } from './formConfig';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import FormGenerator from '@/components/UseForm/FormGenerator';
import { Button } from '@/components/ui/button';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import useCrud from '@/hooks/useCrud';

interface IndexProps {
  selectedItem: any;
  setSelectedItem: (item: any) => void;
  refetch: () => void;
}

const Index: React.FC<IndexProps> = ({
  selectedItem,
  setSelectedItem,
  refetch,
}) => {
  const { save } = useCrud('percentage');
  const methods = useForm({
    values: selectedItem,
  });
  const isOpen = selectedItem !== null;
  const isUpdate = selectedItem?.id;
  const handleClose = () => setSelectedItem(null);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    save(data).then((response) => {
      if (response) {
        refetch();
        handleClose();
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? 'Update Fee Percentage' : 'Create Fee Percentage'}
          </DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <div className='grid grid-cols-1 gap-6'>
            <FormProvider {...methods}>
              <form
                className='bg-white rounded-lg'
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                {FormGenerator(formConfig({ control: methods.control }))}
                <div className='flex justify-end gap-2 mt-3'>
                  <Button type='button' variant='outline' onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button>{isUpdate ? 'Save' : 'Submit'}</Button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Index;

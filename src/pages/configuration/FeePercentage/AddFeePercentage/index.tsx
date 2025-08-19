import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useForm, FormProvider } from 'react-hook-form';
import { feeConfig } from './formConfig';
import FormGenerator from '@/components/UseForm/FormGenerator';
import useFeePercentage from '@/hooks/useFeePercentage';

const AddFeePercentage: React.FC<any> = ({
  selectedItem,
  setSelectedItem,
  updateFee,
  createFee,
}) => {
  const isEdit = !!selectedItem?.id; // Simplified
  const { status } = useFeePercentage();
  const methods = useForm({
    values: {
      name: selectedItem?.name || '',
      value: selectedItem?.value || '',
      type: selectedItem?.type?.toString() || '',
      status: selectedItem?.status || false,
      is_percentage: selectedItem?.is_percentage || false,
    },
  });

  const onFormSubmit = async (data: any) => {
    const { name, value, type, status, is_percentage } = data;
    if (!name || !value || !type) return;
    const payload = {
      name,
      value,
      type: parseInt(type),
      status,
      is_percentage,
    };
    if (isEdit) {
      await updateFee(selectedItem.id, payload);
    } else {
      await createFee(payload);
    }
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
          <DialogTitle>
            {isEdit ? 'Edit Fee Percentage' : 'Add Fee Percentage'}
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <div className='space-y-4'>
            <form onSubmit={methods.handleSubmit(onFormSubmit)}>
              {FormGenerator(feeConfig({ control: methods.control, getValues: methods.getValues }))}
              <div className='flex justify-end mt-2 gap-3'>
                <Button type='button' variant='outline' onClick={handleOnClose}>
                  Cancel
                </Button>
                <Button
                  type='submit'
                  disabled={status === 'creating' || status === 'updating'}
                >
                  {status === 'creating' || status === 'updating'
                    ? 'Saving...'
                    : 'Save'}
                </Button>
              </div>
            </form>
          </div>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default AddFeePercentage;

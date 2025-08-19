
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import FormGenerator from '@/components/UseForm/FormGenerator';
import { formConfig } from './formConfig';
import { useAddBank } from '@/hooks/useAddBank';

interface ModalProps {
  escrow_user_id: any;
  append: any;
  fields: any;
  index: number;
  setIndex: any;
}

const Index: React.FC<ModalProps> = ({
  escrow_user_id,
  append,
  fields,
  index,
  setIndex,
}) => {
  const {
    getValues: formGetValues,
    trigger,
    setValue: setFiledValue,
    clearErrors,
  } = useFormContext<any>();
  const { addBank, isLoading, error } = useAddBank();

  const getPreviousValues = () => {
    if (index !== null) {
      return fields[index];
    }
    return null;
  };

  const onSubmit = () => {
    trigger(`bankAccounts.${index}`).then((isValid) => {
      if (isValid) {
        const data = formGetValues();
        const { bankAccounts } = data;
        const values = bankAccounts[index];
        addBank({ ...values, escrow_user_id }).then((response) => {
          if (response) {
            append({
              ...response.data,
              bank_account: response.data.account_number,
              bank_ifsc: response.data.ifsc_code,
              bank_status: 'active',
            });
            setIndex(null);
            clearErrors();
          }
        });
      }
    });
  };

  const handleOnClose = () => {
    setIndex(null);
    setFiledValue(`bankAccounts.${index}`, getPreviousValues());
    clearErrors();
  };
  const isOpen = index !== null;

  return (
    <Dialog open={!!isOpen} onOpenChange={(open) => !open && handleOnClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Bank Account</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <div className='flex flex-col gap-6'>
            {FormGenerator(formConfig({ index }))}
          </div>
          <div className='flex justify-end gap-2'>
            <Button type='button' variant='outline' onClick={handleOnClose}>
              Cancel
            </Button>
            <Button
              onClick={onSubmit}
              type='button'
              className=''
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Save'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Index;

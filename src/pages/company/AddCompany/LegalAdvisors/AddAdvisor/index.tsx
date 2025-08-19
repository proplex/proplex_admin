
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import formConfig from './formConfig';
import { useUpdateAdvisor } from '@/hooks/useAddAdvisor';
import FormGenerator from '@/components/UseForm/FormGenerator';
import toast from 'react-hot-toast';
interface ModalProps {
  fields: any;
  index: number;
  setIndex: any;
}

const Index: React.FC<ModalProps> = ({ fields, index, setIndex }) => {
  const { updateAdvisor } = useUpdateAdvisor();
  const {
    getValues: formGetValues,
    trigger,
    setValue: setFiledValue,
    clearErrors,
  } = useFormContext<any>();

  const onFormSubmit = async () => {
    trigger(`LLPAdvisorsMembers.${index}`).then((isValid) => {
      if (isValid) {
        const data = formGetValues();
        const { LLPAdvisorsMembers } = data;
        const values = LLPAdvisorsMembers[index];
        updateAdvisor(values).then((response) => {
          if (response) {
            setFiledValue('LLPAdvisorsMembers', response);
            if (index !== -1) {
              toast.success('Advisor updated successfully');
            } else {
              toast.success('Advisor added successfully');
            }
          }
        });
        setIndex(null);
        clearErrors();
      }
    });
  };

  const getPreviousValues = () => {
    if (index !== null) {
      return fields[index];
    }
    return null;
  };

  const handleOnClose = () => {
    setIndex(null);
    setFiledValue(`LLPAdvisorsMembers.${index}`, getPreviousValues());
    clearErrors();
  };

  const isOpen = index !== null;
  const isUpdate = index !== -1;
  return (
    <Dialog open={!!isOpen} onOpenChange={(open) => !open && handleOnClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? 'Edit Advisor' : 'Add New Advisor'}
          </DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <div className='grid grid-cols-2 gap-6'>
            {FormGenerator(formConfig({ index }))}
          </div>
          <div className='flex justify-end gap-2'>
            <Button type='button' variant='outline' onClick={handleOnClose}>
              Cancel
            </Button>
            <Button onClick={onFormSubmit} type='button' className=''>
              {isUpdate ? 'Update' : 'Save'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Index;

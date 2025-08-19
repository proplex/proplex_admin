
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useUpdateDirector } from '@/hooks/useAddBoardMember';
import { useParams } from 'react-router-dom';
import FormGenerator from '@/components/UseForm/FormGenerator';
import { formConfig } from './formConfig';
import toast from 'react-hot-toast';

interface ModalProps {
  update: any;
  append: any;
  fields: any;
  index: number;
  setIndex: any;
}

const Index: React.FC<ModalProps> = ({
  update,
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
  const { id: companyIdParam } = useParams<{ id: string }>();
  const companyId = companyIdParam ? parseInt(companyIdParam, 10) : undefined;
  const { loading, error, updateDirector } = useUpdateDirector();

  const getPreviousValues = () => {
    if (index !== null) {
      return fields[index];
    }
    return null;
  };

  const onSubmit = () => {
    trigger(`LLPBoardMembers.${index}`).then((isValid) => {
      if (isValid) {
        const data = formGetValues();
        const { LLPBoardMembers } = data;
        const values = LLPBoardMembers[index];
        if (index !== -1) {
          if (companyId !== undefined) {
            updateDirector(companyId, values).then((response: any) => {
              if (response) {
                update(index, values);
                toast.success('Board Member updated successfully');
              }
            });
          }
        } else {
          if (companyId !== undefined) {
            updateDirector(companyId, values).then((response: any) => {
              if (response) {
                append({ ...values, updated_at: new Date().toISOString() });
                toast.success('Board Member added successfully');
              }
            });
          }
        }
        setIndex(null);
        clearErrors();
      }
    });
  };

  const handleOnClose = () => {
    setIndex(null);
    setFiledValue(`LLPBoardMembers.${index}`, getPreviousValues());
    clearErrors();
  };
  const isOpen = index !== null;
  const isUpdate = index !== -1;

  return (
    <Dialog open={!!isOpen} onOpenChange={(open) => !open && handleOnClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? 'Edit Board Member' : 'Add Board Member'}
          </DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <div className='flex flex-col gap-6'>
            {FormGenerator(formConfig({ index }))}
          </div>
          <div className='flex justify-end gap-2'>
            <Button type='button' variant='outline' onClick={handleOnClose}>
              Cancel
            </Button>
            <Button onClick={onSubmit} type='button' className=''>
              {isUpdate ? 'Update' : 'Save'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Index;

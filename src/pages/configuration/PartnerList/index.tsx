

import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formConfig } from './formConfig';
import ControllerMap from '@/components/UseForm/ControllerMap';
import FormGenerator from '@/components/UseForm/FormGenerator';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; icon: string }) => Promise<void>;
  partner?: { id?: number; name: string; icon: string } | null;
}

interface FormData {
  name: string;
  icon: string;
  icon_file: string;
}

const PartnerForm: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  partner,
}) => {
  const {
    control,
    setValue,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors, isValid, isDirty },
  } = useForm<any>({
    defaultValues: {
      name: '',
      icon: '',
      icon_file: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (partner) {
      setValue('name', partner.name || '', { shouldValidate: true });
      setValue('icon_file', partner.icon || '', { shouldValidate: true });
    } else {
      reset({
        name: '',
        icon: '',
        icon_file: '',
      });
    }
  }, [partner, setValue, reset]);

  const onFormSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await onSubmit({ name: data.name, icon: data.icon_file });
      reset();
      onClose();
      toast.success('Partner saved successfully!');
    } catch (error) {
      toast.error('Failed to save partner. Please try again!');
    }
  };

  const handleOnClose = () => {
    onClose();
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleOnClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {partner ? 'Edit Partner' : 'Add New Partner'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onFormSubmit)} className='space-y-4'>
          {FormGenerator(formConfig({ control }))}
          <div className='flex justify-end gap-2'>
            <Button type='button' variant='outline' onClick={handleOnClose}>
              Cancel
            </Button>
            <Button type='submit' className='' disabled={!isValid || !isDirty}>
              {partner ? 'Update' : 'Save'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PartnerForm;

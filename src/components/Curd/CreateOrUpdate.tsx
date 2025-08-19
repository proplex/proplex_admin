

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
import { useParams } from 'react-router-dom';
import useCrud from '@/hooks/useCrud';

interface CreateOrUpdateProps {
  index: number;
  setIndex: (index: number | null) => void;
  append: (data: any) => void;
  update: (index: number, data: any) => void;
  fields: any[];
  resource: string; // The resource name for the useCrud hook
  formConfig: (params: { index: number }) => any; // Dynamic form configuration
  title: { add: string; edit: string }; // Title strings for add/edit modes
  fieldKey: string; // The key of the field in the form (e.g., "propertyDocument", "budget")
}

const CreateOrUpdate: React.FC<CreateOrUpdateProps> = ({
  index,
  setIndex,
  append,
  update,
  fields,
  resource,
  formConfig,
  title,
  fieldKey,
}) => {
  const { id: projectId } = useParams();
  const { save } = useCrud(resource);
  const { getValues, trigger, setValue, clearErrors } = useFormContext();
  const getPreviousValues = () => (index !== null ? fields[index] : null);

  const handleFormSubmit = async () => {
    const isValid = await trigger(`${fieldKey}.${index}`);
    if (isValid) {
      const data = getValues();
      const values = index !== null ? data[fieldKey][index] : null;
      const payload = {
        ...values,
        property_id: projectId,
        document_link: values?.document_link_file ?? values?.document_link,
      };

      if (index !== null) {
        const response = await save(payload);
        if (response) {
          index !== -1 ? update(index, response.data) : append(response.data);
        }
      }
      setIndex(null);
      clearErrors();
    }
  };

  const handleClose = () => {
    setIndex(null);
    setValue(`${fieldKey}.${index}`, getPreviousValues());
    clearErrors();
  };

  const isOpen = index !== null;
  const isCreateOrUpdate = index !== -1;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isCreateOrUpdate ? title.edit : title.add}</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <div className='grid grid-cols-1 gap-6'>
            {FormGenerator(formConfig({ index }))}
          </div>
          <div className='flex justify-end gap-2'>
            <Button type='button' variant='outline' onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleFormSubmit}>
              {isCreateOrUpdate ? 'Submit' : 'Save'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrUpdate;

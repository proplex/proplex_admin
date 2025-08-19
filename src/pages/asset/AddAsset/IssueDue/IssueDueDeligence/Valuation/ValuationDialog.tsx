import React from 'react';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { DialogHeader } from '@/components/ui/CustomDialog';
import FormGenerator from '@/components/UseForm/FormGenerator';
import { Button } from '../../../../../../components/ui/button';

const ValuationDialog = ({
  isOpen,
  isEdit,
  index,
  formConfig,
  onSubmit,
  onOpenChange,
}: {
  isOpen: boolean;
  isEdit: boolean;
  index?: number | null;
  formConfig: (index: number) => any;
  onSubmit: () => void;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className='w-[500px] max-w-3xl max-h-[95vh] overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit' : 'Add'} Valuation</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <div className='grid grid-cols-1 gap-4'>
            {FormGenerator(formConfig(index ?? -1))}
          </div>
          <DialogFooter className='flex justify-end w-full mt-4'>
            <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type='button' onClick={onSubmit}>
              Submit
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ValuationDialog;

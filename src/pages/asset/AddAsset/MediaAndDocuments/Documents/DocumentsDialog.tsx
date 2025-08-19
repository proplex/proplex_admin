import React from 'react';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { DialogHeader } from '@/components/ui/CustomDialog';
import FormGenerator from '@/components/UseForm/FormGenerator';
import { Button } from '@/components/ui/button';

interface DocumentsDialogProps {
  isOpen: boolean;
  isEdit: boolean;
  index?: number | null;
  formConfig: (args: { index: number }) => any;
  onSubmit: () => void;
  onOpenChange: () => void;
}

const DocumentsDialog: React.FC<DocumentsDialogProps> = ({
  isOpen,
  isEdit,
  index,
  formConfig,
  onSubmit,
  onOpenChange,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className='w-full max-w-2xl'>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit' : 'Add'} Document</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <div className='grid gap-2'>
            {FormGenerator(formConfig({ index: index ?? -1 }))}
          </div>
          <DialogFooter className='flex justify-end w-full mt-4'>
            <Button type='button' variant='outline' onClick={onOpenChange}>
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

export default DocumentsDialog;

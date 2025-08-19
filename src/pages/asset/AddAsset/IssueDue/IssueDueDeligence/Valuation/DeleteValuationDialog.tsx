import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { DialogHeader } from '@/components/ui/CustomDialog';
import { Button } from '../../../../../../components/ui/button';

interface DeleteValuationDialogProps {
  deleteIndex: number | null;
  onCancel: () => void;
  onDelete: () => void;
}

const DeleteValuationDialog: React.FC<DeleteValuationDialogProps> = ({
  deleteIndex,
  onCancel,
  onDelete,
}) => {
  return (
    <Dialog open={deleteIndex !== null} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-lg font-bold p-2'>
            Delete Valuation
          </DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <p>Are you sure you want to delete this Valuation?</p>
          <div className='flex justify-end gap-2'>
            <Button type='button' variant='outline' onClick={onCancel}>
              Cancel
            </Button>
            <Button type='button' onClick={onDelete}>
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteValuationDialog;

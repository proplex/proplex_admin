import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { DialogHeader } from '@/components/ui/CustomDialog';
import { Button } from '../../../../../../components/ui/button';

interface DeleteStructureDialogProps {
  deleteIndex: number | null;
  onCancel: () => void;
  onDelete: () => void;
}

const DeleteStructureDialog: React.FC<DeleteStructureDialogProps> = ({
  deleteIndex,
  onCancel,
  onDelete,
}) => {
  return (
    <Dialog open={deleteIndex !== null} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-lg font-bold p-2'>
            Delete Structure
          </DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <p>Are you sure you want to delete this Structure?</p>
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

export default DeleteStructureDialog;

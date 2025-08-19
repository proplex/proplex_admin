import React from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type DeleteBoardMemberDialogProps = {
  isDelete: boolean;
  onCancel: () => void;
  onDelete: () => void;
};

const DeleteBoardMemberDialog: React.FC<DeleteBoardMemberDialogProps> = ({ isDelete, onCancel, onDelete }) => {
  return (
    <Dialog open={isDelete} onOpenChange={onCancel}>
      <DialogContent className="w-[600px] max-w-6xl max-h-[95vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Delete Director</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this director? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end w-full mt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" onClick={onDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBoardMemberDialog;

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { DialogHeader } from '@/components/ui/CustomDialog';
import { Button } from '@/components/ui/button';

interface DeleteFeeDialogProps {
  isOpen: boolean;
  onDelete: () => void;
  onCancel: () => void;
}

const DeleteFeeDialog: React.FC<DeleteFeeDialogProps> = ({ isOpen, onDelete, onCancel }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold p-2">Delete Fee</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>Are you sure you want to delete this Fee?</p>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="button" onClick={onDelete}>
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteFeeDialog;
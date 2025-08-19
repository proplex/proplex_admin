import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { DialogHeader } from '@/components/ui/CustomDialog';
import { Button } from '@/components/ui/button';

interface DeleteDialogComponentProps {
  deleteIndex: number | null;
  setDeleteIndex: (index: number | null) => void;
  handleOnDelete: () => void;
}

const DeleteDialogComponent: React.FC<DeleteDialogComponentProps> = ({ deleteIndex, setDeleteIndex, handleOnDelete }) => {
  return (
    <Dialog open={deleteIndex !== null} onOpenChange={() => setDeleteIndex(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-lg font-bold p-2'>
            Delete Fee
          </DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <p>Are you sure you want to delete this Fee?</p>
          <div className='flex justify-end gap-2'>
            <Button
              type='button'
              variant='outline'
              onClick={() => setDeleteIndex(null)}
            >
              Cancel
            </Button>
            <Button type='button' onClick={handleOnDelete}>
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialogComponent;
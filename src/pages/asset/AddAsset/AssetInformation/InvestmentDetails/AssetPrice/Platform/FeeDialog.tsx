import { Dialog, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { DialogHeader } from '@/components/ui/CustomDialog';
import FormGenerator from '@/components/UseForm/FormGenerator';
import { Button } from '@/components/ui/button';

interface FeeDialogProps {
  isOpen: boolean;
  isEdit: boolean;
  index: number | null;
  formConfig: any;
  onSubmit: () => void;
  onCancel: () => void;
}

const FeeDialog: React.FC<FeeDialogProps> = ({
  isOpen,
  isEdit,
  index,
  formConfig,
  onSubmit,
  onCancel,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="w-[1000px] max-w-3xl max-h-[95vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit' : 'Add'} Fee</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {FormGenerator(formConfig({ index: index ?? -1, type: 'platform' }))}
          </div>
          <DialogFooter className="flex justify-end w-full mt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="button" onClick={onSubmit}>
              Submit
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeeDialog;
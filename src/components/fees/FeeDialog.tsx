import { Dialog, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { DialogHeader } from '@/components/ui/CustomDialog';
import FormGenerator from '@/components/UseForm/FormGenerator';
import { Button } from '@/components/ui/button';
import { FormFieldConfig } from '@/components/UseForm/ControllerMap';

interface FeeDialogProps {
  isOpen: boolean;
  isEdit: boolean;
  index: number | null;
  type: 'registration' | 'legal' | 'platform' | 'brokerage';
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
  formConfig: (params: { index: number; type: string }) => FormFieldConfig[];
}

const FeeDialog: React.FC<FeeDialogProps> = ({
  isOpen,
  isEdit,
  index,
  type,
  onOpenChange,
  onSubmit,
  formConfig,
}) => {
  if (index === null) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[800px] max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            {isEdit ? 'Edit' : 'Add'} {type.charAt(0).toUpperCase() + type.slice(1)} Fee
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-6">
            {FormGenerator(formConfig({ index, type }))}
          </div>
          <DialogFooter className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="px-6"
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={onSubmit}
              className="bg-blue-600 hover:bg-blue-700 px-6"
            >
              {isEdit ? 'Update' : 'Add'} Fee
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeeDialog;

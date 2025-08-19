import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormGenerator from "@/components/UseForm/FormGenerator";

interface ExpenseDialogProps {
  isOpen: boolean;
  isEdit: boolean;
  index: number | null;
  onClose: () => void;
  onSubmit: () => void;
  formConfig: (index: number) => any;
}

const ExpenseDialog: React.FC<ExpenseDialogProps> = ({
  isOpen,
  isEdit,
  index,
  onClose,
  onSubmit,
  formConfig,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit" : "Add"} Expenses</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {FormGenerator(formConfig(index ?? -1))}
          <DialogFooter className="flex justify-end w-full mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
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

export default ExpenseDialog;

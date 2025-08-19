import React from "react";
import { Button } from "../../../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../../../components/ui/dialog";
import FormGenerator from "../../../../../../components/UseForm/FormGenerator";
import { formConfig } from "./formConfig";

interface LegalDialogProps {
  isOpen: boolean;
  isEdit: boolean;
  index: number | null;
  onSubmit: () => void;
  onOpenChange: () => void;
}

export const LegalDialog: React.FC<LegalDialogProps> = ({
  isOpen,
  isEdit,
  index,
  onSubmit,
  onOpenChange,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[500px] max-w-3xl max-h-[95vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit" : "Add"} Legal</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {FormGenerator(formConfig(index ?? -1))}
          </div>
          <DialogFooter className="flex justify-end w-full mt-4">
            <Button type="button" variant="outline" onClick={onOpenChange}>
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

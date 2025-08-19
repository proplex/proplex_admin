import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { FormProvider, useForm } from "react-hook-form";
import FormGenerator from "@/components/UseForm/FormGenerator";
import { formConfig } from "./formConfig";

function Proposal() {
  const [open, setOpen] = useState(false);
  const methods = useForm();
  const { control, clearErrors } = methods;

  const onSubmit = () => {
    console.log("Saving governance settings:");
  };

  const onClose = () => {
    setOpen(false);
    clearErrors();
  };

  return (
    <>
      <Button
        className="bg-blue-900"
        type="button"
        onClick={() => setOpen(true)}
      >
        Create Proposal
      </Button>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="w-[90vw] max-w-[500px] max-h-[90vh] flex flex-col overflow-auto">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <DialogHeader>
                <DialogTitle>Create New Proposal</DialogTitle>
                <DialogDescription>
                  Fill out the all details to create a new proposal.
                </DialogDescription>
              </DialogHeader>
              {FormGenerator(formConfig(control))}
              <DialogFooter>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button className="bg-blue-900" type="submit">
                  Submit Proposal
                </Button>
              </DialogFooter>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Proposal;

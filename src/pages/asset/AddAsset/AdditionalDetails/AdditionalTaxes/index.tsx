import { lazy, Suspense, memo, useState } from "react";
const VerticleTable = lazy(() => import("@/components/ui/VerticleTable"));
import { useFieldArray, useFormContext } from "react-hook-form";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/CustomDialog";
import { Button } from "@/components/ui/button";
import FormGenerator from "@/components/UseForm/FormGenerator";
import { useParams } from "react-router-dom";
import { formConfig } from "./formConfig";
import { useAdditionalTaxes } from "@/hooks/asset/useAdditionalTaxes";

const AdditionalTaxes = memo(() => {
  const { id = null } = useParams<{ id?: string }>();
  const {
    control,
    getValues: formGetValues,
    clearErrors,
    trigger,
  } = useFormContext();
  const {
    createAdditionalTaxes,
    updateAdditionalTaxes,
    deleteAdditionalTaxes,
  } = useAdditionalTaxes();

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "additionalTaxes",
    keyName: "additionalTaxes_id",
  });
  const [index, setIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const handleEdit = (item: number) => setIndex(item);
  const handleAdd = () => {
    setIndex(-1);
  };

  const isOpen = index !== null;
  const isEdit = index !== -1;

  const onOpenChange = () => {
    const previousValues = index !== null ? fields[index] : {};
    if (index !== null) {
      update(index, previousValues);
    }
    setIndex(null);
  };

  const onSubmit = async () => {
    trigger(`additionalTaxes.${index}`).then(async (isValid) => {
      if (isValid) {
        const data = formGetValues();
        const values = data.additionalTaxes[index ?? -1];
        if (isEdit) {
          if (index !== null) {
            await updateAdditionalTaxes(values._id, { ...values });
          }
          update(index ?? -1, { ...values });
        } else {
          await createAdditionalTaxes({ ...values, assetId: id }).then(
            (res) => {
              append({ ...values, _id: res._id });
            }
          );
        }
        setIndex(null);
        clearErrors();
      }
    });
  };

  const handleOnDelete = async () => {
    setDeleteIndex(null);
    const data = formGetValues();
    const values = data.additionalTaxes[deleteIndex ?? -1];
    if (deleteIndex !== null) {
      remove(deleteIndex);
      await deleteAdditionalTaxes(values._id);
    }
  };

  const handleDelete = (item: any) => {
    setDeleteIndex(item);
  };

  return (
    <Suspense fallback={<div>Loading Asset Information...</div>}>
      <div className="asset-information">
        <VerticleTable
          items={fields}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleAdd={handleAdd}
          title={`Additional Taxes`}
          addButtonText={`Add Additional Taxes`}
          emptyStateMessage={`No Additional Taxes found`}
        />
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold p-2">
                {isEdit ? "Edit" : "Add"} Additional Taxes
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {FormGenerator(formConfig({ index: index ?? -1 }))}
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onOpenChange}>
                  Cancel
                </Button>
                <Button type="button" onClick={onSubmit}>
                  Submit
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog
          open={deleteIndex !== null}
          onOpenChange={() => setDeleteIndex(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold p-2">
                Delete Additional Taxes
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p>Are you sure you want to delete this Additional Taxes?</p>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDeleteIndex(null)}
                >
                  Cancel
                </Button>
                <Button type="button" onClick={handleOnDelete}>
                  Delete
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Suspense>
  );
});

export default AdditionalTaxes;

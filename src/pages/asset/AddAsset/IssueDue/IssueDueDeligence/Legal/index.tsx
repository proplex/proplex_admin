import { useState } from "react";
import { Button } from "../../../../../../components/ui/button";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useLegal } from "@/hooks/asset/useLegal";
import { LegalDialog } from "./LegalDialog";
import { DeleteDialog } from "./DeleteDialog";
import { LegalTable } from "./LegalTable";

const Index = () => {
  const { createLegal, updateLegal, deleteLegal } = useLegal();
  const { id = null } = useParams<{ id?: string }>();
  const {
    control,
    getValues: formGetValues,
    clearErrors,
    trigger,
  } = useFormContext();

  const { fields, append, update, remove } = useFieldArray({
    control: control,
    name: "dueDiligence.legal",
    keyName: "legal_id",
  });

  const [index, setIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const isOpen = index !== null;
  const isEdit = index !== -1;

  const handleAdd = () => {
    setIndex(-1);
  };

  const onSubmit = async () => {
    trigger(`dueDiligence.legal.${index}`).then(async (isValid) => {
      if (isValid) {
        const data = formGetValues();
        const values = data.dueDiligence.legal[index ?? -1];
        if (isEdit) {
          await updateLegal(values._id, { ...values });
          update(index ?? -1, { ...values });
        } else {
          await createLegal({ ...values, assetId: id }).then((res) => {
            append({ ...values, _id: res._id });
          });
        }
        setIndex(null);
        clearErrors();
      }
    });
  };

  const onOpenChange = () => {
    const previousValues = index !== null ? fields[index] : {};
    if (index !== null) {
      update(index, previousValues);
    }
    setIndex(null);
  };

  const handleOnDelete = async () => {
    setDeleteIndex(null);
    const data = formGetValues();
    const values = data.dueDiligence.legal[deleteIndex ?? -1];
    if (deleteIndex !== null) {
      remove(deleteIndex);
      await deleteLegal(values._id);
    }
  };

  return (
    <div className="flex flex-col w-full ">
      <div className="flex justify-between items-center  ">
        <h1 className="text-lg font-bold text-gray-800">Legal</h1>
        <Button
          type="button"
          className=" text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2"
          onClick={handleAdd}
        >
          <span className="text-lg">+</span>
          <span>Add Legal</span>
        </Button>
      </div>
      <div className="space-y-2 mt-2">
        <LegalTable
          fields={fields}
          setIndex={setIndex}
          setDeleteIndex={setDeleteIndex}
        />
      </div>
      <LegalDialog
        isOpen={isOpen}
        isEdit={isEdit}
        index={index}
        onSubmit={onSubmit}
        onOpenChange={onOpenChange}
      />
      <DeleteDialog
        isOpen={deleteIndex !== null}
        onConfirm={handleOnDelete}
        onCancel={() => setDeleteIndex(null)}
      />
    </div>
  );
};

export default Index;

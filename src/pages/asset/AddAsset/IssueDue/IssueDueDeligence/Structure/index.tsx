import { useState } from "react";
import { StructureTable } from "./StructureTable";
import { formConfig } from "./formConfig";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useStructure } from "@/hooks/asset/useStructure";
import StructureDialog from "./StructureDialog";
import DeleteStructureDialog from "./DeleteStructureDialog";
import StructureHeader from "./StructureHeader";

const Index = () => {
  const { createStructure, updateStructure, deleteStructure } = useStructure();
  const { id = null } = useParams<{ id?: string }>();
  const {
    control,
    getValues: formGetValues,
    clearErrors,
    trigger,
  } = useFormContext();

  const { fields, append, update, remove } = useFieldArray({
    control: control,
    name: "dueDiligence.structure",
    keyName: "structure_id",
  });

  const [index, setIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const isOpen = index !== null;
  const isEdit = index !== -1;

  const handleAdd = () => {
    setIndex(-1);
  };

  const onSubmit = async () => {
    trigger(`dueDiligence.structure.${index}`).then(async (isValid) => {
      if (isValid) {
        const data = formGetValues();
        const values = data.dueDiligence.structure[index ?? -1];
        if (isEdit) {
          await updateStructure(values._id, { ...values });
          update(index ?? -1, { ...values });
        } else {
          await createStructure({ ...values, assetId: id }).then((res) => {
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
    const values = data.dueDiligence.structure[deleteIndex ?? -1];
    if (deleteIndex !== null) {
      remove(deleteIndex);
      await deleteStructure(values._id);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <StructureHeader onAdd={handleAdd} />
      <div className="space-y-2 mt-2">
        <StructureTable
          fields={fields}
          setIndex={setIndex}
          setDeleteIndex={setDeleteIndex}
        />
      </div>
      <StructureDialog
        isOpen={isOpen}
        isEdit={isEdit}
        index={index}
        formConfig={formConfig}
        onSubmit={onSubmit}
        onOpenChange={onOpenChange}
      />
      <DeleteStructureDialog
        deleteIndex={deleteIndex}
        onCancel={() => setDeleteIndex(null)}
        onDelete={handleOnDelete}
      />
    </div>
  );
};

export default Index;

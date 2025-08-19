import { useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAssetDocument } from "@/hooks/asset/useAssetDocument";
import formConfig from "./formConfig";
import DocumentsDialog from "./DocumentsDialog";
import DeleteDocumentsDialog from "./DeleteDocumentsDialog";
import DocumentsHeader from "./DocumentsHeader";
import DocumentsTable from "./DocumentsTable";

const Index = () => {
  const { createDocument, updateDocument, deleteDocument } = useAssetDocument();
  const { id } = useParams<{ id: string }>();
  const {
    control,
    getValues: formGetValues,
    clearErrors,
    trigger,
  } = useFormContext();

  const { fields, append, update, remove } = useFieldArray({
    control: control,
    name: "documents",
    keyName: "document_id",
  });

  const [index, setIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const handleAdd = () => {
    setIndex(-1);
  };

  const onSubmit = async () => {
    trigger(`documents.${index}`).then(async (isValid) => {
      if (isValid) {
        const data = formGetValues();
        const values = data.documents[index ?? -1];
        if (isEdit) {
          if (index !== null) {
            await updateDocument(values._id, {
              ...values,
            });
          }
          update(index ?? -1, { ...values });
        } else {
          await createDocument({ ...values, assetId: id }).then((res) => {
            append({ ...values, _id: res._id });
          });
        }
        setIndex(null);
        clearErrors();
      }
    });
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

  const handleOnDelete = async () => {
    setDeleteIndex(null);
    const data = formGetValues();
    const values = data.documents[deleteIndex ?? -1];
    if (deleteIndex !== null) {
      await deleteDocument(values._id);
      remove(deleteIndex);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <DocumentsHeader onAdd={handleAdd} />
      <div className="space-y-2 mt-2">
        <DocumentsTable
          fields={fields}
          setIndex={setIndex}
          setDeleteIndex={setDeleteIndex}
          update={update}
        />
      </div>
      <DocumentsDialog
        isOpen={isOpen}
        isEdit={isEdit}
        index={index}
        formConfig={formConfig}
        onSubmit={onSubmit}
        onOpenChange={onOpenChange}
      />
      <DeleteDocumentsDialog
        deleteIndex={deleteIndex}
        onCancel={() => setDeleteIndex(null)}
        onDelete={handleOnDelete}
      />
    </div>
  );
};

export default Index;

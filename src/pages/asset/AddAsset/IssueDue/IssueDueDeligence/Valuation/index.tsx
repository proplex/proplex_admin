import { useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useValuation } from "@/hooks/asset/useValuation";
import ValuationDialog from "./ValuationDialog";
import DeleteValuationDialog from "./DeleteValuationDialog";
import ValuationHeader from "./ValuationHeader";
import ValuationTable from "./ValuationTable";
import { formConfig } from "./formConfig";

const Index = () => {
  const { createValuation, updateValuation, deleteValuation } = useValuation();
  const { id = null } = useParams<{ id?: string }>();
  const {
    control,
    getValues: formGetValues,
    clearErrors,
    trigger,
  } = useFormContext();

  const { fields, append, update, remove } = useFieldArray({
    control: control,
    name: "dueDiligence.valuation",
    keyName: "valuation_id",
  });

  const [index, setIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const isOpen = index !== null;
  const isEdit = index !== -1;

  const handleAdd = () => {
    setIndex(-1);
  };

  const onSubmit = async () => {
    trigger(`dueDiligence.valuation.${index}`).then(async (isValid) => {
      if (isValid) {
        const data = formGetValues();
        const values = data.dueDiligence.valuation[index ?? -1];
        if (isEdit) {
          await updateValuation(values._id, { ...values });
          update(index ?? -1, { ...values });
        } else {
          await createValuation({ ...values, assetId: id }).then((res) => {
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
    const values = data.dueDiligence.valuation[deleteIndex ?? -1];
    if (deleteIndex !== null) {
      remove(deleteIndex);
      await deleteValuation(values._id);
    }
  };

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
      cell: (info: any) => info.getValue() || "N/A",
      enableResize: true,
      size: 100,
    },
    {
      header: "Location",
      accessorKey: "location",
      cell: (info: any) => info.getValue() || "N/A",
      enableResize: true,
      size: 100,
    },
    {
      header: "Link",
      accessorKey: "link",
      cell: (info: any) => {
        const value = info.getValue();
        return (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            {value}
          </a>
        );
      },
      enableResize: true,
      size: 100,
    },
    {
      header: "Logo",
      accessorKey: "logoUrl",
      cell: (info: any) => {
        const value = info.getValue();
        return value ? (
          <img
            src={value}
            alt="Logo"
            className="w-full h-full object-contain"
          />
        ) : (
          "N/A"
        );
      },
      enableResize: true,
      size: 100,
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <ValuationHeader onAdd={handleAdd} />
      <div className="space-y-2 mt-2">
        <ValuationTable
          fields={fields}
          setIndex={setIndex}
          setDeleteIndex={setDeleteIndex}
        />
      </div>
      <ValuationDialog
        isOpen={isOpen}
        isEdit={isEdit}
        index={index}
        formConfig={formConfig}
        onSubmit={onSubmit}
        onOpenChange={onOpenChange}
      />
      <DeleteValuationDialog
        deleteIndex={deleteIndex}
        onCancel={() => setDeleteIndex(null)}
        onDelete={handleOnDelete}
      />
    </div>
  );
};

export default Index;

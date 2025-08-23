import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EditIcon, TrashIcon } from "lucide-react";
import TableComponent from "@/components/TableComponent";
import { formConfig } from "./formConfig";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useParams } from "react-router-dom";
import { DialogHeader } from "@/components/ui/CustomDialog";
import FormGenerator from "@/components/UseForm/FormGenerator";
import { useAllocation } from "@/hooks/asset/useAllocation";

const Index = () => {
  const { createAllocation, updateAllocation, deleteAllocation } =
    useAllocation();
  const { id = null } = useParams<{ id?: string }>();
  const {
    control,
    getValues: formGetValues,
    clearErrors,
    formState: { errors },
    trigger,
  } = useFormContext();
  console.log("errors", errors);

  const { fields, append, update, remove } = useFieldArray({
    control: control,
    name: "allocationStats.categories",
    keyName: "allocation_id",
  });

  const [index, setIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const isOpen = index !== null;
  const isEdit = index !== -1;

  const handleAdd = () => {
    setIndex(-1);
  };

  const action = [
    {
      header: "Edit",
      accessorKey: "edit",
      icon: <EditIcon />,
      onClick: (item: any) => {
        const findIndex = fields.findIndex(
          (field) => field.allocation_id === item.allocation_id
        );
        setIndex(findIndex);
      },
    },
    {
      header: "Delete",
      accessorKey: "delete",
      icon: <TrashIcon />,
      onClick: (item: any) => {
        const findIndex = fields.findIndex(
          (field) => field.allocation_id === item.allocation_id
        );
        setDeleteIndex(findIndex);
      },
    },
  ];

  const onSubmit = async () => {
    trigger(`allocationStats.categories.${index}`).then(async (isValid) => {
      if (isValid) {
        const data = formGetValues();
        const values = data.allocationStats.categories[index ?? -1];
        if (isEdit) {
          await updateAllocation(values._id, { ...values });
          update(index ?? -1, { ...values });
        } else {
          await createAllocation({ ...values, assetId: id }).then((res) => {
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
    const values = data.allocationStats.categories[deleteIndex ?? -1];
    if (deleteIndex !== null) {
      remove(deleteIndex);
      await deleteAllocation(values._id);
    }
  };

  const columns = [
    {
      header: "Category",
      accessorKey: "category",
    },
    {
      header: "Tokens",
      accessorKey: "tokens",
    },

    {
      header: "Cliff Period",
      accessorKey: "cliffPeriod",
    },

    {
      header: "Description",
      accessorKey: "description",
    },
    {
      header: "Vesting Type",
      accessorKey: "vestingType",
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: (info: { getValue: () => any }) => {
        const item = (info as any).row.original;
        return action.map((actionItem) => (
          <Button
            key={actionItem.header}
            type="button"
            variant="ghost"
            onClick={() => actionItem.onClick(item)}
          >
            {actionItem.icon}
          </Button>
        ));
      },
    },
  ];

  return (
    <div className="flex flex-col w-full ">
      <div className="flex justify-between items-center  ">
        <h1 className="text-lg font-bold text-gray-800">Token Allocation</h1>
        <Button
          type="button"
          className=" text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2"
          onClick={handleAdd}
        >
          <span className="text-lg">+</span>
          <span>Add Allocation</span>
        </Button>
      </div>
      <div className="space-y-2 mt-2">
        <TableComponent columns={columns} data={fields} />
      </div>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="w-[1000px] max-w-6xl max-h-[95vh] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>{isEdit ? "Edit" : "Add"} Allocation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
      <Dialog
        open={deleteIndex !== null}
        onOpenChange={() => setDeleteIndex(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-lg font-bold p-2">
              Delete Allocation
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Are you sure you want to delete this Allocation?</p>
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
  );
};

export default Index;

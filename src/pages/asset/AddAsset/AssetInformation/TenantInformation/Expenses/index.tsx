import { useState } from "react";
import FormGenerator from "@/components/UseForm/FormGenerator";
import { expenseFormConfig, formConfig } from "./formConfig";
import { useFormContext, useFieldArray } from "react-hook-form";
import Exepenses from "@/components/cards/asset/Exepenses";
import { Button } from "@/components/ui/button";
import { useExpenses } from "@/hooks/asset/useExpenses";
import { useParams } from "react-router-dom";
import ExpenseDialog from "./ExpenseDialog";
import DeleteDialog from "./DeleteDialog";
import ExpenseTable from "./ExpenseTable";
import { formatCompactNumber } from "@/helpers/global";

const index = () => {
  const { id = null } = useParams<{ id?: string }>();
  const { updateExpenses, createExpenses, deleteExpenses } = useExpenses();
  const {
    watch,
    control,
    getValues: formGetValues,
    clearErrors,
    trigger,
  } = useFormContext();

  const { fields, append, update, remove } = useFieldArray({
    control: control,
    name: "expenses",
    keyName: "expense_id",
  });

  const onSubmit = async () => {
    trigger(`expenses.${index}`).then(async (isValid) => {
      if (isValid) {
        const data = formGetValues();
        const values = data.expenses[index ?? -1];
        if (isEdit) {
          if (index !== null) {
            await updateExpenses(values._id, { ...values });
          }
          update(index ?? -1, { ...values });
        } else {
          const data = {
            name: values.name,
            value: values.value,
            isPercentage: values.isPercentage ? values.isPercentage : false,
            status: values.status ? values.status : false,
          };
          await createExpenses({ ...data, assetId: id ?? "" }).then((res) => {
            append({ ...data, _id: res._id });
          });
        }
        setIndex(null);
        clearErrors();
      }
    });
  };

  const totalNumberOfSfts = watch("totalNumberOfSfts");
  const vacancyRate = watch("rentalInformation.vacancyRate");
  const rentPerSft = watch("rentalInformation.rentPerSft");

  let rentNumberOfSfts =
    totalNumberOfSfts - (vacancyRate / 100) * totalNumberOfSfts || 0;

  rentNumberOfSfts = parseFloat(rentNumberOfSfts.toFixed(2));

  let grossRent = rentPerSft * rentNumberOfSfts || 0;
  grossRent = parseFloat(grossRent.toFixed(2));

  const [index, setIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

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

  const handleOnDelete = async () => {
    setDeleteIndex(null);
    const data = formGetValues();
    const values = data.expenses[deleteIndex ?? -1];
    if (deleteIndex !== null) {
      remove(deleteIndex);
      await deleteExpenses(values._id);
    }
  };

  const expenses = fields
    .filter((item: any) => {
      if (item.status) {
        return item;
      }
    })
    .map((item: any) => {
      const value = item.isPercentage
        ? (item.value / 100) * grossRent
        : item.value;
      return {
        ...item,
        value: value,
      };
    })
    .reduce((acc: number, item: any) => {
      return acc + item.value;
    }, 0);

  let netRent = grossRent - expenses || 0;
  netRent = parseFloat(netRent.toFixed(2));

  return (
    <>
      <div className="w-full">
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-lg font-semibold text-black">Expenses</h1>
          <Button 
            type="button" 
            className="bg-white text-black px-4 py-2 rounded-md flex items-center gap-2 hover:bg-white hover:text-black border border-gray-300"
            onClick={handleAdd}
          >
            <span className="text-lg">+</span>
            <span>Add Expense</span>
          </Button>
        </div>
        <div className="mt-4">
          <ExpenseTable
            fields={fields}
            actionHandlers={{
              onEdit: (item) => {
                const findIndex = fields.findIndex(
                  (field) => field.expense_id === item.expense_id
                );
                setIndex(findIndex);
              },
              onDelete: (item) => {
                const findIndex = fields.findIndex(
                  (field) => field.expense_id === item.expense_id
                );
                setDeleteIndex(findIndex);
              },
            }}
            update={update}
          />
        </div>
        <div className=" mt-5 grid grid-cols-2 gap-4">
          <Exepenses
            title="Monthly Rent"
            sqft={rentNumberOfSfts}
            grossRent={formatCompactNumber(grossRent)}
            netRent={formatCompactNumber(netRent)}
            expenses={formatCompactNumber(expenses)}
            extraText="After All Expenses"
          />
          <Exepenses
            title="Annual Rent"
            sqft={rentNumberOfSfts}
            grossRent={formatCompactNumber(grossRent * 12)}
            expenses={formatCompactNumber(expenses * 12)}
            netRent={formatCompactNumber(netRent * 12)}
            extraText="Monthly x12"
          />
        </div>

        <ExpenseDialog
          isOpen={isOpen}
          isEdit={isEdit}
          index={index}
          onClose={onOpenChange}
          onSubmit={onSubmit}
          formConfig={expenseFormConfig}
        />
        <DeleteDialog
          isOpen={deleteIndex !== null}
          onClose={() => setDeleteIndex(null)}
          onDelete={handleOnDelete}
        />
        <div className="grid grid-cols-4 gap-4 mt-5">
          {FormGenerator(formConfig())}
        </div>
      </div>
    </>
  );
};

export default index;

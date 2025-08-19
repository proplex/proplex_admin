import { useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useParams } from "react-router-dom";
import FeeDialog from "./FeeDialog";
import DeleteFeeDialog from "./DeleteFeeDialog";
import FeeTable from "./FeeTable";
import { Button } from "@/components/ui/button";
import { useFee } from "@/hooks/asset/useFee";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formConfig } from "../formConfig";

const Index = () => {
  const { createFee, updateFee, deleteFee } = useFee();
  const { id = null } = useParams<{ id?: string }>();
  const {
    control,
    getValues: formGetValues,
    clearErrors,
    trigger,
  } = useFormContext();

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "fees.registration",
    keyName: "fr_id",
  });

  const [index, setIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const handleAdd = () => {
    setIndex(-1);
  };

  const onSubmit = async () => {
    trigger(`fees.registration.${index}`).then(async (isValid) => {
      if (isValid) {
        const data = formGetValues();
        console.log(data)
        const values = data.fees.registration[index ?? -1];
        if (isEdit) {
          if (index !== null) {
            await updateFee(values._id, { ...values });
          }
          update(index ?? -1, { ...values });
        } else {
          await createFee({
            ...data,
            assetId: id ?? "",
            name: values.name ?? "",
            isPercentage: values.isPercentage ?? false,
            value: values.value ?? 0,
            type: "registration",
            status: values.status ?? false,
          }).then((res) => {
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
    const values = data.fees.registration[deleteIndex ?? -1];
    if (deleteIndex !== null) {
      remove(deleteIndex);
      await deleteFee(values._id);
    }
  };

  const totalNumberOfSfts = formGetValues("totalNumberOfSfts");
  const pricePerSft = formGetValues("pricePerSft");

  return (
    <div className="flex flex-col w-full">
      <div className="space-y-2 mt-2">
        <Accordion type="single"  collapsible>
          <AccordionItem value="item-2" className="bg-gray-100 rounded-md">
            <AccordionTrigger className="p-4 text-lg font-bold text-gray-800">
              Registration
            </AccordionTrigger>
            <AccordionContent className="bg-white mx-2 my-3 space-y-2">
              <FeeTable
                fields={fields}
                update={update}
                setIndex={setIndex}
                setDeleteIndex={setDeleteIndex}
              />
              <Button
                type="button"
                disabled={!totalNumberOfSfts || !pricePerSft}
                variant="secondary"
                onClick={handleAdd}
                className="mx-2"
              >
                <span className="text-lg">+</span>
                <span>Add Fee</span>
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <FeeDialog
        isOpen={isOpen}
        isEdit={isEdit}
        index={index}
        formConfig={formConfig}
        onSubmit={onSubmit}
        onCancel={onOpenChange}
      />
      <DeleteFeeDialog
        isOpen={deleteIndex !== null}
        onDelete={handleOnDelete}
        onCancel={() => setDeleteIndex(null)}
      />
    </div>
  );
};

export default Index;

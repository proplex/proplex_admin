import { useState } from "react";
import { useFormContext, useFieldArray, FieldValues } from "react-hook-form";
import { useParams } from "react-router-dom";
import FeeDialog from "@/components/fees/FeeDialog";
import DeleteFeeDialog from "./DeleteFeeDialog";
import FeeTable from "./FeeTable";
import { Button } from "@/components/ui/button";
import { useFee } from "@/hooks/asset/useFee";
import { Plus } from "lucide-react";
import { formConfig } from "../formConfig";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FeeItem {
  fr_id: string;
  _id?: string;
  name: string;
  value: number;
  isPercentage: boolean | string;
  status: boolean;
}

type FeeFormValues = {
  fees: {
    registration: FeeItem[];
  };
  totalNumberOfSfts?: number;
  pricePerSft?: number;
};
const Index = () => {
  const { createFee, updateFee, deleteFee } = useFee();
  const { id = null } = useParams<{ id?: string }>();
  const {
    control,
    getValues: formGetValues,
    clearErrors,
    trigger,
  } = useFormContext<FeeFormValues>();

  const { fields, append, update, remove } = useFieldArray({
    control: control as any, // Temporary workaround for type issues
    name: "fees.registration" as const,
    keyName: "fr_id",
  });

  const [index, setIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const handleAdd = () => {
    // Create a new fee with default values
    const newFee: FeeItem = {
      fr_id: `temp-${Date.now()}`,
      name: '',
      value: 0,
      isPercentage: false,
      status: true
    };
    
    // Append the new fee to the form
    append(newFee);
    // Set the index to the new fee's position (last in the array)
    setIndex(fields.length);
  };

  const handleEdit = (index: number) => {
    setIndex(index);
  };

  const handleDelete = (index: number) => {
    setDeleteIndex(index);
  };

  const handleDeleteConfirm = async () => {
    if (deleteIndex === null) return;
    
    const field = fields[deleteIndex] as FeeItem;
    if (field?._id) {
      await deleteFee(field._id);
    }
    remove(deleteIndex);
    setDeleteIndex(null);
  };
  
  const handleOnDelete = async () => {
    if (deleteIndex === null) return;
    
    const field = fields[deleteIndex] as FeeItem;
    if (field?._id) {
      await deleteFee(field._id);
    }
    remove(deleteIndex);
    setDeleteIndex(null);
  };

  const onSubmit = async () => {
    if (index === null) return;

    // Trigger validation for the specific fee being edited/added
    const isValid = await trigger(`fees.registration.${index}`);
    if (!isValid) return;

    const data = formGetValues();
    const values = data.fees.registration[index] as FeeItem;

    try {
      if (values._id && values._id.startsWith('temp-')) {
        // This is a new fee (has a temporary ID)
        const response = await createFee({
          ...values,
          assetId: id ?? "",
          type: "registration",
          isPercentage: String(values.isPercentage), // Ensure string type
          status: values.status ?? true
        });
        
        // Update the fee with the server-generated _id
        update(index, {
          ...values,
          _id: response._id,
          fr_id: response._id // Also update the fr_id to match the _id
        });
      } else if (values._id) {
        // This is an existing fee being updated
        await updateFee(values._id, {
          ...values,
          isPercentage: String(values.isPercentage), // Ensure string type
          status: values.status ?? true
        });
        
        // Update the local state
        update(index, values);
      }
      
      // Close the dialog and clear any errors
      setIndex(null);
      clearErrors();
    } catch (error) {
      console.error('Error saving fee:', error);
      // Optionally show an error message to the user
    }
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
                type='button'
                variant='secondary'
                onClick={handleAdd}
                className='mx-2'
                disabled={!totalNumberOfSfts || !pricePerSft}
              >
                <span className='text-lg'>+</span>
                <span>Add Fee</span>
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Index;

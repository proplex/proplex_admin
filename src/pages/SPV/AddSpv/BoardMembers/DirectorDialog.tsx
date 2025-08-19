import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import FormGenerator from "@/components/UseForm/FormGenerator";
import { directorFormConfig } from "./directorForm";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { useABApi } from "@/hooks/spv/useABApi";
import { useParams } from "react-router-dom";

interface DirectorDialogProps {
  setIndex: any;
  append: any;
  remove: any;
  update: any;
  index: number | null;
  fields: any;
}
const DirectorDialog = ({
  setIndex,
  fields,
  append,
  remove,
  update,
  index,
}: DirectorDialogProps) => {
  const { id: companyId } = useParams() as { id: string };
  const { createAB, updateAB, status, error } = useABApi();
  const {
    getValues: formGetValues,
    clearErrors,
    trigger,
    control,
  } = useFormContext();
  const isOpen = index !== null;
  const isEdit = index !== -1;

  const onOpenChange = () => {
    const previousValues = index !== null ? fields[index] : {};
    if (index !== null) {
      update(index, previousValues);
    }
    setIndex(null);
    clearErrors();
  };
  const onSubmit = async () => {
    trigger(`boardOfDirectors.additionalBoardMembers.${index}`)
      .then(async (isValid) => {
        if (isValid) {
          const data = formGetValues();
          const values =
            data.boardOfDirectors.additionalBoardMembers[index ?? -1];
          if (isEdit) {
            update(index ?? -1, { ...values });
            await updateAB(values._id, {
              fullName: values.fullName,
              email: values.email,
              phoneNumber: values.phoneNumber,
              idNumber: values.idNumber,
              idProof: values.idProof,
              role: values.role,
            });
          } else {
            await createAB({
              companyId: companyId,
              fullName: values.fullName,
              email: values.email,
              phoneNumber: values.phoneNumber,
              idNumber: values.idNumber,
              idProof: values.idProof,
              role: values.role,
            }).then((res) => {
              append({
                _id: res._id,
                fullName: values.fullName,
                email: values.email,
                phoneNumber: values.phoneNumber,
                idNumber: values.idNumber,
                idProof: values.idProof,
                role: values.role,
              });
            });
          }
          setIndex(null);
          clearErrors();
        }
      })
      .catch((error) => {
        console.error("Error during form submission:", error);
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="w-[1000px] max-w-6xl max-h-[95vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit" : "Add"} Director</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Edit the details of this director."
              : "Add a new director to your organization."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          {FormGenerator(directorFormConfig({ index: index ?? -1 }))}
        </div>
        <DialogFooter className="flex justify-end w-full mt-4">
          <Button type="button" variant="outline" onClick={onOpenChange}>
            Cancel
          </Button>
          <Button type="button" onClick={onSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DirectorDialog;

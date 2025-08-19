import FormGenerator from "@/components/UseForm/FormGenerator";
import {
  Info,
  Users,
  Banknote,
  File,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { tresaryFormConfig } from "./tresaryForm";
import { assetFormConfig } from "./assetForm";
import { Button } from "@/components/ui/button";
import DirectorDialog from "./DirectorDialog";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useABApi } from "@/hooks/spv/useABApi";
import BoardMembersTable from './BoardMembersTable';
import DeleteBoardMemberDialog from './DeleteBoardMemberDialog';
import BoardMembersHeader from './BoardMembersHeader';

const index = () => {
  const { deleteAB } = useABApi();
  const { control } = useFormContext();
  const [index, setIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<any | null>(null);
  const { fields, append, remove, update } = useFieldArray({
    name: "boardOfDirectors.additionalBoardMembers",
    control,
    keyName: "a_id",
  });

  const addBoardMember = () => {
    setIndex(-1);
  };

  const isDelete = deleteIndex !== null;

  const onOpenChange = () => {
    setDeleteIndex(null);
  };

  const onSubmit = async () => {
    if (deleteIndex !== null) {
      const findIndex = fields.findIndex(
        (field) => field.a_id === deleteIndex.a_id
      );
      remove(findIndex);
      await deleteAB(deleteIndex._id);
      setDeleteIndex(null);
    }
  };

  return (
    <div className="p-4 bg-white border-gray-100">
      <DirectorDialog
        fields={fields}
        index={index}
        append={append}
        update={update}
        remove={remove}
        setIndex={setIndex}
      />
      <DeleteBoardMemberDialog
        isDelete={isDelete}
        onCancel={onOpenChange}
        onDelete={onSubmit}
      />
      <BoardMembersHeader onAdd={addBoardMember} />
      <BoardMembersTable
        fields={fields}
        setIndex={setIndex}
        setDeleteIndex={setDeleteIndex}
      />
    </div>
  );
};

export default index;

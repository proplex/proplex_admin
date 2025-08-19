import React from "react";
import { Button } from "../../../../../../components/ui/button";
import { EditIcon, TrashIcon } from "lucide-react";

interface ActionButtonsProps {
  rowData: any;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ rowData, onEdit, onDelete }) => {
  return (
    <div className="flex gap-2">
      <Button type="button" variant="outline" onClick={() => onEdit(rowData)}>
        <EditIcon />
      </Button>
      <Button type="button" variant="outline" onClick={() => onDelete(rowData)}>
        <TrashIcon />
      </Button>
    </div>
  );
};

export default ActionButtons;

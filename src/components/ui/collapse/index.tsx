import React, { useState } from "react";
import { Button } from "../button";
import { EditIcon, TrashIcon } from "lucide-react";
import { AccordionItem } from "@/components/common/GlobalAccordion";
import TableComponent from "@/components/TableComponent";

interface CollapsebleProps {
  data?: any[];
  title: string;
  firstColumn?: string;
  secondColumn?: string;
  thirdColumn?: string;
  fourthColumn?: string;
  setIndex?: (index: number) => void;
  dialogopen?: boolean;
  onAddClick?: () => void;
  isEdit?: boolean;
}

const Collapseble: React.FC<CollapsebleProps> = ({
  data = [],
  title,
  firstColumn,
  secondColumn,
  setIndex,
  dialogopen,
  onAddClick,
  isEdit,
  thirdColumn,
  fourthColumn,
}) => {
  const [open, setOpen] = useState(dialogopen);

  const columns = [
    {
      header: firstColumn,
      accessorKey: "name",
    },
    {
      header: secondColumn,
      accessorKey: "value",
    },
    {
      header: thirdColumn,
      accessorKey: "isPercentage",
    },
    {
      header: fourthColumn,
      accessorKey: "status",
    },

    {
      header: "Action",
      accessorKey: "action",
      type: "action",
    },
  ];

  const action = [
    {
      header: "Edit",
      accessorKey: "edit",
      icon: <EditIcon />,
    },
    {
      header: "Delete",
      accessorKey: "delete",
      icon: <TrashIcon />,
    },
  ];
  return (
    <div>
      <AccordionItem title={title} defaultOpen={true}>
        <div className="space-y-4">
          {firstColumn && secondColumn && (
            <TableComponent data={data} columns={columns} />
          )}

          {onAddClick && (
            <Button
              variant="ghost"
              className="flex items-center gap-2 mt-2"
              type="button"
              onClick={() => {
                if (onAddClick) onAddClick();
                setOpen(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Fee
            </Button>
          )}
        </div>
      </AccordionItem>
    </div>
  );
};

export default Collapseble;

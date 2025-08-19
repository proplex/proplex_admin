import React from "react";
import { Button } from "@/components/ui/button";
import TableComponent from "@/components/TableComponent";
import { EditIcon, TrashIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import toast from "react-hot-toast";

interface ExpenseTableProps {
  fields: any[];
  actionHandlers: {
    onEdit: (item: any) => void;
    onDelete: (item: any) => void;
  };
  update: (index: number, value: any) => void;
}

const ExpenseTable: React.FC<ExpenseTableProps> = ({
  fields,
  actionHandlers,
  update,
}) => {
  const columns = [
    {
      header: "Expense Type",
      accessorKey: "name",
      cell: (info: { getValue: () => any }) => info.getValue() || "N/A",
      enableResize: true,
      size: 100,
    },
    {
      header: "Value",
      accessorKey: "value",
      cell: (info: { getValue: () => any }) => info.getValue() || "N/A",
      enableResize: true,
      size: 100,
    },
    {
      header: "Is Percentage",
      accessorKey: "isPercentage",
      size: 100,
      cell: ({ row }: any) => {
        const rowData = row.original;
        return (
          <Switch
            checked={rowData.isPercentage}
            onCheckedChange={(e: boolean) => {
              if (rowData.value > 100 && e) {
                toast.error("Percentage cannot exceed 100%");
                return;
              }
              update(
                fields.findIndex((f) => f.expense_id === rowData.expense_id),
                { ...rowData, isPercentage: e }
              );
            }}
            className="cursor-pointer"
          />
        );
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      size: 100,
      cell: ({ row }: any) => {
        const rowData = row.original;
        return (
          <Switch
            checked={rowData.status}
            onCheckedChange={(e) =>
              update(
                fields.findIndex((f) => f.expense_id === rowData.expense_id),
                { ...rowData, status: e }
              )
            }
            className="cursor-pointer"
          />
        );
      },
    },
    {
      header: "Action",
      accessorKey: "action",
      enableResize: false,
      size: 100,
      cell: (info: { row: { original: any }; getValue: () => any }) => {
        const item = info.row.original;
        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => actionHandlers.onEdit(item)}
            >
              <EditIcon />
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => actionHandlers.onDelete(item)}
            >
              <TrashIcon />
            </Button>
          </div>
        );
      },
    },
  ];

  return <TableComponent columns={columns} data={fields} />;
};

export default ExpenseTable;

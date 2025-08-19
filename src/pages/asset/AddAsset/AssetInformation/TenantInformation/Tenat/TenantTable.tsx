import React from "react";
import TableComponent from "@/components/TableComponent";
import ActionButtons from "./ActionButtons";

interface TenantTableProps {
  columns: any[];
  data: any[];
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
}

const TenantTable: React.FC<TenantTableProps> = ({ columns, data, onEdit, onDelete }) => {
  const enhancedColumns = columns.map((column) => {
    if (column.accessorKey === "action") {
      return {
        ...column,
        cell: ({ row }: { row: any }) => (
          <ActionButtons rowData={row.original} onEdit={onEdit} onDelete={onDelete} />
        ),
      };
    }
    return column;
  });

  return <TableComponent columns={enhancedColumns} data={data} model="tenant" />;
};

export default TenantTable;

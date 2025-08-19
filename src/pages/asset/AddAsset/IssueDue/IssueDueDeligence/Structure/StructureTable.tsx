import React from "react";
import { Button } from "../../../../../../components/ui/button";
import TableComponent from "../../../../../../components/TableComponent";
import { Edit, TrashIcon } from "lucide-react";

interface StructureField {
  structure_id: string;
  name?: string;
  location?: string;
  link?: string;
  logoUrl?: string;
}

interface StructureTableProps {
  fields: StructureField[];
  setIndex: (index: number | null) => void;
  setDeleteIndex: (index: number | null) => void;
}

export const StructureTable: React.FC<StructureTableProps> = ({ fields, setIndex, setDeleteIndex }) => {
  const columns = [
    {
      header: "Name",
      accessorKey: "name",
      cell: (info: any) => info.getValue() || "N/A",
      enableResize: true,
      size: 100,
    },
    {
      header: "Location",
      accessorKey: "location",
      cell: (info: any) => info.getValue() || "N/A",
      enableResize: true,
      size: 100,
    },
    {
      header: "Link",
      accessorKey: "link",
      cell: (info: any) => {
        const value = info.getValue();
        return (
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            {value}
          </a>
        );
      },
      enableResize: true,
      size: 100,
    },
    {
      header: "Logo",
      accessorKey: "logoUrl",
      cell: (info: any) => {
        const value = info.getValue();
        return value ? (
          <img src={value} alt="Logo" className="w-full h-full object-contain" />
        ) : (
          "N/A"
        );
      },
      enableResize: true,
      size: 100,
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: (info: any) => {
        const findIndex = fields.findIndex((field) => field.structure_id === info.row.original.structure_id);
        return (
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIndex(findIndex);
              }}
            >
              <Edit />
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setDeleteIndex(findIndex);
              }}
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

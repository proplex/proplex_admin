import { FC } from 'react';
import { Button } from '../../../../../../components/ui/button';
import { Edit, TrashIcon } from 'lucide-react';
import TableComponent from '@/components/TableComponent';


type ValuationTableProps = {
  fields: any[];
  setIndex: (index: number) => void;
  setDeleteIndex: (index: number) => void;
};

const ValuationTable: FC<ValuationTableProps> = ({ fields, setIndex, setDeleteIndex }) => {
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
          <img
            src={value}
            alt="Logo"
            className="w-full h-full object-contain"
          />
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
        const findIndex = fields.findIndex(
          (field) => field.valuation_id === info.row.original.valuation_id
        );
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

export default ValuationTable;

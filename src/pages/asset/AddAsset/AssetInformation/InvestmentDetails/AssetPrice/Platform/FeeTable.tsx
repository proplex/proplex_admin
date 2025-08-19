import { EditIcon, TrashIcon } from 'lucide-react';
import TableComponent from '@/components/TableComponent';
import { Switch } from '@/components/ui/switch';
import toast from 'react-hot-toast';

interface FeeTableProps {
  fields: any[];
  update: (index: number, value: any) => void;
  setIndex: (index: number) => void;
  setDeleteIndex: (index: number) => void;
}

const FeeTable: React.FC<FeeTableProps> = ({ fields, update, setIndex, setDeleteIndex }) => {
  const columns = [
    {
      header: 'Name',
      accessorKey: 'name',
      size: 100,
      cell: (info: { getValue: () => any }) => info.getValue() || 'N/A',
    },
    {
      header: 'Value',
      accessorKey: 'value',
      size: 100,
      cell: (info: { getValue: () => any }) => info.getValue() ?? 'N/A',
    },
    {
      header: 'Is Percentage',
      accessorKey: 'isPercentage',
      size: 100,
      cell: ({ row }: { row: { original: { fr_id: string; isPercentage: boolean; status: boolean; value: number } } }) => {
        const rowData = row.original;
        return (
          <Switch
            checked={rowData.isPercentage}
            onCheckedChange={(e: boolean) => {
              if (rowData.value > 100 && e) {
                toast.error('Percentage cannot exceed 100%');
                return;
              }
              update(
                fields.findIndex((f) => f.fr_id === rowData.fr_id),
                { ...rowData, isPercentage: e }
              );
            }}
            className="cursor-pointer"
          />
        );
      },
    },  
    {
      header: 'Status',
      accessorKey: 'status',
      size: 100,
      cell: ({ row }: { row: any }) => {
        const rowData = row.original;
        return (
          <Switch
            checked={rowData.status}
            onCheckedChange={(e: boolean) => {
              update(
                fields.findIndex((f) => f.fr_id === rowData.fr_id),
                { ...rowData, status: e }
              );
            }}
            className="cursor-pointer"
          />
        );
      },
    },
    {
      header: 'Action',
      id: 'action',
      size: 100,
      cell: ({ row }: { row: any }) => {
        const rowData = row.original;
        return (
          <div className="flex gap-4">
            <EditIcon
              className="w-4 h-4 cursor-pointer"
              onClick={() => {
                const idx = fields.findIndex(f => f.fr_id === rowData.fr_id);
                setIndex(idx);
              }}
            />
            <TrashIcon
              className="w-4 h-4 cursor-pointer"
              onClick={() => {
                const idx = fields.findIndex(f => f.fr_id === rowData.fr_id);
                setDeleteIndex(idx);
              }}
            />
          </div>
        );
      },
    },
  ];

  return <TableComponent columns={columns} data={fields} />;
};

export default FeeTable;
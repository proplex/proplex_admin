import React from 'react';
import TableComponent from '@/components/TableComponent';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { EditIcon, TrashIcon } from 'lucide-react';

type Amenity = {
  amenities_id: string;
  name: string;
  description: string;
  image: string;
  status: boolean;
};

type AmenityTableProps = {
  data: Amenity[];
  onEdit: (item: Amenity) => void;
  onDelete: (item: Amenity) => void;
};

const AmenityTable: React.FC<AmenityTableProps> = ({ data =[], onEdit, onDelete }) => {
  const columns = [
    {
      header: 'Image',
      accessorKey: 'image',
    },
    {
      header: 'Amenity',
      accessorKey: 'name',
    },
    {
      header: 'Description',
      accessorKey: 'description',
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }: any) => {
        const rowData = row.original;
        return <Switch checked={rowData.status} disabled />;
      },
    },
    {
      header: 'Actions',
      accessorKey: 'action',
      cell: ({ row }: any) => {
        const rowData = row.original;
        return (
          <div className='flex gap-4'>
            <Button type='button' variant='ghost' onClick={() => onEdit(rowData)}>
              <EditIcon />
            </Button>
            <Button type='button' variant='ghost' onClick={() => onDelete(rowData)}>
              <TrashIcon />
            </Button>
          </div>
        );
      },
    },
  ];

  return <TableComponent columns={columns} data={data} model="amenity" />;
};

export default AmenityTable;

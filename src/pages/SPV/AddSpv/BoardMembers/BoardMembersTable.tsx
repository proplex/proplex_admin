import React from 'react';
import { Button } from '@/components/ui/button';
import { EditIcon, TrashIcon } from 'lucide-react';
import TableComponent from '@/components/TableComponent';

type BoardMembersTableProps = {
  fields: any[];
  setIndex: (index: number) => void;
  setDeleteIndex: (rowData: any) => void;
};

const BoardMembersTable: React.FC<BoardMembersTableProps> = ({ fields, setIndex, setDeleteIndex }) => {
  const columns = [
    { header: 'Name', accessorKey: 'fullName' },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Phone', accessorKey: 'phoneNumber' },
    { header: 'ID', accessorKey: 'idNumber' },
    {
      header: 'Actions',
      accessorKey: 'actions',
      cell: ({ row }: any) => {
        const rowData = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="text-black"
              onClick={() => {
                const findIndex = fields.findIndex(
                  (field) => field.a_id === rowData.a_id
                );
                setIndex(findIndex);
              }}
            >
              <EditIcon size={16} />
            </Button>
            <Button
              variant="outline"
              className=""
              onClick={() => {
                setDeleteIndex(rowData);
              }}
            >
              <TrashIcon size={16} />
            </Button>
          </div>
        );
      },
    },
  ];

  return <TableComponent columns={columns} data={fields} />;
};

export default BoardMembersTable;

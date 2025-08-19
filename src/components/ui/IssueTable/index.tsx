

import { useState } from 'react';
import TableComponent from '@/components/TableComponent';
import { Button } from '@/components/ui/button';

// Define proper column type matching TableComponent's expectations
interface ColumnType {
  header?: string;
  accessorKey: string;
  onChange?: (value: any, row: any) => void;
  type?: 'string' | 'number' | 'date' | 'switch' | 'action' | 'image';
}

interface IssueTableProps {
  header: string;
  description: string;
  NumberOfPartners: number;
  tableData: any[];
  columns: ColumnType[];
  action: any[];
  buttonText: string;
  issuesDialog: string;
  onCreate: (data: any) => void;
  onUpdate: (id: number, data: any) => void;
}

const IssueTable = ({
  header,
  description,
  NumberOfPartners,
  tableData,
  columns,
  action,
  buttonText,
  issuesDialog,
  onCreate,
  onUpdate,
}: IssueTableProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);

  const handleActionClick = (type: string, rowData: any) => {
    if (type === 'edit') {
      setEditingData(rowData);
      setIsDialogOpen(true);
    }
  };

  const handleSubmit = (data: any) => {
    if (editingData) {
      onUpdate(editingData.id, data);
    } else {
      onCreate(data);
    }
    setEditingData(null);
  };

  return (
    <div>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-xl font-semibold '> {header} </h1>
          <p className='text-sm text-gray-500'> {description} </p>
        </div>
        <p className='text-sm text-black rounded-full p-2 bg-gray-100 px-2 py-1'>
          {NumberOfPartners} Partners
        </p>
        <Button
          variant='outline'
          className='text-sm'
          onClick={() => {
            setIsDialogOpen(true);
          }}
        >
          {'Add Partner'}{' '}
        </Button>
      </div>
      <div className='mt-5'>
        <TableComponent columns={[]} data={tableData}  />
      </div>
    </div>
  );
};

export default IssueTable;

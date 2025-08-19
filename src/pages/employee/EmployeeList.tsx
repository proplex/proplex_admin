

import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useEmployee from '@/hooks/useEmployee';
import TableComponent from '@/components/TableComponent';
import { useNavigate } from 'react-router-dom';

export default function EmployeeList() {
  const navigate = useNavigate();
  const { employees, status, pager, fetchEmployees } = useEmployee();

  const handlePageChange = (page: number) => {
    // dispatch(fetchEmployee({ page, limit: pagination?.pageSize }));
  };

  const columns: any = [
    {
      header: 'EMPLOYEE ID',
      accessorKey: 'id',
      type: 'number',
    },
    {
      header: 'EMPLOYEE NAME',
      accessorKey: 'name',
      type: 'string',
    },
    {
      header: 'ROLE',
      accessorKey: 'role',
      type: 'string',
    },
    {
      header: 'CONTACT NUMBER',
      accessorKey: 'contact_number',
      type: 'string',
    },
    {
      header: 'EMPLOYEE EMAIL',
      accessorKey: 'email',
      type: 'string',
    },
    {
      header: 'STATUS',
      accessorKey: 'status',
      type: 'switch',
    },
    {
      header: 'ACTIONS',
      accessorKey: 'action',
      type: 'action',
    },
  ];
  const data = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Admin',
      contact_number: '1234567890',
      email: 'john.doe@example.com',
      status: true,
    },
    {
      id: 2,
      name: 'Jane Doe',
      role: 'Manager',
      contact_number: '1234567890',
      email: 'jane.doe@example.com',
      status: true,
    },
  ];
  const action = [
    {
      header: 'Edit',
      icon: <Pencil />,
      onClick: (row: any) => {
        navigate(`/edit-employee/${row.id}`);
      },
    },
    {
      header: 'Delete',
      icon: <Trash2 />,
      onClick: () => {
        console.log('delete');
      },
    },
  ];

  return (
    <div className='container mx-auto p-6'>
      <div className='mb-6 flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-gray-900'>EMPLOYEE LIST</h1>
        <Button className='bg-primary text-white'>
          <Plus className='mr-2 h-4 w-4' />
          Add New Employee
        </Button>
      </div>

      <div className='rounded-lg border bg-white shadow'>
        <TableComponent columns={columns} data={data} />
      </div>
      {/* <Pagination pager={pager} onPageChange={handlePageChange} /> */}
    </div>
  );
}

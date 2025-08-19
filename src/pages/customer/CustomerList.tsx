

import { useNavigate } from 'react-router-dom';

import Pagination from '@/layout/Pagination';
import { useCustomers } from '@/hooks/userCustomers';
import TableComponent from '@/components/TableComponent';
import { Eye, Pencil } from 'lucide-react';

export default function CustomerList() {
  const { pagination, users, goToPage, loading } = useCustomers();

  const handlePageChange = (page: number) => {
    goToPage({ page, limit: pagination?.pageSize });
  };
 
const columns = [
  {
    header: 'CUSTOMER ID',
    accessorKey: 'id',
  },
  {
    header: 'CUSTOMER NAME',
    accessorKey: 'name',
  },
  {
    header: 'Mobile No',
    accessorKey: 'mobile_no',
  },
  {
    header: 'Wallet Address',
    accessorKey: 'wallet_address',
  },
  {
    header: 'LAST ACTIVITY',
    accessorKey: 'last_activity',
  },
  {
    header: 'INVESTED',
    accessorKey: 'invested',
  },
  {
    header: 'TOTAL VALUE',
    accessorKey: 'total_value',
  },
  {
    header: 'CURRENT LOCATION',
    accessorKey: 'current_location',
  },
  {
    header: 'E-KYC',
    accessorKey: 'e_kyc',
  },
  {
    header: 'ACTIONS',
    accessorKey: 'actions',
  }
]
const data = [
  {
    id: 1,
    name: 'John Doe',
    mobile_no: '1234567890',
    wallet_address: '1234567890',
    last_activity: '1234567890',
    invested: '1234567890',
    total_value: '1234567890',
    current_location: '1234567890',
    e_kyc: '1234567890',
  },
  {
    id: 2,
    name: 'Jane Doe',
    mobile_no: '1234567890',
    wallet_address: '1234567890',
    last_activity: '1234567890',
    invested: '1234567890',
    total_value: '1234567890',
    current_location: '1234567890',
    e_kyc: '1234567890',
  }
]
const actions = [
  {
    header: 'View',
    icon: <Eye />,
    accessorKey: 'view',
    onClick: () => {
      console.log('view');
    },
  },
  {
    header: 'Edit',
    icon: <Pencil />,
    accessorKey: 'edit',
    onClick: () => {
      console.log('edit');
    },
  }
] 
  return (
    <div className='container mx-auto p-6'>
      <div className='mb-6 flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-gray-900'>CUSTOMER LIST</h1>
      </div>

      <div className='rounded-lg border bg-white shadow'>
        <div className='overflow-x-auto'>
          {/* <Table className='w-full border-collapse'>
            <TableHeader>
              <TableRow className='border-b bg-gray-50 text-left text-xs text-gray-500'>
                <TableHead className=''>CUSTOMER ID</TableHead>
                <TableHead className=''>CUSTOMER NAME</TableHead>
                <TableHead className=''>MOBILE NO</TableHead>
                <TableHead className=''>ESCROW USER ID</TableHead>
                <TableHead className=''>STATUS</TableHead>
                <TableHead className=''>E-KYC</TableHead>
                <TableHead className=''>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='divide-y'>
              {users.map((customer: any) => (
                <TableRow
                  key={customer.id}
                  className='text-sm text-gray-700v cursor-pointer'
                >
                  <TableCell className=''>{customer.id}</TableCell>
                  <TableCell className=''>
                    <div className='flex items-center gap-3'>
                      <img
                        src={customer.avatar}
                        alt=''
                        className='h-8 w-8 rounded-full bg-gray-200'
                      />
                      <div>
                        <div className='font-medium'>{customer.name}</div>
                        <div className='text-xs text-gray-500'>
                          {customer.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className=''>
                    {(customer.country_code &&
                      customer.country_code + ' - ' + customer.phone) || "-"}
                  </TableCell>
                  <TableCell className=''>
                    {customer.escrow_user_id || '-'}{' '}
                  </TableCell>
                  <TableCell className=''>{customer.status || '-'}{' '}</TableCell>
                  <TableCell className=''>
                    {customer.pan_verified && customer.aadhaar_verified ? (
                      <div className='flex items-center gap-2'>
                        <Lock className='h-5 w-5 text-green-500' />
                        <span className='text-green-500'>Verified</span>
                      </div>
                    ) : (
                      <div className='flex items-center gap-2'>
                        <Lock className='h-5 w-5 ' />
                        <span className=''>Not Verified</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className='px-6 py-4'>
                    <div className='flex gap-2'>
                      <Button
                        size='icon'
                        variant='ghost'
                        className='text-purple-500'
                        onClick={() =>
                          navigate(`/customers-profile/${customer.id}`)
                        }
                      >
                        <Eye className='h-5 w-5' />
                        <span className='sr-only'>View</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table> */}
          <TableComponent columns={columns} data={data} />

        </div>
      </div>
      {/* {pagination && (
        <Pagination pager={pagination} onPageChange={handlePageChange} />
      )} */}
    </div>
  );
}

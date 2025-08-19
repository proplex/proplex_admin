

import React from 'react';
import { EyeIcon } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Pagination from '@/layout/Pagination';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import useCancel from '@/hooks/useCancel';
import Loading from '@/components/ui/Loading';

const CancelTable: React.FC<{ cancels: any[]; navigate: any }> = ({
  cancels,
  navigate,
}) => (
  <Table className='text-left'>
    <TableHeader>
      <TableRow>
        <TableHead>CANCEL ID</TableHead>
        <TableHead>ORDER ID</TableHead>
        <TableHead>Customer Name</TableHead>
        <TableHead>Project Name</TableHead>
        <TableHead>REASON</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {cancels.map((cancel) => (
        <TableRow key={cancel.id} className='border-t hover:bg-gray-50'>
          <TableCell>{cancel?.id ?? 'N/A'}</TableCell>
          <TableCell>{cancel?.order_id ?? 'N/A'}</TableCell>
          <TableCell>{cancel?.user?.name ?? 'N/A'}</TableCell>
          <TableCell>{cancel?.order?.property?.name ?? 'N/A'}</TableCell>
          <TableCell>{cancel?.reason ?? 'N/A'}</TableCell>
          <TableCell>
            <div className='flex gap-4'>
              <Button
                onClick={() => navigate(`/order-details/${cancel.order_id}`)}
                type='button'
                variant={'outline'}
              >
                <EyeIcon className='w-5 h-5' />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { cancels, pagination, isLoading, refetch } = useCancel();

  const handlePageChange = (page: number) => {
    if (pagination) {
      refetch({
        page,
        limit: pagination.pageSize || 10,
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  // if (!cancels || cancels.length === 0) {
  //   return <div className='p-4 space-y-4'>
  //     <h1 className='text-2xl font-bold text-gray-800'>
  //       Cancel Requests
  //     </h1>
  //     </div>;
  // }

  
  return (
    <div className='p-4 space-y-4'>
      <h1 className='text-2xl font-bold text-gray-800'>
        Order Cancel Requests
      </h1>
      <div className='rounded-lg border bg-white overflow-x-auto'>
        <CancelTable cancels={cancels} navigate={navigate} />
      </div>
      {/* {pagination && (
        <Pagination pager={pagination} onPageChange={handlePageChange} />
      )} */}
    </div>
  );
};

export default Index;

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateEmp, formatTime } from '@/helpers/date_fns';
import useFetchUserOrders from '@/hooks/order/useFetchUserOrdersv1';
import Pagination from '@/layout/Pagination';
import { EllipsisVertical, Eye, EyeIcon, Pencil } from 'lucide-react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

export function OrderTable() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders, pagination, refetch } = useFetchUserOrders({
    page: 1,
    limit: 10,
    user_id: id ? parseInt(id) : undefined,
  });
  const handlePageChange = (page: number) => {
    refetch({
      page,
      limit: pagination?.pageSize,
    });
  };

  return (
    <div className='w-full overflow-x-auto px-4'>
      <h1 className='font-bold text-2xl m-2'>Orders</h1>
      <div className='rounded-lg border bg-white overflow-x-auto'>
        <Table className='text-left'>
          <TableHeader>
            <TableRow>
              <TableHead>ORDER ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Project Name</TableHead>
              <TableHead>No Of Token</TableHead>
              <TableHead>Total Value</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className='border-t hover:bg-gray-50'>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.property.name}</TableCell>
                <TableCell>{order.number_of_token}</TableCell>
                <TableCell>{order?.total_amount}</TableCell>
                <TableCell>{formatDateEmp(order.created_at)}</TableCell>
                <TableCell>
                  <div className='flex gap-4'>
                    <Button
                      onClick={() => navigate(`/order-details/${order.id}`)}
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
      </div>
      {/* {pagination && (
        <Pagination pager={pagination} onPageChange={handlePageChange} />
      )} */}
    </div>
  );
}



import React from 'react';
import { Button } from '@/components/ui/button';
import AddFeePercentage from './AddFeePercentage';
import Loading from '@/components/ui/Loading';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useFetchPercentages from '@/hooks/useFetchPercentages';
import { Pencil, Trash2 } from 'lucide-react';
import { Dialog } from '@radix-ui/react-dialog';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import useCrud from '@/hooks/useCrud';
import toast from 'react-hot-toast';
// import Pagination from '@/layout/Pagination';

function Index() {
  const { remove } = useCrud('percentage');
  const { data = [], loading, error, refetch, pager } = useFetchPercentages();
  const [deleteItem, setDeleteItem] = React.useState<any>(null);
  const [selectedItem, setSelectedItem] = React.useState<any>(null);
  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  const handleCreate = () => {
    setSelectedItem({});
  };
  const closeDeleteModal = () => {
    setDeleteItem(null);
  };

  const handleDelete = () => {
    if (deleteItem) {
      remove(deleteItem.id)
        .then((response) => {
          if (response) {
            refetch();
            closeDeleteModal();
          } else {
            toast.error('An error occurred');
          }
        })
        .catch((err: Error) => {
          closeDeleteModal();
          toast.error(err.message || 'An error occurred');
        });
    }
  };

  const refetchCall = () => {
    refetch();
  };

  const handlePageChange = (page: number) => {
    refetch(page, pager?.pageSize);
  };
  return (
    <div>
      <AddFeePercentage
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        refetch={refetchCall}
      />

      <Dialog open={deleteItem} onOpenChange={closeDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Fee Percentage</DialogTitle>
          </DialogHeader>
          <div className='flex justify-between items-center'>
            <p>Are you sure you want to delete this fee percentage?</p>
            <div className='flex space-x-4'>
              <Button variant='outline' onClick={closeDeleteModal}>
                Cancel
              </Button>
              <Button onClick={handleDelete}>Delete</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className='flex justify-between items-center mb-3'>
        <h2 className='text-lg font-semibold'>Fee Percentages</h2>
        <Button type='button' onClick={handleCreate}>
          Create New
        </Button>
      </div>
      <div className='rounded-lg border bg-white overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow className='border-b bg-gray-50 text-left text-sm text-gray-500'>
              <TableHead>NAME</TableHead>
              <TableHead>VALUE</TableHead>
              <TableHead>FILM%</TableHead>
              <TableHead>MUSIC%</TableHead>
              <TableHead>WEB SERIES%</TableHead>
              <TableHead>BOOKS%</TableHead>
              <TableHead>SPORTS%</TableHead>
              <TableHead>TYPE</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id} className='text-sm text-gray-500'>
                <TableCell>{item.name || '-'}</TableCell>
                <TableCell>{item.value || '-'}</TableCell>
                <TableCell>{item.film || '-'}</TableCell>
                <TableCell>{item.music || '-'}</TableCell>
                <TableCell>{item.web_series || '-'}</TableCell>
                <TableCell>{item.books || '-'}</TableCell>
                <TableCell>{item.sports || '-'}</TableCell>
                <TableCell>{item.type || '-'}</TableCell>
                <TableCell>{item.status ? 'Active' : 'Inactive'}</TableCell>
                <TableCell>
                  <div className='space-x-2'>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={() => setSelectedItem(item)}
                    >
                      <Pencil className='h-5 w-5' />
                    </Button>
                    <Button type='button' onClick={() => setDeleteItem(item)}>
                      <Trash2 className='h-5 w-5' />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* {pager && <Pagination pager={pager} onPageChange={handlePageChange} />} */}
    </div>
  );
}

export default Index;

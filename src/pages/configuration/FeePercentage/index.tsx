import React, { useState } from 'react';
import {
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  Table,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { moneyFormat } from '@/helpers/date_fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import AddFeePercentage from './AddFeePercentage';
// import SwitchFee from '@/helpers/feeSwitch';
import useFeePercentage from '@/hooks/useFeePercentage';
import { Switch } from '@/components/ui/switch';
import toast from 'react-hot-toast';
import Loading from '@/components/ui/Loading';

const FeePercentage: React.FC = () => {
  const property_type = [
    { value: 1, label: 'Film' },
    { value: 3, label: 'Music' },
    { value: 2, label: 'Web Series' },
    { value: 5, label: 'Sport' },
    { value: 4, label: 'Books' },
  ];
  const [deleteItem, setDeleteItem] = useState<any>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const { fee, status, deleteFee, createFee, updateFee } = useFeePercentage();

  const handleAdd = () => {
    setSelectedItem({});
  };

  const handleDeleteConfirm = async () => {
    if (!deleteItem) return;
    const result = await deleteFee(deleteItem.id);
    if (result?.data.message === 'Fee Percentage deleted successfully') {
      setDeleteItem(null);
    }
  };

  if (status === 'fetching') {
    return <Loading />;
  }

  const handleEdit = (item: any) => {
    setSelectedItem(item);
  };

  const handleOnUpdate = async (data: any) => {
    try {
      await updateFee(data.id, data);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Dialog open={deleteItem} onOpenChange={() => setDeleteItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Fee Percentage</DialogTitle>
          </DialogHeader>
          <div className='flex justify-between items-center'>
            <p>Are you sure you want to delete this fee percentage?</p>
            <div className='flex space-x-4'>
              <Button variant='outline' onClick={() => setDeleteItem(null)}>
                Cancel
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                disabled={status === 'deleting'}
              >
                {status === 'deleting' ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-semibold text-gray-800'>
          Fee Percentages
        </h1>
        <Button onClick={handleAdd}>Add Fee %</Button>
      </div>

      <div className='rounded-lg border bg-white overflow-x-auto'>
        <Table>
          <TableHeader className='bg-gray-50'>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>%</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fee?.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>{item.name || '-'}</TableCell>
                <TableCell>
                  {property_type.find((type) => type.value === item.type)
                    ?.label || '-'}
                </TableCell>
                <TableCell>{item.value || '-'}</TableCell>
                <TableCell>
                  <Switch
                    checked={item.status || false}
                    onCheckedChange={() => {
                      handleOnUpdate({
                        ...item,
                        status: !item.status,
                      });
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={item.is_percentage || false}
                    onCheckedChange={() => {
                      handleOnUpdate({
                        ...item,
                        is_percentage: !item.is_percentage,
                      });
                    }}
                  />
                </TableCell>
                <TableCell className='flex space-x-2'>
                  <Button variant='outline' onClick={() => handleEdit(item)}>
                    <Pencil className='w-5 h-5' />
                  </Button>
                  <Button
                    variant='outline'
                    onClick={() => setDeleteItem(item)}
                    disabled={item.name.toLowerCase() === 'eoi'}
                  >
                    <Trash2 className='w-5 h-5' />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <AddFeePercentage
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        updateFee={updateFee}
        createFee={createFee}
      />
    </div>
  );
};

export default FeePercentage;

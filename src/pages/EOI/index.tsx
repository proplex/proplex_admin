

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
import { Pencil } from 'lucide-react';
import useEOI from '@/hooks/useEOI';
import { contentType } from '@/constants/global';
import Add from './Add';
import Loading from '@/components/ui/Loading';

const EOI: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const { eois, fetchEois, status } = useEOI();

  const handleAdd = () => {
    setSelectedItem({});
  };

  const handleEdit = (item: any) => {
    setSelectedItem(item);
  };

  if (status === 'fetching') {
    return <Loading />;
  }

  return (
    <div className='container mx-auto p-6 space-y-6'>
      <Add
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        fetchEois={fetchEois}
      />
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-semibold text-gray-800'>{`EOI's`}</h1>
        <Button onClick={handleAdd}>Add EOI</Button>
      </div>

      <div className='rounded-lg border bg-white overflow-x-auto'>
        <Table>
          <TableHeader className='bg-gray-50'>
            <TableRow>
              <TableHead>Sl No</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {eois?.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>{item.id || '-'}</TableCell>
                <TableCell>
                  {contentType.find((type) => Number(type.value) === item.type)
                    ?.label || '-'}
                </TableCell>
                <TableCell>{item.value || '-'}</TableCell>
                <TableCell className='flex space-x-2'>
                  <Button variant='outline' onClick={() => handleEdit(item)}>
                    <Pencil className='w-5 h-5' />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EOI;

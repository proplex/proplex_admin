

import React from 'react';
import {
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  Table,
  TableCell,
} from '@/components/ui/table';
import {
  useFieldArray,
  Control,
  FieldValues,
  useFormContext,
} from 'react-hook-form';
import { convertDateAndTimeToLocal } from '@/helpers/global';
import { Button } from '@/components/ui/button';
import AddAdvisor from './AddAdvisor';
import { Pencil, Trash2 } from 'lucide-react';
import { Dialog } from '@radix-ui/react-dialog';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useParams } from 'react-router-dom';
import useDeleteAdvisor from '@/hooks/useDeleteAdvisor';

export type Field = {
  id: string; // or number, depending on your data
  name?: string;
  email?: string;
  phone_number?: string;
  updated_at?: string;
};

const Index: React.FC = () => {
  const { control } = useFormContext();
  const { id: companyId } = useParams<{ id: string }>();
  const { deleteAdvisorCall } = useDeleteAdvisor();
  const [index, setIndex] = React.useState<any>(null);
  const [deleteAdvisor, setDeleteAdvisor] = React.useState<any>(null);
  const { fields, remove } = useFieldArray({
    control,
    name: 'LLPAdvisorsMembers',
    keyName: 'advisor_id',
  });

  const handleLegalAdvisor = (id?: number) => {
    if (id !== undefined && id > -1) {
      setIndex(id);
    } else {
      setIndex(-1);
    }
  };

  const closeDeleteModal = () => {
    setDeleteAdvisor(null);
  };

  const handleDeleteAdvisor = () => {
    if (companyId) {
      deleteAdvisorCall(deleteAdvisor.id, Number(companyId));
      remove(fields.findIndex((item: any) => item.id === deleteAdvisor.id));
      closeDeleteModal();
    } else {
      return null;
    }
  };

  return (
    <div>
      <AddAdvisor fields={fields} index={index} setIndex={setIndex} />
      <Dialog open={deleteAdvisor} onOpenChange={closeDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Advisor</DialogTitle>
          </DialogHeader>
          <div className='flex justify-between items-center'>
            <p>Are you sure you want to delete this advisor?</p>
            <div className='flex space-x-4'>
              <Button variant='outline' onClick={closeDeleteModal}>
                Cancel
              </Button>
              <Button onClick={handleDeleteAdvisor}>Delete</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-semibold text-gray-800 mb-4'>
          Legal Advisors
        </h1>
        <Button onClick={() => handleLegalAdvisor()} type='button'>
          <span className='text-sm'>Add Legal Advisor</span>
        </Button>
      </div>
      <div className='rounded-lg border bg-white overflow-x-auto'>
        <Table className='bg-white-100 rounded-lg border'>
          <TableHeader className='text-left bg-gray-50'>
            <TableRow>
              <TableHead>Sl No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((item: any, i) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{item.name || '-'}</TableCell>
                <TableCell>{item.email || '-'}</TableCell>
                <TableCell>{item.phone_number || '-'}</TableCell>
                <TableCell>
                  {convertDateAndTimeToLocal(item.updated_at)}
                </TableCell>
                <TableCell className='flex space-x-2'>
                  <Button
                    variant='outline'
                    type='button'
                    onClick={() => {
                      setIndex(i);
                    }}
                  >
                    <Pencil className='w-5 h-5' />
                  </Button>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => {
                      setDeleteAdvisor(item);
                    }}
                  >
                    <Trash2 className='w-5 h-5' />
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

export default Index;

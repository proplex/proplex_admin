

import React from 'react';
import {
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  Table,
  TableCell,
} from '@/components/ui/table';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { convertDateAndTimeToLocal } from '@/helpers/global';
import { Button } from '@/components/ui/button';
import AddMemeber from './AddMember';
import { Pencil, Trash2 } from 'lucide-react';
import useDeleteCompanyMember from '@/hooks/useDeleteCompanyMember';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useParams } from 'react-router-dom';

const Index: React.FC = () => {
  const { control } = useFormContext();
  const [index, setIndex] = React.useState<any>(null);
  const { id: companyId } = useParams<{ id: string }>();
  const [deleteMember, setDeleteMember] = React.useState<any>(null);
  const { deleteCompanyMember, loading: deleteLoading } =
    useDeleteCompanyMember();
  const { fields, remove, update, append } = useFieldArray({
    control,
    name: 'LLPBoardMembers',
    keyName: 'board_member_id',
  });

  const handleMember = (id?: number) => {
    if (id !== undefined && id > -1) {
      setIndex(id);
    } else {
      setIndex(-1);
    }
  };

  const closeDeleteModal = () => {
    setDeleteMember(null);
  };

  const handleDeleteMember = () => {
    if (companyId) {
      deleteCompanyMember(deleteMember.id, Number(companyId));
      remove(fields.findIndex((item: any) => item.id === deleteMember.id));
      closeDeleteModal();
    } else {
      return null;
    }
  };

  return (
    <div>
      <AddMemeber
        update={update}
        append={append}
        fields={fields}
        index={index}
        setIndex={setIndex}
      />
      <Dialog open={deleteMember} onOpenChange={closeDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Board Member</DialogTitle>
          </DialogHeader>
          <div className='flex justify-between items-center'>
            <p>Are you sure you want to delete this board member?</p>
            <div className='flex space-x-4'>
              <Button variant='outline' onClick={closeDeleteModal}>
                Cancel
              </Button>
              <Button onClick={handleDeleteMember}>Delete</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-semibold text-gray-800 mb-4'>
          Board Members
        </h1>
        <Button onClick={() => handleMember()} type='button'>
          <span className='text-sm'>Add Board Member</span>
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
              <TableHead>Updated On</TableHead>
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
                    variant='outline'
                    type='button'
                    onClick={() => {
                      setDeleteMember(item);
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

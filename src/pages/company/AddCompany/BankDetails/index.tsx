

import { useFieldArray, useFormContext } from 'react-hook-form';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import EscrowDetails from './EscrowDetails';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import AddBank from './AddBank';

const Index = () => {
  const { control, getValues } = useFormContext();
  const [index, setIndex] = useState<any>(null);
  const { fields, remove, append, update } = useFieldArray({
    control,
    name: 'bankAccounts',
    keyName: 'bank_id',
  });

  const handleBankAccount = () => {
    setIndex(-1);
  };

  const escrowDetails = getValues('escrowDetails');
  const escrow_user_id = getValues('escrow_user_id');

  return (
    <div className='w-full overflow-x-scroll space-y-4'>
      <AddBank
        escrow_user_id={escrow_user_id}
        append={append}
        fields={fields}
        index={index}
        setIndex={setIndex}
      />
      <h1 className='text-2xl font-semibold text-gray-800 mb-4'>
        Bank Details
      </h1>

      <div className='rounded-lg bg-white overflow-x-auto space-y-6'>
        <div className='space-y-2'>
          <h1 className='text-xl'>Escrow Details</h1>
          <EscrowDetails userInfo={escrowDetails} />
        </div>
        <div className='space-y-2'>
          <div className='flex justify-between items-center'>
            <h1 className='text-xl'>Bank Accounts</h1>
            <Button
              type='button'
              onClick={handleBankAccount}
              disabled={!escrow_user_id}
            >
              <span>Add Bank Account</span>
            </Button>
          </div>
          <Table className='bg-white-100 rounded-lg border'>
            <TableHeader className='text-left bg-gray-50'>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Bank Name</TableHead>
                <TableHead>Bank Account</TableHead>
                <TableHead>Bank IFSC</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id || '-'}</TableCell>
                  <TableCell>{item.name || '-'}</TableCell>
                  <TableCell>{item.bank_name || '-'}</TableCell>
                  <TableCell>{item.bank_account || '-'}</TableCell>
                  <TableCell>{item.bank_ifsc || '-'}</TableCell>
                  <TableCell>{item.verified}</TableCell>
                  <TableCell>{item.bank_status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Index;



import { useFormContext } from 'react-hook-form';
import EscrowDetails from './EscrowDetails';
import { useState } from 'react';
import Transactions from './Transactions';
import Distributions from './Distributions';
import useRoyalties from '@/hooks/useRoyalties';
import { useParams } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Index = () => {
  const { setValue, watch } = useFormContext();
  const [data, setData] = useState<any>({});
  const [date, setDate] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const escrowDetails = watch('royaltyEscrowDetails');
  const [tab, setTab] = useState('customers');
  const { id: company_id = null } = useParams<{ id: string }>();
  const { royalties, submitDistribution } = useRoyalties({
    companyId: company_id,
    setDate,
  });

  const setTabHandler = (tab: string) => {
    setTab(tab);
  };

  const handleChange = (value: string) => {
    setDate(value);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const onChangeHandler = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await submitDistribution(data);
    setIsOpen(false);
  };

  const disableDistribute = escrowDetails?.name ? false : true;

  return (
    <div className='w-full overflow-x-scroll space-y-4'>
      <h1 className='text-2xl font-semibold text-gray-800 mb-4'>
        Royalty Details
      </h1>

      <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Royalty Distribution</DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
            <div className='grid grid-cols-1 gap-6'>
              <div>
                <label htmlFor='amount'>Amount</label>
                <Input name='amount' type='number' onChange={onChangeHandler} />
              </div>
              <div>
                <label htmlFor='decription'>Description</label>
                <Textarea name='description' onChange={onChangeHandler} />
              </div>
            </div>
            <div className='flex justify-end gap-2'>
              <Button type='button' variant='outline' onClick={handleClose}>
                Cancel
              </Button>
              <Button type='button' onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className=' bg-white overflow-x-auto space-y-6'>
        <div className='space-y-2'>
          <h1 className='text-xl'>Royalty Escrow Details</h1>
          <EscrowDetails userInfo={escrowDetails} setValue={setValue} />
        </div>
        <div className='flex items-end justify-end'>
          <Button
            onClick={handleOpen}
            type='button'
            className={`${disableDistribute ? 'opacity-20' : ''}`}
            disabled={disableDistribute}
          >
            Distribution Royalty
          </Button>
        </div>
        <div className='flex justify-between items-center'>
          <div className='space-x-8 text-gray-500 flex font-semibold'>
            <div
              onClick={() => setTabHandler('customers')}
              className={`cursor-pointer border-b-2 p-2 ${
                tab === 'customers'
                  ? 'text-blue-800 border-blue-400 '
                  : 'border-transparent'
              }`}
            >
              Customers
            </div>
            <div
              onClick={() => setTabHandler('transactions')}
              className={`cursor-pointer border-b-2 p-2 ${
                tab === 'transactions'
                  ? 'text-blue-800 border-blue-400 '
                  : 'border-transparent'
              }`}
            >
              Transactions
            </div>
          </div>
          {tab === 'customers' && (
            <Select onValueChange={handleChange} value={date ?? undefined}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Select a Date' />
              </SelectTrigger>
              <SelectContent className='max-h-60 overflow-y-auto'>
                <SelectGroup>
                  {royalties?.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </div>
        <div>{tab === 'transactions' && <Transactions />}</div>
        <div>{tab === 'customers' && <Distributions date={date} />}</div>
      </div>
    </div>
  );
};

export default Index;



import { DialogHeader } from '@/components/ui/CustomDialog';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import FormGenerator from '@/components/UseForm/FormGenerator';
import { formConfig } from './formConfig';
import { Button } from '@/components/ui/button';
import { useForm, useFormContext } from 'react-hook-form';
import useRoyaltyAccount from '@/hooks/useRoyaltyAccount';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

interface IndexProps {
  user: any;
  setUser: (user: any) => void;
  setValue: any;
}

const Index = ({ user, setUser, setValue }: IndexProps) => {
  const { control, trigger, getValues, reset } = useForm({
    mode: 'onBlur',
  });
  const { id: company_id } = useParams();
  const isOpen = user !== null;
  const handleOnClose = () => {
    setUser(null);
    reset();
  };
  const { loading, createRoyaltyAccount, getRoyaltyAccount } =
    useRoyaltyAccount();

  const onSubmit = async () => {
    try {
      const isValid = await trigger();
      if (isValid) {
        const data = getValues();
        await createRoyaltyAccount({ data, company_id }).then((res) => {
          if (res) {
            getRoyaltyAccount(company_id).then((res) => {
              setValue('royaltyEscrowDetails', res.data);
            });
            toast.success('Royalty Account Added Successfully');
            handleOnClose();
          }
        });
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };
  return (
    <Dialog open={!!isOpen} onOpenChange={(open) => !open && handleOnClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Details From Royalty Account</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <div className='flex flex-col gap-6'>
            {FormGenerator(formConfig({ control }))}
          </div>
          <div className='flex justify-end gap-2'>
            <Button type='button' variant='outline' onClick={handleOnClose}>
              Cancel
            </Button>
            <Button onClick={onSubmit} type='button' disabled={loading}>
              {loading ? 'Loading...' : 'Submit'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Index;

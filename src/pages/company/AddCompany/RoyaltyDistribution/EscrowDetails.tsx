

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Mail, Phone, User } from 'lucide-react';
import { useState } from 'react';
import CreateRoyalyAccount from './CreateRoyaltyAccount';

interface UserInfo {
  name: string;
  acccount_number: string;
  balance: string;
  bank_name: string;
  ifsc_code: string;
  id: number;
  country_code: number;
  mobile_no: number;
  email: string;
  status: number;
  created_at: string;
  pan_status: string;
}

export default function EscrowDetails({
  userInfo,
  setValue,
}: {
  userInfo: UserInfo;
  setValue: any;
}) {
  const [user, setUser] = useState<any>(null);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const createAccount = () => {
    setUser({});
  };

  return (
    <Card className='w-full'>
      <CreateRoyalyAccount user={user} setUser={setUser} setValue={setValue} />
      <CardHeader>
        <CardTitle className='flex items-center gap-32 justify-between'>
          <span className='flex items-center'>
            <User className='mr-2' />
            {userInfo.name || '-'}
          </span>
          {!userInfo?.ifsc_code && (
            <Button type='button' onClick={createAccount}>
              Create Account
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <h3 className='font-semibold text-sm text-muted-foreground mb-1'>
              Account Number
            </h3>
            <p className='text-sm'>{userInfo.acccount_number || '-'}</p>
          </div>
          <div>
            <h3 className='font-semibold text-sm text-muted-foreground mb-1'>
              Balance
            </h3>
            <p className='text-sm'>{userInfo.balance || '-'}</p>
          </div>
          <div>
            <h3 className='font-semibold text-sm text-muted-foreground mb-1'>
              Bank Name
            </h3>
            <p className='text-sm'>{userInfo.bank_name || '-'}</p>
          </div>
          <div>
            <h3 className='font-semibold text-sm text-muted-foreground mb-1'>
              IFSC Code
            </h3>
            <p className='text-sm'>{userInfo.ifsc_code || '-'}</p>
          </div>
        </div>
        <div className='flex items-center'>
          <CreditCard className='mr-2 h-4 w-4 text-muted-foreground' />
          <span className='text-sm'>ID: {userInfo.id || '-'}</span>
        </div>
        <div className='flex items-center'>
          <Phone className='mr-2 h-4 w-4 text-muted-foreground' />
          <span className='text-sm'>
            +{userInfo.country_code || '-'} {userInfo.mobile_no || '-'}
          </span>
        </div>
        <div className='flex items-center'>
          <Mail className='mr-2 h-4 w-4 text-muted-foreground' />
          <span className='text-sm'>{userInfo.email || '-'}</span>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <h3 className='font-semibold text-sm text-muted-foreground mb-1'>
              Created At
            </h3>
            <p className='text-sm'>{formatDate(userInfo.created_at) || '-'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}



import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Mail, Phone, User } from 'lucide-react';

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

export default function EscrowDetails({ userInfo }: { userInfo: UserInfo }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='flex items-center gap-32'>
          <span className='flex items-center'>
            <User className='mr-2' />
            {userInfo.name || '-'}
          </span>
          {/* <Badge variant={userInfo.status === 1 ? 'default' : 'destructive'}>
            {userInfo.status === 1 ? 'Active' : 'Inactive'}
          </Badge> */}
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

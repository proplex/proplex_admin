

import { useParams } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { formatTime, moneyFormat } from '@/helpers/date_fns';
import { useGetCustomer } from '@/hooks/useGetCustomer';
import {
  User,
  Phone,
  MapPin,
  Star,
  Clock,
  Mail,
  Wallet,
  FileCheck,
  Banknote,
  Hash,
} from 'lucide-react';

export default function UserProfileDashboard() {
  const { id } = useParams();
  const { data, loading, error } = useGetCustomer(Number(id));
  const user = data?.user || {};
  const escrow = data?.escrow || {};

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className='p-6 bg-gray-100'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <UserDetailsCard user={user} />
        <StatusCard escrow={escrow} />
      </div>
    </div>
  );
}

function UserDetailsCard({ user }: { user: any }) {
  return (
    <Card className='col-span-1'>
      <CardHeader>
        <CardTitle className='font-bold text-black'>User Details</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='flex items-center gap-4'>
          <Avatar className='w-24 h-24'>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className='space-y-2'>
            <InfoItem icon={User} label='User Name' value={user.name} />
            <InfoItem icon={Mail} label='Mail' value={user.email} />
            <InfoItem
              icon={Phone}
              label='Phone'
              value={(user.country_code && user.country_code + ' - ' + user.phone) || "-"}
            />
          </div>
        </div>
        <ul className='space-y-4'>
          <InfoItem
            icon={Star}
            label='Status'
            value={<Badge variant='default'>{user.status || "-"}</Badge>}
          />
          <InfoItem
            icon={MapPin}
            label='Location'
            value={user.address || 'Not provided'}
          />
          <InfoItem
            icon={Star}
            label='Referral Code'
            value={
              <code className='px-2 py-1 text-xs font-mono bg-gray-100 rounded dark:bg-gray-700'>
                {user.referral_token}
              </code>
            }
          />
          <InfoItem
            icon={Clock}
            label='Joined At'
            value={formatTime(user.created_at)}
          />
        </ul>
      </CardContent>
    </Card>
  );
}

function StatusCard({ escrow }: { escrow: any }) {
  return (
    <Card className='col-span-1'>
      <CardHeader>
        <CardTitle>Escrow Details</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className='space-y-4'>
          <InfoItem
            icon={Star}
            label='Status'
            value={escrow.status === 1 ? 'Active' : 'Inactive'}
          />
          <InfoItem icon={Mail} label='Email' value={escrow.email || '-'} />
          <InfoItem
            icon={Phone}
            label='Mobile No'
            value={(escrow.mobile_no && `+${escrow.country_code} ${escrow.mobile_no}`) || '-'}
          />
          <InfoItem
            icon={Wallet}
            label='Wallet Balance'
            value={moneyFormat(escrow.balance)}
          />
          <InfoItem
            icon={Banknote}
            label='Bank Name'
            value={escrow.bank_name || '-'}
          />
          <InfoItem
            icon={Hash}
            label='Account Number'
            value={escrow.acccount_number || '-'}
          />
          <InfoItem icon={Hash} label='IFSC Code' value={escrow.ifsc_code || '-'} />
          <InfoItem
            icon={FileCheck}
            label='Pan Status'
            value={
              <Badge
                variant={
                  escrow.pan_status === 'verified' ? 'default' : 'secondary'
                }
              >
                {escrow.pan_status || 'Not verified'}
              </Badge>
            }
          />
        </ul>
      </CardContent>
    </Card>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<any>;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <li className='flex items-center gap-3 text-sm'>
      <Icon className='w-5 h-5 text-primary' />
      <span className='font-medium'>{label}:</span>
      <span className='text-gray-600 dark:text-gray-300'>{value}</span>
    </li>
  );
}

function LoadingSkeleton() {
  return (
    <div className='p-6 bg-gray-100'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Card className='col-span-1'>
          <CardHeader>
            <Skeleton className='h-6 w-1/3' />
          </CardHeader>
          <CardContent className='space-y-4'>
            <Skeleton className='h-24 w-24 rounded-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
          </CardContent>
        </Card>
        <Card className='col-span-1'>
          <CardHeader>
            <Skeleton className='h-6 w-1/3' />
          </CardHeader>
          <CardContent className='space-y-4'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className='p-6 bg-gray-100'>
      <Card className='col-span-2'>
        <CardContent className='text-center  p-4'>
          Error: {message}
        </CardContent>
      </Card>
    </div>
  );
}

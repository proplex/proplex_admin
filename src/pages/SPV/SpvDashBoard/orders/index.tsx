

import CardConfig from '@/components/spv/CardConfig';
import Order from './Order';

const Index = () => {
  return (
    <div className=''>
      <header className='flex h-16 shrink-0 items-center justify-between p-4'>
        <div>
          <h1 className='text-xl font-semibold'>Orders</h1>
          <p className='text-sm text-muted-foreground'>
            Manage orders and their investments in this SPV
          </p>
        </div>
      </header>
      <div className='grid grid-cols-3 gap-4 p-4'>
        <CardConfig title='Total Orders' value='10' />
        <CardConfig title='Total Amount ' value=' $ 10' />
        <CardConfig title='Pending Orders' value='10' />
      </div>
      <div className='p-4'>
        <Order />
      </div>
    </div>
  );
};

export default Index;

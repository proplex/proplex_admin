

import { useParams } from 'react-router-dom';
import { Details } from './Details';
import { useOrder } from '@/hooks/order/useOrder';
import { useEffect } from 'react';

export default function Index() {
  const {id: orderId } = useParams();
  const { getOrder, order } = useOrder();

  useEffect(() => {
    if (orderId) {
      getOrder(orderId);
    }
  }, [orderId]);
  
  return (
    <div className='space-y-2'>
      <div className='flex justify-between items-center'>
        <h1 className='text-xl font-semibold text-gray-800 text-start'>
          Order Details
        </h1>
        {/* <Button variant={'outline'}>
          <Backpack className='mr-2' />
          Back to orders
        </Button> */}
      </div>
      <Details order={order} />
    </div>
  );
}

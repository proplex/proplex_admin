import React from 'react';
import { LucideIcon } from 'lucide-react';

interface OrderCardProps {
  icon: LucideIcon;
  count: number;
  title: string;
  description: string;
  progressColor: string;
  progressWidth: string;
}

const OrderCard: React.FC<OrderCardProps> = ({
  icon: Icon,
  count,
  title,
  description,
  progressColor,
  progressWidth,
}) => {
  return (
    <div className='bg-white rounded-lg shadow p-6'>
      <div className='flex items-center gap-3 mb-4'>
        <div className={`p-2 rounded-full ${progressColor}-100`}>
          <Icon />
        </div>
        <div>
          <h2 className='text-3xl font-bold'>{count}</h2>
          <p className='text-gray-600'>{title}</p>
        </div>
      </div>
      <div className='w-full bg-gray-200 rounded-full h-1.5'>
        <div className={`${progressColor}-500 h-1.5 rounded-full ${progressWidth}`}></div>
      </div>
      <p className='text-sm text-gray-500 mt-2'>{description}</p>
    </div>
  );
};

export default OrderCard;

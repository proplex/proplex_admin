import { ReactNode } from 'react';

interface OrderStatusCardProps {
  icon: ReactNode;
  count: number;
  label: string;
  progress: string;
  description: string;
  progressColor: string;
}

export const OrderStatusCard = ({
  icon,
  count,
  label,
  progress,
  description,
  progressColor,
}: OrderStatusCardProps) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-opacity-20">
          {icon}
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold">{count}</p>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      </div>
      <div className="mt-2">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-500">Progress</span>
          <span className="font-medium">{progress}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${progressColor}`}
            style={{ width: progress }}
          ></div>
        </div>
        <p className="mt-1 text-xs text-gray-400">{description}</p>
      </div>
    </div>
  );
};

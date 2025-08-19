import { formatCompactNumber } from "@/helpers/global";
import { ReactNode } from "react";

interface OrderStatusCardProps {
  icon: ReactNode;
  count: number;
  label: string;
  progress: string;
  description: string;
  progressColor: string;
}

const OrderStatusCard = ({
  icon,
  count = 0,
  label,
  progress = '0',
  description,
  progressColor,
}: OrderStatusCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-2">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full">{icon}</div>
        <div>
          <h2 className="text-3xl font-bold">{formatCompactNumber(count || 0)}</h2>
        </div>
      </div>
      <p className="text-gray-600">{label}</p>
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div
          className={`h-1.5 rounded-full ${progressColor}`}
          style={{ width: progress }}
        ></div>
      </div>
      <p className="text-sm text-gray-500 mt-2">{description}</p>
    </div>
  );
};

export default OrderStatusCard;

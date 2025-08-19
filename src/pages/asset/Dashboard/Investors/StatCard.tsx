import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  prefix?: string;
}

const StatCard = ({ title, value, prefix = "" }: StatCardProps) => {
  return (
    <Card className="overflow-hidden border-0 shadow-sm">
      <CardContent className="p-2">
        <h3 className="text-base font-normal text-gray-500">{title}</h3>
        <p className="text-4xl font-semibold mt-2">
          {prefix}
          {value}
        </p>
      </CardContent>
    </Card>
  );
};

export default StatCard;

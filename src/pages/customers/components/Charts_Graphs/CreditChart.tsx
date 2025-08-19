"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const getScoreColor = (score: number) => {
  if (score < 580) return "#dc2626";
  if (score < 670) return "#f97316";
  if (score < 740) return "#eab308";
  if (score < 800) return "#14b8a6";
  return "#22c55e";
};

interface CreditGraphProps {
  creditScore: number;
}

export function CreditChart({ creditScore }: CreditGraphProps) {
  const chartData = [
    {
      label: "Credit Score",
      total: 900,
      score: creditScore,
    },
  ];
  const scoreColor = getScoreColor(creditScore);

  return (
    <Card className="shadow-none border-0 w-8/12">
      <CardHeader>
        <CardTitle className="font-bold">Credit Overview</CardTitle>
        <CardDescription>Credit score and risk assessment</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            layout="vertical"
            data={chartData}
            barGap={4}
            margin={{ top: 0, right: 10, bottom: 0, left: 10 }}
          >
            <CartesianGrid
              horizontal={false}
              vertical={true}
              stroke="#d1d5db"
              strokeDasharray="4 4"
            />
            <XAxis
              type="number"
              domain={[300, 900]}
              ticks={[300, 450, 600, 750, 900]}
              tickLine={true}
              axisLine={{ stroke: "#d1d5db" }}
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />
            <YAxis type="category" dataKey="label" hide />
            <Bar
              dataKey="score"
              fill={scoreColor}
              barSize={30}
              radius={[5, 5, 5, 5]}
            />
            <Bar
              dataKey={() => 900}
              fill="#e5e7eb"
              barSize={30}
              radius={[5, 5, 5, 5]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 text-xs">
        <div className="flex justify-between w-full text-center text-muted-foreground">
          <div className="flex items-center gap-1">
            <span className="w-3 h-1.5 rounded bg-red-600" /> Poor (300–579)
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-1.5 rounded bg-orange-500" /> Fair (580–669)
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-1.5 rounded bg-yellow-500" /> Good (670–739)
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-1.5 rounded bg-teal-500" /> Very Good
            (740–799)
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-1.5 rounded bg-green-500" /> Excellent
            (800–900)
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

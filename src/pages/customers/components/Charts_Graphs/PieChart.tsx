"use client";

import { Pie, PieChart as RePieChart, Cell } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

interface PieChartProps {
  name: string;
  value: number;
  color: string;
}

export function PieChart({ data }: { data: PieChartProps[] }) {
  return (
    <Card className="flex flex-col border-0 shadow-none">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{}}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RePieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius="80%"
              label={false}
              stroke="#ffffff"  
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </RePieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

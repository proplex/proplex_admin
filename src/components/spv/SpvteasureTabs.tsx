"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import AllBalanceTab from "./Tabs/AllBalanceTab";

const tabItems = [
  { label: "All Balances", value: "all_balances" },
  { label: "Crypto Only", value: "crypto_only" },
];

export default function SpvteasureTabs() {
  return (
    <Tabs defaultValue="all_balances" className="w-full">
      <TabsList className="flex justify-center bg-white">
  {tabItems.map(({ label, value }) => (
    <TabsTrigger
      key={value}
      value={value}
      className={cn(
        "relative pb-2 text-sm font-medium transition-colors flex-1 shadow-none bg-transparent rounded-none",
        "hover:text-yellow-500 data-[state=active]:text-yellow-500 data-[state=active]:border-b-2 data-[state=active]:border-yellow-500 data-[state=active]:shadow-none"
      )}
    >
      {label}
      <span
        className={cn(
          "absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-full max-w-[calc(100%-0.5rem)] rounded-full",
          "bg-yellow-500 opacity-0 data-[state=active]:opacity-100"
        )}
      />
    </TabsTrigger>
  ))}
</TabsList>


      <TabsContent value="all_balances">
        <AllBalanceTab />
      </TabsContent>

      <TabsContent value="crypto_only">
        <div className="p-4">Crypto balances shown here.</div>
      </TabsContent>
    </Tabs>
  );
}

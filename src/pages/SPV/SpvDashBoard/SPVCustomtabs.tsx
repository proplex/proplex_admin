import React, { useMemo } from "react";
import clsx from "clsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Tab {
  id: string;
  title: string;
  component: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  handleTabChange?: (tabId: string) => void;
  disabledTabs?: string[];
}

const SPVCustomtabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  handleTabChange,
  disabledTabs = [],
}) => {
  const initialTabId = useMemo(() => {
    const found = tabs.find((tab) => tab.id === defaultTab);
    return found?.id || tabs[0]?.id || "";
  }, [tabs, defaultTab]);

  if (!tabs.length) {
    return <div className="text-gray-500 p-4">No tabs provided.</div>;
  }

  return (
    <Tabs defaultValue={initialTabId} onValueChange={handleTabChange}>
      {/* Tab headers */}
      <TabsList className="border-b border-gray-200 flex rounded shadow-none ">
        {tabs.map(({ id, title }) => (
          <TabsTrigger
            key={id}
            value={id}
            disabled={disabledTabs.includes(id)}
            className="flex-1 rounded"
          >
            {title}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Tab panels */}
      {tabs.map(({ id, component }) => (
        <TabsContent
          key={id}
          value={id}
          className="py-4 flex-1 overflow-y-auto"
        >
          {component}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default SPVCustomtabs;

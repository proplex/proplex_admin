import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import React from 'react'
import SpvOverviewTab from './Tabs/SpvOverviewTab'

const SpvTabs = () => {
  return (
    <>

      <Tabs defaultValue="spv_overview">
        <TabsList className="flex gap-2 items-center bg-blue-50 mb-5 p-1 rounded w-full">
          {[
            { title: "Overview", value: "spv_overview" },
            { title: "Financial Performance", value: "financial_performance" },
            { title: "Linked Assets", value: "linked_assets" },
            // { title: "Activity Log", value: "activity_log" },
          ].map((tab) => (
            <TabsTrigger
              className=" flex-1 items-center shadow-none  data-[state=active]:bg-white bg-transparent data-[state=active]:shadow-lg px-2 py-1 rounded text-sm gap-2 font-medium"
              value={tab.value}
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="spv_overview">
          <SpvOverviewTab />
        </TabsContent>
        <TabsContent value="financial_performance">
        </TabsContent>
        <TabsContent value="linked_assets">
        </TabsContent>
      </Tabs>

    </>
  )
}

export default SpvTabs

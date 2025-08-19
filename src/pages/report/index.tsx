import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProjectTab } from "./project/Project";
import { CustomerTab } from "./customer/customer";


import OwnerShip from "./ownership/index";
import WaitingList from "./waitinglist/index";
import Archived from "./archived/index";
const tabs = [
  { id: "property", label: "Property" },
  { id: "customer", label: "Customer" },
  { id: "owner", label: "Owner Ship" },
  { id: "order", label: "Order" },
  { id: "payment", label: "Payment" },
  { id: "waitinglist", label: "Waiting List" },
  { id: "archive", label: "Archive Properties" },
];

export default function Dashboard() {

 
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 m-4 ">
        Report
      </h1>

      <div className="w-full p-4 border-none">
        <div>
          <Tabs
            defaultValue="property"

          >
            <TabsList className="bg-gray-100 flex items-start justify-start h-auto w-full gap-4 rounded-lg pt-4 pb-4">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="text-black rounded-md transition-colors  hover:bg-gray-200 data-[state=active]:bg-[#9061F9] data-[state=active]:text-white"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="property">
              <ProjectTab />
            </TabsContent>
            <TabsContent value="customer">
              <CustomerTab />
            </TabsContent>
            <TabsContent value="waitinglist">
              <WaitingList />
            </TabsContent>
            <TabsContent value="archive">
              <Archived />
            </TabsContent>
            <TabsContent value="owner"> 
              <OwnerShip />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>

  );
}

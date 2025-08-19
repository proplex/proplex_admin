import React from "react";

import { Card } from "@/components/ui/card";
import CustomTabs from "@/components/ui/custom-tab";
import { Info, Settings } from "lucide-react";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import Proposal from "./Proposal";
import Configration from "./Configration";
import Active from "./Active";
import Past from "./Past";
import SPVCustomtabs from "../SPVCustomtabs";

const Index = () => {
  const navigate = useNavigate();
  const queryParams = queryString.parse(location.search);
  const tab: string = Array.isArray(queryParams["tab"])
    ? queryParams["tab"][0] || "active-proposals"
    : queryParams["tab"] || "active-proposals";

  const handleTabChange = (newTab: string) => {
    navigate(`?tab=${newTab}`, {
      replace: true,
    });
  };

  const tabs = [
    {
      id: "active-proposals",
      title: "Active Proposals",
      component: <Active />,
    },
    { id: "past-proposals", title: "Past Proposals", component: <Past /> },
  ];

  return (
    <div>
      <header className="flex h-16 shrink-0 items-center justify-between p-4">
        <div>
          <h1 className="text-xl font-semibold">Governance</h1>
          <p className="text-sm text-muted-foreground">
            Create proposals and vote based on your token holdings
          </p>
        </div>
        <Proposal />
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Governance Overview</h2>
            <Configration />
          </div>
          <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-1 text-sm font-medium">
                <span>Number of Participants</span>
                <Info className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <div className="mt-1">
                <div className="text-3xl font-bold">127</div>
                <div className="text-xs text-muted-foreground mt-1">
                  +12 since last month
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-sm font-medium">
                <span>Number of Proposals</span>
                <Info className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <div className="mt-1">
                <div className="text-3xl font-bold">42</div>
                <div className="text-xs text-muted-foreground mt-1">
                  3 active, 39 closed
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-sm font-medium">
                <span>Voting Type</span>
                <Info className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <div className="mt-1">
                <div className="text-xl font-bold">Token-weighted</div>
                <div className="text-xs text-blue-800 hover:underline cursor-pointer mt-1">
                  Configure governance settings
                </div>
              </div>
            </div>
          </div>
        </Card>
        <div className="border p-4 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-4">Proposals</h2>
          <SPVCustomtabs
            defaultTab={tab}
            tabs={tabs}
            handleTabChange={handleTabChange}
            aria-label="Governance Proposals"
          />
        </div>
      </div>
    </div>
  );
};
export default Index;

import { Button } from "@/components/ui/button";
import CustomTabs from "@/components/ui/custom-tab";
import { Play, FileText, BarChart2, Calendar, Settings } from "lucide-react";
import React, { useState } from "react";
import Overview from "./overview";
import AttachedAssets from "./AttachedAssets";
import Investors from "./Investors";
import History from "./History";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSubTrigger,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuSubContent,
  DropdownMenuSub,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ConfigurationDialog from "./dialog/ConfigurationDialog";

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
  const [selectedFrequency, setSelectedFrequency] = useState("quarterly");
  const [open, setOpen] = useState(false);
  const tabs = [
    {
      id: "overview",
      title: "Overview",
      component: <Overview />,
    },
    {
      id: "attached-assets",
      title: "Attached Assets",
      component: <AttachedAssets />,
    },
    {
      id: "investors",
      title: "Investors",
      component: <Investors />,
    },
    {
      id: "history",
      title: "Disturbution History",
      component: <History />,
    },
  ];
  return (
    <div className="p-4">
      <div className="flex justify-between items-center ">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold"> SPV title</h1>
          <p className="text-sm text-gray-500">SPV ID: 1234567890</p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <span
            className="bg-green-400/30 text-green-500 px-2 py-1 rounded-md
                "
          >
            {" "}
            $125,33{" "}
          </span>
          <Button className="bg-green-500 hover:bg-green-600 text-white">
            <Play />
            Distribute Now
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-white border border-gray-100 hover:bg-gray-100 text-black">
                <Settings />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-72" align="end">
              <div className="px-2 py-2 font-medium text-sm text-gray-700 border-b">
                Distribution Settings
              </div>

              <DropdownMenuItem
                className="flex items-center gap-3 py-2.5 cursor-pointer"
                onClick={() => setOpen(true)}
              >
                <BarChart2 className="w-5 h-5 text-gray-500" />
                <span>Configure Distribution</span>
              </DropdownMenuItem>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex items-center gap-3 py-2.5">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span>Distribution Schedule</span>
                </DropdownMenuSubTrigger>

                <DropdownMenuSubContent className="w-56">
                  <DropdownMenuRadioGroup
                    value={selectedFrequency}
                    onValueChange={setSelectedFrequency}
                  >
                    <DropdownMenuRadioItem value="monthly">
                      Monthly
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="quarterly">
                      Quarterly
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="annually">
                      Annually
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="manual">
                      Manual Only
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="advanced">
                      Advanced Schedule Settings
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuItem className="flex items-center gap-3 py-2.5 cursor-pointer">
                <FileText className="w-5 h-5 text-gray-500" />
                <span>Distribution History</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="pt-5">
        <CustomTabs
          defaultTab={tab}
          tabs={tabs}
          handleTabChange={handleTabChange}
        />
      </div>
      <ConfigurationDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Index;

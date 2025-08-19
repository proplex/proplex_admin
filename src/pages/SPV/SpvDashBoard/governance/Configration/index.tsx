import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import BasicSettings from "./basic-setting";
import AdvancedSettings from "./advanced-setting";
import CustomTabs from "@/components/ui/custom-tab";
import { Settings } from "lucide-react";
import Summary from "./summary";

export default function GovernanceConfigModal() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  // Form state
  const [formState, setFormState] = useState({
    // Voting Mechanism
    votingType: "token-weighted",

    // Core Parameters
    minimumTokenThreshold: 5,
    quorumRequirement: 51,
    votingPeriodDays: 7,
    votingPeriodHours: 0,
    endDate: new Date(),
    endTime: "6:00 PM",

    // Basic Rights
    votingRights: true,
    proposalCreation: true,
    adminVeto: true,

    // Advanced Settings
    voteDelegation: false,
    timelock: false,
    quadraticVoting: false,
    votableMatters: "major-only",
  });

  const handleSave = () => {
    setOpen(false);
    // Here you would typically send this data to your backend
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const updateFormState = (key: string, value: any) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const tabs = [
    {
      id: "basic",
      title: "Basic Settings",
      component: (
        <BasicSettings
          formState={formState}
          updateFormState={updateFormState}
        />
      ),
    },
    {
      id: "advanced",
      title: "Advanced Settings",
      component: (
        <AdvancedSettings
          formState={formState}
          updateFormState={updateFormState}
        />
      ),
    },
    {
      id: "summary",
      title: "Summary",
      component: <Summary formState={formState} />,
    },
  ];

  return (
    <>
      <Button
        className="border"
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
      >
        <Settings className="h-4 w-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[90vw] max-w-[800px] max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Governance Rights Configuration</DialogTitle>
            <DialogDescription>
              Configure governance rights and voting mechanisms for token
              holders
            </DialogDescription>
          </DialogHeader>
          <CustomTabs
            defaultTab={activeTab}
            tabs={tabs}
            handleTabChange={handleTabChange}
            aria-label="Governance Proposals"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Governance Settings</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

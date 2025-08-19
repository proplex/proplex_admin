import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import CustomTabs from "@/components/ui/custom-tab";
import Distribution from "./Setting";
import Investor from "./Investor";
import Overview from "./Overview";
interface ConfigurationDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
const ConfigurationDialog = ({ open, setOpen }: ConfigurationDialogProps) => {
  const tabs = [
    {
      id: "1",
      title: "Settings",
      component: <Distribution />,
    },
    {
      id: "2",
      title: "Investor",
      component: <Investor />,
    },
    {
      id: "3",
      title: "Overview",
      component: (
        <Overview
          distributionName="Test Distribution"
          totalAmount={1000}
          distributionDate="2021-01-01"
          selectedInvestors={[1, 2]}
          investors={[1, 2, 3]}
        />
      ),
    },
  ];
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold">Configure Distribution</h1>
              <p className="text-sm text-gray-500">
                Configure the distribution of your data
              </p>
            </div>
          </DialogHeader>
          <DialogDescription className="text-black ">
            <form>
              <CustomTabs
                defaultTab={tabs[0].id}
                tabs={tabs}
                aria-label="Location and places tabs"
              />
            </form>
            <div className="flex justify-end mt-3 gap-2">
              <Button variant="outline"> Cancel </Button>
              <Button type="submit">
                <Save /> Save Configuration
              </Button>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConfigurationDialog;

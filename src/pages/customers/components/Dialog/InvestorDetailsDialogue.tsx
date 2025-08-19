// components/Dialog/InvestorDetailsDialog.tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface InvestorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const InvestorDetailsDialogue: React.FC<InvestorDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm max-h-[90vh] overflow-hidden rounded-lg">
        <DialogHeader>
          <DialogTitle>View Investor Details?</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Do you want to see the investor details?
        </p>
        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            No
          </Button>
          <Button onClick={onConfirm}>Yes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvestorDetailsDialogue;

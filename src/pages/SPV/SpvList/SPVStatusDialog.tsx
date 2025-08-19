import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SPVStatusDialogProps {
  isOpen: boolean;
  spv: any;
  onClose: () => void;
  onConfirm: () => void;
  status: string;
}

const SPVStatusDialog: React.FC<SPVStatusDialogProps> = ({
  isOpen,
  spv,
  onClose,
  onConfirm,
  status,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {status === "loading" && (
          <>
            <DialogHeader>
              <Loader2 className="w-6 h-6 mx-auto text-gray-500 animate-spin" />
              <DialogTitle className="text-lg font-bold">
                Creating SPV on XDC blockchain network...
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                Please wait while we create the SPV on the XDC blockchain
                network. This may take a few moments.
              </DialogDescription>
            </DialogHeader>
          </>
        )}
        {status === "success" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">
                SPV Created Successfully
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                The SPV has been created successfully on the XDC
                blockchain network.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={onClose}>Close</Button>
            </DialogFooter>
          </>
        )}

        {status === "error" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-red-600">
                Error Creating SPV
              </DialogTitle>
              <DialogDescription className="text-sm text-red-500">
                There was an error creating the SPV on the XDC
                blockchain network. Please try again later.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={onClose}>Close</Button>
            </DialogFooter>
          </>
        )}  

        {status === "idle" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">
                Confirm SPV Creation
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                Are you sure you want to create the SPV on the XDC
                blockchain network?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={onConfirm}>Confirm</Button>
            </DialogFooter>
          </>
        )}
      
      </DialogContent>
    </Dialog>
  );
};

export default SPVStatusDialog;

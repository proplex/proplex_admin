// Extracted UpdateAssetStatusDialog component
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { Status } from "@/hooks/asset/useAssetApi";

interface UpdateAssetStatusDialogProps {
  asset: any;
  setAsset: (asset: any) => void;
  updateStatus: () => Promise<void>;
  status: Status;
  setStatusUpdate: (status: Status) => void;
}

const UpdateAssetStatusDialog: React.FC<UpdateAssetStatusDialogProps> = ({
  asset,
  setAsset,
  updateStatus,
  status,
  setStatusUpdate
}) => {
  const isStatusOpen = !!asset;

  const handleOnClose = () => {
    setAsset(null);
    setStatusUpdate("idle");
  };

  // Handle mock status update
  useEffect(() => {
    if (status === 'loading') {
      const timer = setTimeout(() => {
        setStatusUpdate('success');
        toast.success(`Asset status updated successfully`);
        // Close the dialog after 1.5 seconds
        setTimeout(() => {
          handleOnClose();
        }, 1500);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [status, setStatusUpdate]);

  return (
    <Dialog open={isStatusOpen} onOpenChange={handleOnClose}>
      <DialogContent>
        {status === 'loading' ? (
          <DialogHeader>
            <div className="flex justify-center">
              <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
            </div>
            <DialogTitle className="text-lg font-bold text-center mt-4">
              Updating Asset Status...
            </DialogTitle>
            <DialogDescription className="text-sm text-center text-gray-500">
              Please wait while we update the asset status.
            </DialogDescription>
          </DialogHeader>
        ) : status === 'success' ? (
          <DialogHeader>
            <div className="flex justify-center">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <DialogTitle className="text-lg font-bold text-center mt-4">
              Status Updated!
            </DialogTitle>
            <DialogDescription className="text-sm text-center text-gray-500">
              The asset status has been updated successfully.
            </DialogDescription>
          </DialogHeader>
        ) : (
          <>
            {status === 'error' ? (
              <>
                <DialogHeader>
                  <div className="flex justify-center">
                    <CheckCircle className="h-12 w-12 text-red-500" />
                  </div>
                  <DialogTitle className="text-lg font-bold text-center text-red-600">
                    Error Updating Status
                  </DialogTitle>
                  <DialogDescription className="text-sm text-center text-red-500">
                    There was an error updating the asset status. Please try again.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="justify-center">
                  <Button onClick={handleOnClose}>Close</Button>
                </DialogFooter>
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle className="text-lg font-bold">
                    Update Asset Status
                  </DialogTitle>
                  <DialogDescription>
                    Are you sure you want to change this asset's status to{' '}
                    <span className="font-semibold">
                      {asset?.status === 'active' ? 'Inactive' : 'Active'}
                    </span>?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4">
                  <Button type="button" variant="outline" onClick={handleOnClose}>
                    Cancel
                  </Button>
                  <Button 
                    type="button" 
                    onClick={updateStatus}
                    className="ml-2"
                  >
                    Confirm
                  </Button>
                </DialogFooter>
              </>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAssetStatusDialog;

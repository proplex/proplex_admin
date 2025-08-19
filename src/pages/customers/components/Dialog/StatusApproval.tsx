import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
interface StatusApprovalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerName: string;
  onConfirm: () => void;
}

const StatusApproval = ({ open, onOpenChange, customerName, onConfirm }: StatusApprovalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent> 
      <DialogHeader>
        <DialogTitle>Confirm Customer Approval</DialogTitle>
        <DialogDescription>
          You are about to approve <strong>{customerName}</strong>...
        </DialogDescription>
      </DialogHeader>
  
      {/* Modal body */}
      <ul className="list-disc pl-5 space-y-1 text-gray-700 my-4">
        <li>All customer information has been reviewed</li>
        <li>The customer meets the investment criteria</li>
        <li>The customer is eligible to invest on the platform</li>
      </ul>
  
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button onClick={onConfirm}>
          Confirm Approval
        </Button>
      </div>
    </DialogContent>
  </Dialog>
  
  )
}

export default StatusApproval

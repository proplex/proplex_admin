import { Button } from "@/components/ui/button";
import {
  Bell,
  Calendar,
  Check,
  CheckCircle,
  CircleX,
  Download,
  InfoIcon,
  MoveLeft,
  X,
} from "lucide-react";
import React, { useState } from "react";
import StatusApproval from "./Dialog/StatusApproval";
import api from "@/lib/httpClient";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

type AdminApprovalProps={
  AdminApprovalStatus : {
    adminApprovalStatus: string;
    _id : string;
  }
  userId : string
  refetch: () => void; // 👈 Add this


  
}
const AdminApproval = ({ AdminApprovalStatus, userId, refetch }: AdminApprovalProps) => {
  const [open, setOpen] = useState(false);
 

  // const [loading , setLoading] = useState(false)

  // Dummy customer name for now, replace with actual data
  const customerName = "";
  const handleConfirm = async () => {
    try {
      const response = await api.put(`/kyc/admin-approval/${userId}`, {
        status: "APPROVED",
      });
      toast.success("User approved successfully");
      refetch();
      console.log(response.data);
    } catch (error) {
      toast.error("Error updating approval status");
      console.error(error);
    } finally {
      setOpen(false);
    }
  };
  const handleReject = async () =>{
    try {
      const response = await api.put(`/kyc/admin-approval/${userId}`, {
        status: "PENDING",
      });
      toast.success("User approved successfully");
      refetch();
      console.log(response.data);
    } catch (error) {
      toast.error("Error updating approval status");
      console.error(error);
    } finally {
      setOpen(false);
    }
  }
  

  return (
    <div className={AdminApprovalStatus.adminApprovalStatus === "Pending" ? `flex border p-5 border-blue-300 bg-blue-50 rounded-lg justify-between items-center mb-6` : `flex border p-5 border-green-300 bg-green-50 rounded-lg justify-between items-center mb-6`}>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className={ AdminApprovalStatus.adminApprovalStatus === "Pending" ?`text-blue-700 hover:text-black bg-blue-100 rounded-full` : "text-green-500 bg-green-100 "}
        >
          {AdminApprovalStatus.adminApprovalStatus === "Pending" ? <InfoIcon className="h-9 w-9 " /> : <Check />}
        </Button>

        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold text-blue-700">
            {AdminApprovalStatus.adminApprovalStatus === "Pending" ? "Admnin Approval Required" : "Customer Approved"}
          </h1>
          <span className="text-blue-600 text-sm">
            Please Review this customer's Information and decide to approve or
            reject
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button className="bg-red-50 hover:bg-red-300 text-red-500 border border-red-200" onClick={handleReject} >
          <CircleX size={20} />
          <span> Reject</span>
        </Button>
        {AdminApprovalStatus?.adminApprovalStatus == "Pending"?
         (

        <Button
        className="bg-green-600 hover:bg-green-700 text-white"
        onClick={() => setOpen(true)}
      >
        <CheckCircle />
        <span> Appprove</span>
      </Button>
         ): null  
      }
      </div>
      <StatusApproval
        open={open}
        onOpenChange={setOpen}
        customerName={customerName}
        onConfirm={handleConfirm}
      />
    </div>
    
  );
};

export default AdminApproval;

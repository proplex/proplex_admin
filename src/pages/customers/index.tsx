// pages/CustomerDetailPage.tsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import toast from "react-hot-toast";
import { Copy, ArrowRight, Send } from "lucide-react";

import TableComponent from "@/components/TableComponent";
import Pagination from "@/layout/Pagination";
import { handleCopy } from "@/helpers/global";
import { Button } from "@/components/ui/button";

import useInvestors from "@/hooks/useInvestors";
import useTrackCustomerData from "@/hooks/customer/useTrackCustomerData";
import api from "@/lib/httpClient";
import { useState } from "react";
import InvestorDetailsDialogue from "./components/Dialog/InvestorDetailsDialogue";

const CustomerDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = queryString.parse(location.search);
  const page = Number(queryParams.page) || 1;
  const limit = Number(queryParams.limit) || 10;

  const { getInvestors, pagination, investors } = useInvestors();
  const { loading, error, customerData } = useTrackCustomerData();
  const [showDialog, setShowDialog] = useState(false);
  const [ isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedInvestorId, setSelectedInvestorId] = useState<string | null>(
    null
  );

  const openDialog = (investorId: string) => {
    setSelectedInvestorId(investorId);
    setShowDialog(true);
  };

  const handleDialogConfirm = () => {
    if (selectedInvestorId) {
      navigate(`/customer-profile/${selectedInvestorId}`);
      setShowDialog(false);
    }
  };

  useEffect(() => {
    getInvestors({ page, limit });
  }, [page, limit]);

  const onPageChange = (page: number) => {
    navigate(`/customers?page=${page}&limit=${limit}`);
  };

  const onPageSizeChange = (pageSize: number) => {
    navigate(`/customers?page=1&limit=${pageSize}`);
  };
  const mailSender = "/kyc/trigger-reminder-emails";
  const handleSendEmailReminder = async (investorId: string) => {
    try {
      await api.post(`${mailSender}/?userId=${investorId}`);
      toast.success("Email reminder sent successfully");
    } catch (error) {
      console.error("Error sending email reminder:", error);
      toast.error("Failed to send email reminder");
    }
  };

  const handleSendMobileReminder = async (investorId: string) => {
    try {
      await api.post(`${mailSender}/?userId=${investorId}`);
      toast.success("Mobile verification reminder sent successfully");
    } catch (error) {
      console.error("Error sending mobile reminder:", error);
      toast.error("Failed to send mobile reminder");
    }
  };

  const handleSendDocumentReminder = async (investorId: string) => {
    try {
      await api.post(`${mailSender}/?userId=${investorId}`);
      toast.success("Kyc verification reminder sent successfully");
    } catch (error) {
      console.error("Error sending Kyc reminder:", error);
      toast.error("Failed to send Kyc reminder");
    }
  };

  const handleForeginInvestors = (investorId: string) => {
    navigate(`/customer-profile-fo/${investorId}`);
  };

  const columns = [
    {
      header: "Investor ID",
      accessorKey: "_id",
      cell: (info: any) => {
        const id = info.getValue();
        return (
          <div className="flex gap-2">
            <Copy
              onClick={() => handleCopy(id)}
              size={16}
              className="text-gray-500 cursor-pointer"
            />
            <span className="text-sm truncate">{id}</span>
          </div>
        );
      },
    },
    {
      header: "Investor Name",
      accessorKey: "firstName",
      cell: (info: any) => {
        const row = info.row.original;
        return `${row.firstName || ""} ${row.lastName || ""}`.trim() || "N/A";
      },
    },
    {
      header: "Email",
      accessorKey: "email",
      cell: (info: any) => info.getValue() || "N/A",
    },
    {
      header: "Mobile Number",
      accessorKey: "mobileNumber",
      cell: (info: any) => info.getValue() || "N/A",
    },
    {
      header: "Kyc  Completed",
      accessorKey: "kycCompleted",
      cell: (info: any) => (info.getValue() ? "Completed" : "Null"),
    },

    {
      header: "Admin Approval",
      accessorKey: "adminApprovalStatus.adminApprovalStatus",
      cell: (info: any) => info.getValue() || "N/A",
    },
    {
      header: "Actions",
      accessorKey: "_id",
      cell: (info: any) => {
        const row = info.row.original;
        const id = info.getValue();

        if (row.isEmailVerified && row.isMobileVerified && row.kycCompleted && row.country === "India") {
          return (
            <Button
              variant="outline"
              size="sm"
              onClick={() => openDialog(id)}
              className="p-2 flex justify-between items-center w-35 gap-1"
            >
              View Details
              <ArrowRight className="h-5 w-5" />
            </Button>
          );
        }
          if (row.isEmailVerified && row.isMobileVerified && row.kycCompleted && row.country !== "India") {
          return (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleForeginInvestors(id)}
              className="p-2 flex justify-between items-center w-35 gap-1"
            >
              View Details
              <ArrowRight className="h-5 w-5" />
            </Button>
          );
        }

        if (!row.isEmailVerified) {
          return (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSendEmailReminder(id)}
              className="flex justify-between items-center gap-1 w-35"
            >
              {" "}
              Email Reminder
              <Send className="h-4 w-4" />
            </Button>
          );
        }

        if (!row.isMobileVerified) {
          return (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSendMobileReminder(id)}
              className="flex justify-between items-center gap-1 w-35"
            >
              Mobile Reminder
              <Send className="h-4 w-4" />
            </Button>
          );
        }

        if (!row.kycCompleted) {
          return (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSendDocumentReminder(id)}
              className="flex justify-between items-center gap-1 w-35"
            >
              Kyc Reminder
              <Send className="h-4 w-4" />
            </Button>
          );
        }

        return null;
      },
    },
  ];

  if (loading)
    return <p className="text-center mt-10">Loading customer data...</p>;
  if (error)
    return (
      <p className="text-red-500 mt-10 text-center">Failed to load data</p>
    );

  return (
    <div className="p-4">
      <TableComponent columns={columns} data={investors} />
      <br />
      <Pagination
        currentPage={pagination.currentPage}
        limit={pagination.limit}
        totalPages={pagination.totalPages}
        hasNextPage={pagination.hasNext}
        hasPreviousPage={pagination.hasPrevious}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
      <InvestorDetailsDialogue
        open={showDialog}
        onOpenChange={setShowDialog}
        onConfirm={handleDialogConfirm}
      />
    </div>
  );
};

export default CustomerDetailPage;

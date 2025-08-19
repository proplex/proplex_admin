// pages/CustomerDetailPage.tsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/Header";
import AdminApproval from "../components/AdminApproval";
import CreditScoreConfig from "../components/creditScoreConfig";
import BasicDetailsTab from "../components/Tabs/BasicDetailsTab";
import FinancialReportTab from "../components/Tabs/FinancialReportTab";
import DocumentsTab from "../components/Tabs/DocumentsTab";
import useTrackCustomerData from "@/hooks/customer/useTrackCustomerData";

import {
  Check,
  CircleCheckBig,
  DollarSign,
  ShieldAlert,
  ThumbsUp,
} from "lucide-react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@radix-ui/react-tabs";

const CustomerDetailPage = () => {
  const { id: userId } = useParams();

  const { loading, error, customerData, fetchCustomerData } = useTrackCustomerData();

  useEffect(() => {
    if (userId) {
      fetchCustomerData(userId);
    }
  }, [userId]);

  if (loading) return <p className="text-center mt-10">Loading customer data...</p>;
  if (error) return <p className="text-red-500 mt-10 text-center">Failed to load data</p>;

  if (!customerData) return null;
  const { Current_Application, SCORE, CAIS_Account } = customerData.neokredFinancialData.data;
  const userDetails = Current_Application?.Current_Application_Details;
  const id = customerData?._id
  console.log(id,"uiu")


  return (
    <div className="p-6">
      <Header userDetails={userDetails?.Current_Applicant_Details} customer={id} />
      <AdminApproval
        AdminApprovalStatus={customerData?.adminApprovalStatus}
        userId={userId as string}
        refetch={() => fetchCustomerData(userId as string)} // 👈 Here
      />

      <div className="grid grid-cols-3 gap-4 mt-6">
        <CreditScoreConfig
          title="Credit Score"
          value={SCORE?.FCIREXScore || "N/A"}
          Icon={ThumbsUp}
          color="amber"
        />
        {/* <CreditScoreConfig
          title="Verification"
          value="Verified"
          Icon={CircleCheckBig}
          color="green"
        /> */}
        <CreditScoreConfig
          title="Out Standing"
          value={CAIS_Account?.CAIS_Summary?.Total_Outstanding_Balance?.Outstanding_Balance_All || "N/A"}
          Icon={DollarSign}
          color="blue"
        />
        <CreditScoreConfig
          title="Admin Approval"
          value={customerData?.adminApprovalStatus?.adminApprovalStatus || "N/A"}
          Icon={
            customerData?.adminApprovalStatus?.adminApprovalStatus?.toLowerCase() === "pending"
              ? ShieldAlert
              : Check
          }
          color={
            customerData?.adminApprovalStatus?.adminApprovalStatus?.toLowerCase() === "pending"
              ? "red"
              : "green"
          }
        />

      </div>

      <Tabs defaultValue="basic_details" className="mt-8">
        <TabsList className="flex gap-2 items-center bg-blue-50 mb-5 p-1 rounded w-[40%]">
          {[
            { title: "Basic Details", value: "basic_details" },
            { title: "Financial Report", value: "financial_report" },
            { title: "Documents", value: "documents" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              className="flex-1 items-center shadow-none data-[state=active]:bg-white bg-transparent data-[state=active]:shadow-lg px-2 py-1 rounded text-sm gap-2 font-medium"
              value={tab.value}
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="basic_details">
          <BasicDetailsTab
            userDetails={userDetails}
            CAIS_Account={CAIS_Account?.CAIS_Account_DETAILS}
          />
        </TabsContent>

        <TabsContent value="financial_report">
          <FinancialReportTab
            creditScore={SCORE?.FCIREXScore}
            financialDetails={CAIS_Account}
          />
        </TabsContent>

        <TabsContent value="documents">
          <DocumentsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerDetailPage;

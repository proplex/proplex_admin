import { Building, Calendar, DollarSign, Link, Percent } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import queryString from "query-string";
import CustomTabs from "@/components/ui/custom-tab";
import { useNavigate, useParams } from "react-router-dom";
import Overview from "./Overview";
import Documents from "./Documents";
import { formatDate } from "date-fns";
import { ORDER_TRACKING_STATUS } from "@/constants/global";
import { formatCompactNumber } from "@/helpers/global";

export function Details({ order }: { order: any }) {
  const {
    totalOrderValue,
    createdAt,
    tokensBooked,
    bookingEOIAmount,
    ownershipPercentage,
    currentStatus,
    asset,
    company,
    currency,
  } = order || {};
  const { id = null } = useParams();
  const queryParams = queryString.parse(location.search);
  const navigate = useNavigate();

  const currentStatusOption = ORDER_TRACKING_STATUS.find(
    (status) => status.value === currentStatus
  );
  const currentStatusLabel = currentStatusOption?.label || "Unknown";

  const formatedDateAndTime = formatDate(
    createdAt ? new Date(createdAt) : new Date(),
    "yyyy-MM-dd HH:mm"
  );

  const tabs = [
    {
      id: "overview",
      title: "Overview",
      component: <Overview order={order} />,
    },
    // {
    //   id: "documents",
    //   title: "Documents",
    //   component: <Documents order={order} />,
    // },
    {
      id: "transaction-history",
      title: "Transaction History",
      component: <div>Transaction History Content</div>,
    },
  ];

  const tab: string = Array.isArray(queryParams["tab"])
    ? queryParams["tab"][0] || "overview"
    : queryParams["tab"] || "overview";

  const handleTabChange = (tabId: string) => {
    navigate(`/order-details/${id}?tab=${tabId}`, { replace: true });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Order Amount Card */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 mb-1">Order amount</p>
              <h3 className="text-2xl font-bold">
                {formatCompactNumber(totalOrderValue)}
              </h3>
            </div>
            <div className="bg-blue-100 w-10 h-10 flex items-center justify-center rounded-full text-2xl text-amber-600">
              {currency === "usd" ? "$" : "₹"}
            </div>
          </CardContent>
        </Card>

        {/* Date & Time Card */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 mb-1">Date & Time</p>
              <h3 className="text-lg font-medium">{formatedDateAndTime}</h3>
            </div>
            <div className="bg-amber-100 p-2 rounded-full">
              <Calendar className="h-5 w-5 text-amber-500" />
            </div>
          </CardContent>
        </Card>

        {/* Booking Amount Card */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 mb-1">Booking Amount</p>
              <h3 className="text-2xl font-bold">
                {bookingEOIAmount || totalOrderValue}
              </h3>
            </div>
            <div className="bg-blue-100 w-10 h-10 flex items-center justify-center rounded-full text-2xl text-amber-600">
              {currency === "usd" ? "$" : "₹"}
            </div>
          </CardContent>
        </Card>

        {/* Order Status Card */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <p className="text-sm text-gray-500 mb-3">Order Status</p>
            <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
              {currentStatusLabel || "Unknown"}
            </span>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            {/* Order Value */}
            <div className="flex items-center justify-between p-5 border-b">
              <div className="flex items-center gap-3">
                <span className="text-gray-600">
                  <span className="text-2xl font-light mr-2 text-gray-400">
                    {currency === "usd" ? "$" : "₹"}
                  </span>{" "}
                  Order Value
                </span>
              </div>
              <span className="font-semibold">
                {currency === "usd" ? "$" : "₹"} {totalOrderValue}
              </span>
            </div>

            {/* Property Name */}
            <div className="flex items-center justify-between p-5 border-b">
              <div className="flex items-center gap-3">
                <Building className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">Property Name</span>
              </div>
              <span className="font-semibold">{asset?.name}</span>
            </div>

            {/* Ownership Percentage */}
            <div className="flex items-center justify-between p-5 border-b">
              <div className="flex items-center gap-3">
                <Percent className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">Ownership Percentage</span>
              </div>
              <span className="font-semibold">{ownershipPercentage}</span>
            </div>

            {/* No of Tokens */}
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3">
                <Link className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">No of Tokens</span>
              </div>
              <span className="font-semibold">{tokensBooked}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <CustomTabs
        defaultTab={tab}
        tabs={tabs}
        handleTabChange={handleTabChange}
        aria-label="Order Details"
      />
    </div>
  );
}

import TableComponent from "@/components/TableComponent";
import { ORDER_TRACKING_STATUS, PAYMENT_TYPE } from "@/constants/global";
import { useOrder } from "@/hooks/order/useOrder";
import { useDebounce } from "@/hooks/useDebounce";
import Pagination from "@/layout/Pagination";
import {
  CheckCircle,
  Clock,
  Copy,
  Eye,
  ShoppingCart,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import OrderStatusCard from "./OrderStatusCard";
import SearchFilter from "./SearchFilter";
import { formatCompactNumber, handleCopy } from "@/helpers/global";

const Index = () => {
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const page = Number(queryParams.page) || 1;
  const limit = Number(queryParams.limit) || 10;
  const navigate = useNavigate();
  const {
    orders,
    getOrders,
    pagination,
    getOrdersStatusCounts,
    ordersStatusCounts,
  } = useOrder();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const columns = [
    {
      header: "Order Id",
      accessorKey: "_id",
      cell: (info: any) => {
        const id = info.getValue();
        return (
          <div className="flex gap-2">
            <Copy
              onClick={() => handleCopy(id)}
              size={4}
              className="text-gray-500 cursor-pointer min-h-4 min-w-4"
            />
            <span className="text-sm truncate">{id}</span>
          </div>
        );
      },
    },
    {
      header: "Investor",
      accessorKey: "investorId",
      cell: ({
        getValue,
      }: {
        getValue: () => {
          fullName: string;
          email: string;
        };
      }) => {
        const investor = getValue();
        return (
          <div className="flex flex-col ">
            <span className="truncate">{investor?.fullName}</span>
            <span className="text-gray-500 text-sm truncate">
              {investor?.email}
            </span>
          </div>
        );
      },
    },
    {
      header: "Tokens",
      accessorKey: "tokensBooked",
    },
    {
      header: "Order Value",
      accessorKey: "totalOrderValue",
      cell: ({ row }: { row: any }) => {
        const { currency, totalOrderValue } = row.original;
        const currencySymbol = currency?.toLowerCase() === "usd" ? "$" : "₹";
        return (
          <div className="flex items-center gap-1">
            <span className="text-sm font-light">{currencySymbol}</span>
            <span className="font-semibold">
              {formatCompactNumber(totalOrderValue)}
            </span>
          </div>
        );
      },
    },
    
    {
      header: "Payment Type",
      accessorKey: "paymentType",
      cell: ({ getValue }: { getValue: () => string }) => {
        const paymentType = getValue();
        const value = PAYMENT_TYPE.find(
          (payment) => payment.value === paymentType
        )?.label;
        return value || paymentType;
      },
    },
    {
      header: "Current Status",
      accessorKey: "currentStatus",
      cell: ({ getValue }: { getValue: () => string }) => {
        const status = getValue();
        const statusLabel = ORDER_TRACKING_STATUS.find(
          (statusObj) => statusObj.value === status
        )?.label;
        return statusLabel || status;
      },
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
      cell: ({ getValue }: { getValue: () => string }) => {
        const date = new Date(getValue());
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
    },
    {
      header: "View",
      accessorKey: "action",
      cell: ({ row }: { row: any }) => {
        const order = row.original;
        return (
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer"
            type="button"
            onClick={() => {
              navigate(`/order-details/${order._id}`);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
        );
      },
    },
  ];

  const onPageSizeChange = (pageSize: number) => {
    navigate(`/orders?search=${search}&page=1&limit=${pageSize}`);
  };

  const onPageChange = (page: number) => {
    navigate(`/orders?page=${page}&limit=${limit}`);
  };

  useEffect(() => {
    getOrders({
      page,
      limit,
      search: debouncedSearch,
      status: filter,
    });
  }, [page, limit, debouncedSearch, filter]);

  useEffect(() => {
    getOrdersStatusCounts();
  }, []);

  const {
    totalOrders,
    completedOrders,
    pendingOrders,
    refundedOrders,
    failedOrders,
    cancelledOrders,
  } = ordersStatusCounts[0] || {};

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <OrderStatusCard
          icon={
            <div className="bg-blue-100 p-2 rounded-full">
              <ShoppingCart className="h-5 w-5 text-blue-500" />
            </div>
          }
          count={totalOrders}
          label="All Orders"
          progress="100%"
          description="Total orders in the system"
          progressColor="bg-blue-500"
        />
        <OrderStatusCard
          icon={
            <div className="bg-green-100 p-2 rounded-full">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          }
          count={completedOrders}
          label="Approved Orders"
          progress={
            totalOrders && totalOrders > 0
              ? `${((completedOrders / totalOrders) * 100).toFixed(2)}%`
              : "0%"
          }
          description="Completed and approved orders"
          progressColor="bg-green-500"
        />
        <OrderStatusCard
          icon={
            <div className="bg-amber-100 p-2 rounded-full">
              <Clock className="h-5 w-5 text-amber-500" />
            </div>
          }
          count={pendingOrders}
          label="Pending Approvals"
          progress={
            totalOrders && totalOrders > 0
              ? `${((pendingOrders / totalOrders) * 100).toFixed(2)}%`
              : "0%"
          }
          description="Orders awaiting approval"
          progressColor="bg-amber-500"
        />
        <OrderStatusCard
          icon={
            <div className="bg-red-100 p-2 rounded-full">
              <XCircle className="h-5 w-5 " />
            </div>
          }
          count={cancelledOrders}
          label="Cancelled Orders"
          progress={
            totalOrders && totalOrders > 0
              ? `${((cancelledOrders / totalOrders) * 100).toFixed(2)}%`
              : "0%"
          }
          description="Orders that were cancelled"
          progressColor="bg-red-500"
        />
        <OrderStatusCard
          icon={
            <div className="bg-purple-100 p-2 rounded-full">
              <CheckCircle className="h-5 w-5 text-purple-500" />
            </div>
          }
          count={refundedOrders}
          label="Refunded Orders"
          progress={
            totalOrders && totalOrders > 0
              ? `${((refundedOrders / totalOrders) * 100).toFixed(2)}%`
              : "0%"
          }
          description="Orders that were refunded"
          progressColor="bg-purple-500"
        />
        <OrderStatusCard
          icon={
            <div className="bg-gray-100 p-2 rounded-full">
              <XCircle className="h-5 w-5 text-gray-500" />
            </div>
          }
          count={failedOrders}
          label="Failed Orders"
          progress={
            totalOrders && totalOrders > 0
              ? `${((failedOrders / totalOrders) * 100).toFixed(2)}%`
              : "0%"
          }
          description="Orders that failed"
          progressColor="bg-gray-500"
        />
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Orders</h1>
        <SearchFilter
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
          orderTrackingStatus={ORDER_TRACKING_STATUS}
        />
      </div>
      <TableComponent columns={columns} data={orders || []} model='order' />
      <Pagination
        {...pagination}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};
export default Index;

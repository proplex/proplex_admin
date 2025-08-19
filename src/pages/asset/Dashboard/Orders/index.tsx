import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import queryString from "query-string";
import { useAssetOrder } from "@/hooks/asset/useAssetOrder";
import { useDebounce } from "@/hooks/useDebounce";
import Pagination from "@/layout/Pagination";
import TableComponent from "@/components/TableComponent";
import SearchFilter from "./SearchFilter";
import { CheckCircle, Clock, Eye, ShoppingCart, XCircle } from "lucide-react";
import { ORDER_TRACKING_STATUS, PAYMENT_TYPE } from "@/constants/global";
import OrderStatusCard from "@/pages/orders/OrderStatusCard";
import { formatCompactNumber } from "@/helpers/global";

const Index = ({ assetOverview }: { assetOverview: any }) => {
  const {
    totalOrders,
    completedOrders,
    cancelledOrders,
    pendingOrders,
    refundedOrders,
    failedOrders,
  } = assetOverview?.orderStats || {};
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const { id } = useParams();
  const page = Number(queryParams.page) || 1;
  const limit = Number(queryParams.limit) || 10;
  const navigate = useNavigate();
  const { orders, getOrders, pagination } = useAssetOrder();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const columns = [
    {
      header: "Order Id",
      accessorKey: "_id",
      maxWidth: 100,
    },
    {
      header: "Investor",
      accessorKey: "investor",
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
    { header: "Tokens", accessorKey: "tokensBooked" },
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
      cell: ({ row }: { row: { original: { _id: string } } }) => (
        <div className="flex items-center gap-2">
          <Eye
            onClick={() => {
              navigate(`/order-details/${row.original._id}`);
            }}
            className="h-5 w-5 cursor-pointer"
          />
        </div>
      ),
    },
  ];

  const onPageSizeChange = (pageSize: number) => {
    navigate(
      `/dashborad-asset/${id}?search=${search}&page=1&limit=${pageSize}`
    );
  };

  const onPageChange = (page: number) => {
    navigate(`/dashborad-asset/${id}?page=${page}&limit=${limit}`);
  };

  useEffect(() => {
    if (id) {
      getOrders({ page, limit, search: debouncedSearch, id, status: filter });
    }
  }, [page, limit, debouncedSearch, id, filter]);

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
        />
      </div>

      <TableComponent columns={columns} data={orders || []} model="order" />
      <Pagination
        {...pagination}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};

export default Index;

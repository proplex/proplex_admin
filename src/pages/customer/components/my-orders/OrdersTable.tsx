

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronRight, Loader2, ArrowLeft, ArrowRight, Icon, RefreshCw } from "lucide-react";
// import { useRouter } from "next/navigation";
import { useFetchUserOrders } from "@/hooks/order/useFetchUserOrders";
import { getStatusClasses } from "../helper";
import { FilterDropdown } from "./FilterDropdown";
import Pagination from "../common/Pagination";
import NothingFound from "../common/NothingFound";
import { useNavigate, useParams } from 'react-router-dom';
import formatDate from "@/constants/formatdate";

const defaultPagination = {
  totalItems: 0,
  currentPage: 1,
  pageSize: 10,
  totalPages: 0,
  hasMore: false,
};

export const OrdersTable = () => {
  const [page, setPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: orders = [],
    loading,
    pagination,
  } = useFetchUserOrders(page, 10, selectedStatus, id);


  const navigateToOrder = (orderId: string) => {
    navigate(`/order-details/${orderId}`)
  };


  const formatStatusText = (status: string) => {
    return status
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
  };

  const handleFiltersChange = (
    filters: { id: string; enabled: boolean; label: string }[]
  ) => {
    const enabledFilter = filters.find(filter => filter.enabled);
    setSelectedStatus(enabledFilter ? enabledFilter.id : "");
    setPage(1); // Reset to first page when filter changes
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const renderTableHeader = () => (
    <TableHeader >
      <TableRow className="bg-gray-50">
        <TableCell className="font-semibold text-gray-600 hidden md:table-cell">
          ID
        </TableCell>
        <TableCell className="font-semibold text-gray-600">
          Project Name
        </TableCell>
        <TableCell className="font-semibold text-gray-600 hidden sm:table-cell">
          Order Date
        </TableCell>
        <TableCell className="font-semibold text-gray-600">Amount</TableCell>
        <TableCell className="font-semibold text-gray-600 hidden lg:table-cell">
          Status Description
        </TableCell>
        <TableCell className="font-semibold text-gray-600">Status</TableCell>
        <TableCell className="font-semibold text-gray-600"></TableCell>
      </TableRow>
    </TableHeader>
  );

  const renderTableRow = (order: any, index: number) => (
    <TableRow
      key={index}
      className="hover:bg-gray-50  transition-colors duration-150"
    >
      <TableCell className="font-medium text-gray-900 hidden md:table-cell">
        {order?.id}
      </TableCell>

      <TableCell className="text-gray-700">{order?.property_id}</TableCell>

      <TableCell className="text-gray-600 hidden sm:table-cell">
        {formatDate(order?.created_at)}
      </TableCell>
      <TableCell className="text-gray-700 font-medium">
        ₹{order?.total_amount}
      </TableCell>
      <TableCell className="text-gray-600 hidden lg:table-cell">
        {formatStatusText(order?.status)}
      </TableCell>
      <TableCell>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(order.status).textClass} ${getStatusClasses(order.status).bgClass}`}
        >
          {formatStatusText(order.status)}
        </span>
      </TableCell>
      <TableCell>
        <Button variant="ghost" onClick={() => navigateToOrder(order.id)}>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </Button>
      </TableCell>
    </TableRow>
  );

  const renderMobileCard = (order: any, index: number) => (
    <div key={index} className="bg-white shadow rounded-lg p-4 mb-4 sm:hidden">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600">
          ID: {order.id}
        </span>
        <span
          className={`inline-flex items-center  rounded-full text-xs p-2 font-medium ${getStatusClasses(order.status).textClass
            } ${getStatusClasses(order.status).bgClass}`}
        >
          {order.status}
        </span>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigateToOrder(order.id)} className="h-8 w-8">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {order?.propertyName}
      </h3>
      <p className="text-sm text-gray-600 mb-1">
        Order Date: {formatDate(order?.created_at)}
      </p>
      <p className="text-sm font-medium text-gray-700 mb-2">
        Amount: ₹{order?.total_amount}
      </p>
      <p className="text-sm text-gray-600 mb-2">
        Status Description: {order.status}
      </p>
    </div>
  );

  return (
    <div className="w-full px-4 py-2 sm:px-6 lg:px-8">
      <header className="flex flex-col sm:flex-row items-center justify-between sm:py-5 md:py-6">
        <div className="flex items-center w-full space-x-4 mb-4 sm:mb-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>  navigate(-1)}
            className="hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Button>

          <div className="flex-grow">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
              My Orders
            </h1>
          </div>

          {/* <div className="flex items-center space-x-4">
            <FilterDropdown 
              onFiltersChange={handleFiltersChange}
              selectedStatus={selectedStatus}
            />
          </div> */}
        </div>
      </header>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          </div>
        ) : orders.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <NothingFound />
          </div>
        ) : (
          <>
            <div className="w-full overflow-x-auto border-2 border-gray-200 rounded-lg hidden sm:block">
              <Table>
                {renderTableHeader()}
                <TableBody>
                  {orders.map((order, index) => renderTableRow(order, index))}
                </TableBody>
              </Table>
            </div>
            <div className="sm:hidden">
              {orders.map((order, index) => renderMobileCard(order, index))}
            </div>
          </>
        )}
      </div>
      <Pagination pager={pagination} onPageChange={handlePageChange}  />
    </div>
  );
}
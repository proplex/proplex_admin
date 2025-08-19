

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, ChevronRight, ChevronLeft, RefreshCcw } from "lucide-react";
import formatDate from "@/constants/formatdate";
import useFetchOrders from "@/hooks/transactions/useFetchTransactions";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import useFetchTransactions from "@/hooks/transactions/useFetchTransactions";

const TransactionsData = ({escrowId}:{escrowId:string}) => {
  const today = new Date();
  
    const { 
      transactions, 
      loading, 
      error, 
      dateRange, 
      setDateRange,
      pagination,
      handlePageChange 
    } = useFetchTransactions(escrowId || "");
  // useEffect(() => {
  //   fetchOrders(dateRange.from, dateRange.to);
  // }, [dateRange]);

  const handleCustomDateSelect = (dates: { from: Date; to: Date }) => {
    setDateRange(dates);
  };

  const handleRefresh = () => {
    // Optional: You can also reload the page using window object if needed
    window.location.reload();
    
  };

  return (
    <div className='space-y-6 w-full max-w-[1200px] mx-auto p-4 sm:p-6'>
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
        <h2 className='text-xl font-semibold text-[#1a1b1d]'>
          Total Transactions
        </h2>
        <div className='flex items-center justify-between gap-4  sm:w-auto'>
          <RefreshCcw
            className='text-gray-400   hover:text-gray-700 transition-colors cursor-pointer'
            onClick={handleRefresh}
            aria-label='Refresh transactions'
          />
        </div>
      </div>

      <div className='rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm'>
        {loading ? (
          <div className='p-8 text-center text-gray-500'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[#58AC7B] mx-auto mb-4'></div>
            Loading transactions...
          </div>
        ) : error ? (
          <div className='p-8 text-center '>{error}</div>
        ) : (
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow className='bg-gray-50 hover:bg-gray-50'>
                  <TableCell className='font-medium py-4'>
                    <div className='flex items-center gap-2 text-gray-700'>
                      <span className='hidden sm:inline'>Transaction type</span>
                      <span className='sm:hidden'>Type</span>
                      <ArrowUpDown className='h-4 w-4 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer' />
                    </div>
                  </TableCell>
                  <TableCell className='font-medium py-4'>
                    <div className='flex items-center gap-2 text-gray-700'>
                      <span className='hidden sm:inline'>Transaction date</span>
                      <span className='sm:hidden'>Date</span>
                      <ArrowUpDown className='h-4 w-4 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer' />
                    </div>
                  </TableCell>
                  <TableCell className='font-medium py-4 text-gray-700'>
                    Status
                  </TableCell>
                  <TableCell className='font-medium py-4 text-gray-700'>
                    Amount
                  </TableCell>
                  <TableCell className='w-10'></TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className='text-center py-8 text-gray-500'
                    >
                      No transactions found.
                    </TableCell>
                  </TableRow>
                ) : (
                  transactions
                    .slice()
                    .reverse()
                    .map((payment: any, index: any) => (
                      <TableRow
                        key={index}
                        className='hover:bg-gray-50/50 cursor-pointer transition-colors'
                      >
                        <TableCell className='py-4 text-gray-900 font-medium'>
                          {payment?.type}
                        </TableCell>
                        <TableCell className='py-4 text-gray-600'>
                          {formatDate(payment?.txn_date)}
                        </TableCell>
                        <TableCell>
                          <span className='px-2 py-1 rounded-2xl bg-[rgba(88,172,123,0.14)] text-[#58AC7B] text-sm'>
                            Success
                          </span>
                        </TableCell>
                        <TableCell className='py-4'>
                          <span className='font-medium text-gray-900'>
                            ₹ {payment?.amount}
                          </span>
                        </TableCell>
                        <TableCell className='py-4'>
                          <ChevronRight className='h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-0.5' />
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Add Pagination Controls */}

      {!loading && !error && transactions.length > 0 && (
        <div className='flex items-center justify-between px-2'>
          <div className='text-sm text-gray-500'>
            Showing page {pagination.currentPage} of {pagination.totalPages}
          </div>
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage <= 1}
              className='flex items-center gap-1'
            >
              <ChevronLeft className='h-4 w-4' />
              Previous
            </Button>

            <div className='flex items-center gap-1'>
              {/* First page button */}
              {pagination.currentPage > 2 && (
                <Button
                  variant={pagination.currentPage === 1 ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => handlePageChange(1)}
                  className='w-8 h-8'
                >
                  1
                </Button>
              )}

              {/* Ellipsis before current page if needed */}
              {pagination.currentPage > 3 && <span className='px-2'>...</span>}

              {/* Surrounding pages */}
              {[
                pagination.currentPage - 1,
                pagination.currentPage,
                pagination.currentPage + 1,
              ]
                .filter((page) => page > 0 && page <= pagination.totalPages)
                .map((pageNum) => (
                  <Button
                    key={pageNum}
                    variant={
                      pagination.currentPage === pageNum ? 'default' : 'outline'
                    }
                    size='sm'
                    onClick={() => handlePageChange(pageNum)}
                    className='w-8 h-8'
                  >
                    {pageNum}
                  </Button>
                ))}

              {/* Ellipsis after current page if needed */}
              {pagination.currentPage < pagination.totalPages - 2 && (
                <span className='px-2'>...</span>
              )}

              {/* Last page button */}
              {pagination.currentPage < pagination.totalPages - 1 && (
                <Button
                  variant={
                    pagination.currentPage === pagination.totalPages
                      ? 'default'
                      : 'outline'
                  }
                  size='sm'
                  onClick={() => handlePageChange(pagination.totalPages)}
                  className='w-8 h-8'
                >
                  {pagination.totalPages}
                </Button>
              )}
            </div>

            <Button
              variant='outline'
              size='sm'
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage >= pagination.totalPages}
              className='flex items-center gap-1'
            >
              Next
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionsData;
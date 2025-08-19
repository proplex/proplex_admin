import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { moneyFormat } from "@/helpers/date_fns";
import { fetchCustomerDetails } from "@/store/features/customerDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Eye } from 'lucide-react';
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export function InvestmentTable() {
  const { id } = useParams();
  const { customerDetails, loading } = useAppSelector((state) => state.customerDetails);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchCustomerDetails({ customerId: id }));
    }
  }, [dispatch, id]);

  const investments = customerDetails?.my_investments || [];

  return (
    <div className="mt-8 space-y-4">
      <h1 className="font-semibold text-2xl">Investment Table</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Project ID</TableHead>
              <TableHead className="font-semibold">Total SQYD</TableHead>
              <TableHead className="font-semibold">Invested Amount</TableHead>
              <TableHead className="font-semibold">Avg. Growth</TableHead>
              <TableHead className="font-semibold">Gained Amount</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : investments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No investment data available.
                </TableCell>
              </TableRow>
            ) : (
              investments.map((item) => (
                <TableRow key={item?.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{item?.name}</TableCell>
                  <TableCell className="text-primary">#{item?.id}</TableCell>
                  <TableCell>{item?.total_sqyds}</TableCell>
                  <TableCell>{moneyFormat(item?.total_investment)}</TableCell>
                  <TableCell>{moneyFormat(item?.total_returns)}</TableCell>
                  <TableCell>{moneyFormat(item?.growth_price)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      aria-label="View investment details"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}


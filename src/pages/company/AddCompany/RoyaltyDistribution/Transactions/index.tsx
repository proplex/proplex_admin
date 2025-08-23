import Loading from '@/components/ui/Loading';
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import { useStatements } from '@/hooks/useStatements';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Index = () => {
  const { statements, loading, fetchBasedOnPage } = useStatements();
  const { data = [], total_records = 0 } =
    (statements as unknown as { data: any[]; total_records: number }) || {};

  const itemsPerPage = 10;
  const totalPages = Math.ceil(total_records / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  if (loading) return <Loading />;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      fetchBasedOnPage(page);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-medium text-gray-700">Transaction Id</TableHead>
              <TableHead className="font-medium text-gray-700">Type</TableHead>
              <TableHead className="font-medium text-gray-700">Amount</TableHead>
              <TableHead className="font-medium text-gray-700">Balance</TableHead>
              <TableHead className="font-medium text-gray-700">Date and Time</TableHead>
            </TableRow>
          </TableHeader>
          <tbody>
            {data.length > 0 ? (
              data.map((statement: any, i: number) => (
                <TableRow key={i} className="hover:bg-gray-50">
                  <TableCell className="py-3 font-mono text-sm">{statement.txn_id}</TableCell>
                  <TableCell className="py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {statement.type}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 font-medium text-gray-900">{statement.amount}</TableCell>
                  <TableCell className="py-3 font-medium text-gray-900">{statement.balance}</TableCell>
                  <TableCell className="py-3 text-gray-600">{statement.exec_date}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-gray-500">
                  No transaction records found
                </TableCell>
              </TableRow>
            )}
          </tbody>
        </Table>
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              variant="outline"
              size="sm"
            >
              Previous
            </Button>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              variant="outline"
              size="sm"
            >
              Next
            </Button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(currentPage * itemsPerPage, total_records)}
                </span>{' '}
                of <span className="font-medium">{total_records}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="sm"
                  className="rounded-l-md"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  return (
                    <Button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      className={currentPage === page ? "" : "bg-white"}
                    >
                      {page}
                    </Button>
                  );
                })}
                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  size="sm"
                  className="rounded-r-md"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
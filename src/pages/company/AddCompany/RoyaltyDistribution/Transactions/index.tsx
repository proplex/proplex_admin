

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
    <div>
      <Table>
        <TableHeader className='text-left bg-gray-50'>
          <TableRow>
            <TableHead>Transaction Id</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead>Date and Time</TableHead>
          </TableRow>
          {data.map((statement: any, i: number) => (
            <TableRow key={i}>
              <TableCell>{statement.txn_id}</TableCell>
              <TableCell>{statement.type}</TableCell>
              <TableCell>{statement.amount}</TableCell>
              <TableCell>{statement.balance}</TableCell>
              <TableCell>{statement.exec_date}</TableCell>
            </TableRow>
          ))}
        </TableHeader>
      </Table>
      {totalPages > 1 && (
        <div className='flex justify-center space-x-2 mt-4'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1 ? 'bg-gray-300' : 'bg-primary text-white'
            }`}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? 'bg-gray-300'
                : 'bg-primary text-white'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
export default Index;

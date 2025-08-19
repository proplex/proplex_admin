

import Loading from '@/components/ui/Loading';
import LoadingIcon from '@/components/ui/loading-icon';
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useDistribution from '@/hooks/useDistribution';

// Utility function to handle empty values gracefully
const formatValue = (value: any) =>
  value !== null && value !== undefined ? value : '-';

const Index = ({ date }: { date: string }) => {
  const { distribution, status, sendingId, sendRoyalty } =
    useDistribution(date);

  if (status === 'fetching') return <Loading />;

  return (
    <Table>
      <TableHeader className='text-left bg-gray-50'>
        <TableRow>
          {[
            'Id',
            'User Id',
            'User Escrow Id',
            'Amount',
            'Percentage',
            'Transaction Id',
            'Created At',
            'Status',
          ].map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>

      {distribution.map(
        ({
          id,
          user_id,
          user_escrow_id,
          amount,
          percentage,
          transaction_id,
          status,
          created_at,
        }: any) => (
          <TableRow key={id}>
            <TableCell>{formatValue(id)}</TableCell>
            <TableCell>{formatValue(user_id)}</TableCell>
            <TableCell>{formatValue(user_escrow_id)}</TableCell>
            <TableCell>{formatValue(amount)}</TableCell>
            <TableCell>{formatValue(percentage)}</TableCell>
            <TableCell>{formatValue(transaction_id)}</TableCell>
            <TableCell>{formatValue(created_at)}</TableCell>
            <TableCell>
              {status === 'pending' ? (
                <button
                  disabled={sendingId === id}
                  onClick={() => sendRoyalty({ id })}
                  className='w-20 h-8 bg-black text-white rounded-md flex items-center justify-center'
                >
                  {sendingId === id ? <LoadingIcon /> : 'Send'}
                </button>
              ) : (
                formatValue(status)
              )}
            </TableCell>
          </TableRow>
        )
      )}
    </Table>
  );
};

export default Index;

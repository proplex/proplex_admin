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
import { Button } from '@/components/ui/button';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Define interface for distribution items
interface DistributionItem {
  id: string | number;
  user_id: string | number;
  user_escrow_id: string | number;
  amount: number | string;
  percentage: number | string;
  transaction_id: string | null;
  status: string;
  created_at: string;
}

// Utility function to handle empty values gracefully
const formatValue = (value: any) =>
  value !== null && value !== undefined ? value : '-';

const Index = ({ date }: { date: string }) => {
  const { distribution, status, sendingId, sendRoyalty } =
    useDistribution(date);

  if (status === 'fetching') return <Loading />;

  return (
    <motion.div 
      className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Table>
        <TableHeader className="bg-gray-50/80">
          <TableRow>
            {[
              'ID',
              'User ID',
              'Escrow ID',
              'Amount',
              'Percentage',
              'Transaction ID',
              'Created At',
              'Status',
            ].map((header) => (
              <TableHead key={header} className="font-semibold text-gray-700 py-3">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <tbody>
          {distribution.length > 0 ? (
            distribution.map((item: DistributionItem) => (
              <TableRow 
                key={item.id} 
                className="hover:bg-gray-50/50 transition-colors"
              >
                <TableCell className="py-4 font-medium text-gray-900">#{formatValue(item.id)}</TableCell>
                <TableCell className="py-4">{formatValue(item.user_id)}</TableCell>
                <TableCell className="py-4">{formatValue(item.user_escrow_id)}</TableCell>
                <TableCell className="py-4 font-medium text-gray-900">₹{formatValue(item.amount)}</TableCell>
                <TableCell className="py-4">{formatValue(item.percentage)}%</TableCell>
                <TableCell className="py-4 font-mono text-sm">{formatValue(item.transaction_id)}</TableCell>
                <TableCell className="py-4 text-gray-600">{formatValue(item.created_at)}</TableCell>
                <TableCell className="py-4">
                  {item.status === 'pending' ? (
                    <Button
                      disabled={sendingId === item.id}
                      onClick={() => sendRoyalty({ id: item.id.toString() })}
                      size="sm"
                      className="h-8 px-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      {sendingId === item.id ? (
                        <LoadingIcon className="w-4 h-4" />
                      ) : (
                        <div className="flex items-center gap-1">
                          <Send className="w-3 h-3" />
                          Send
                        </div>
                      )}
                    </Button>
                  ) : (
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Sent</span>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="py-12 text-center">
                <div className="flex flex-col items-center justify-center">
                  <AlertCircle className="h-12 w-12 text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No Distribution Records</h3>
                  <p className="text-gray-500">
                    {date 
                      ? 'No distributions found for the selected date' 
                      : 'Select a distribution date to view records'}
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </tbody>
      </Table>
    </motion.div>
  );
};

export default Index;
import { useFormContext } from 'react-hook-form';
import EscrowDetails from './EscrowDetails';
import { useState } from 'react';
import Transactions from './Transactions';
import Distributions from './Distributions';
import useRoyalties from '@/hooks/useRoyalties';
import { useParams } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { CreditCard, Building2, Send, FileText, Info } from 'lucide-react';

interface RoyaltyItem {
  value: string;
  label: string;
}

interface DistributionData {
  amount?: number | string;
  description?: string;
}

const Index = () => {
  const { setValue, watch } = useFormContext();
  const [data, setData] = useState<DistributionData>({});
  const [date, setDate] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const escrowDetails = watch('royaltyEscrowDetails');
  const [tab, setTab] = useState('customers');
  const { id: company_id } = useParams<{ id: string }>();
  const { royalties, submitDistribution } = useRoyalties({
    companyId: company_id || null,
    setDate,
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  const setTabHandler = (tab: string) => {
    setTab(tab);
  };

  const handleChange = (value: string) => {
    setDate(value);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await submitDistribution(data);
      setIsOpen(false);
      setData({}); // Reset form data
    } catch (error) {
      console.error('Error submitting distribution:', error);
    }
  };

  // Check if escrow details exist and have a name
  const disableDistribute = !escrowDetails || !escrowDetails.name;

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent className="sm:max-w-[425px] rounded-2xl shadow-xl">
          <DialogHeader className="mb-2">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Send className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-gray-900">
                  Royalty Distribution
                </DialogTitle>
                <p className="text-gray-600 text-sm">
                  Distribute royalties to customers
                </p>
              </div>
            </div>
          </DialogHeader>
          
          {/* Information Banner */}
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100 mb-4">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-700">
                Ensure all details are correct before submitting the distribution.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-4">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <Input 
                  name="amount" 
                  type="number" 
                  onChange={onChangeHandler} 
                  value={data.amount || ''}
                  className="w-full"
                  placeholder="Enter distribution amount"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <Textarea 
                  name="description" 
                  onChange={onChangeHandler} 
                  value={data.description || ''}
                  className="w-full"
                  placeholder="Enter distribution description"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button 
                type="button" 
                onClick={handleSubmit}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Submit Distribution
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="space-y-6">
        {/* Escrow Details Section */}

        
        {/* Distribution Management Section */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
          variants={itemVariants}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-md">
                <Send className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Distribution Management</h2>
                <p className="text-gray-600 text-sm mt-1">
                  Distribute royalties to customers and view transaction history
                </p>
              </div>
            </div>

            <Button
              onClick={handleOpen}
              type="button"
              className={`whitespace-nowrap ${disableDistribute ? 'opacity-50 cursor-not-allowed' : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'}`}
              disabled={!!disableDistribute}
            >
              Distribute Royalty
            </Button>
          </div>
          
          {/* Information Cards */}

          <div className="px-6 pb-6">
            <div className="border-b border-gray-200">
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setTabHandler('customers')}
                  className={`pb-3 px-1 border-b-2 font-medium text-sm ${
                    tab === 'customers'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Customers
                </button>
                <button
                  onClick={() => setTabHandler('transactions')}
                  className={`pb-3 px-1 border-b-2 font-medium text-sm ${
                    tab === 'transactions'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Transactions
                </button>
              </div>
            </div>
            
            <div className="pt-6">
              {tab === 'transactions' ? (
                <Transactions />
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-end">
                    <Select onValueChange={handleChange} value={date || undefined}>
                      <SelectTrigger className="w-[250px]">
                        <SelectValue placeholder="Select a Distribution Date" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60 overflow-y-auto">
                        <SelectGroup>
                          {royalties && royalties.length > 0 ? (
                            royalties.map((item: RoyaltyItem) => (
                              <SelectItem 
                                key={item.value} 
                                value={item.value || 'no-date'} // Ensure value is never an empty string
                              >
                                {item.label}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="no-dates" disabled>
                              No distribution dates available
                            </SelectItem>
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <Distributions date={date} />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Index;
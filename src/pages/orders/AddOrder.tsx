import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ShoppingCart,
  User,
  DollarSign,
  CreditCard,
  Package,
  Sparkles,
  Plus
} from 'lucide-react';

const formSchema = z.object({
  investorId: z.string().min(1, 'Investor selection is required'),
  tokensBooked: z.coerce.number().min(1, 'Tokens must be at least 1'),
  totalOrderValue: z.coerce.number().min(1, 'Order value must be greater than 0'),
  currency: z.enum(['USD', 'INR'], { required_error: 'Currency is required' }),
  paymentType: z.enum(['credit_card', 'bank_transfer', 'crypto', 'paypal', 'wire_transfer'], {
    required_error: 'Payment type is required'
  }),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

// Animation variants
const containerVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const headerVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function AddOrder() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      investorId: '',
      tokensBooked: 0,
      totalOrderValue: 0,
      currency: 'USD',
      paymentType: 'credit_card',
      notes: '',
    },
  });

  async function onSubmit(values: FormData) {
    try {
      // TODO: Replace with actual API call when backend is available
      console.log('Order data:', values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Success',
        description: 'Order created successfully',
      });
      navigate('/orders');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to create order',
        variant: 'destructive',
      });
    }
  }

  // Mock investor data - replace with actual API call
  const mockInvestors = [
    { id: '1', name: 'John Smith', email: 'john.smith@example.com' },
    { id: '2', name: 'Sarah Johnson', email: 'sarah.johnson@example.com' },
    { id: '3', name: 'Michael Chen', email: 'michael.chen@example.com' },
    { id: '4', name: 'Emily Davis', email: 'emily.davis@example.com' },
  ];

  const paymentTypeLabels = {
    credit_card: 'Credit Card',
    bank_transfer: 'Bank Transfer',
    crypto: 'Cryptocurrency',
    paypal: 'PayPal',
    wire_transfer: 'Wire Transfer',
  };

  return (
    <motion.div
      className="flex flex-col w-full space-y-6"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Enhanced Header */}
      <motion.div
        variants={headerVariants}
        className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-6 border border-blue-100 shadow-sm overflow-hidden relative"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 right-4 w-32 h-32 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-indigo-500 rounded-full blur-2xl" />
        </div>
        
        <div className="relative">
          <div className="flex items-center gap-4">
            <motion.div
              className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg relative overflow-hidden"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              />
              <ShoppingCart className="w-6 h-6 text-white relative z-10" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Create New Order
              </h1>
              <p className="text-gray-600 text-sm font-medium mt-1 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Process investment orders and manage token allocations
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Feature Overview Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={contentVariants}
      >
        {[
          { icon: User, title: "Investor Selection", desc: "Choose the investing party" },
          { icon: Package, title: "Token Allocation", desc: "Define token quantities" },
          { icon: DollarSign, title: "Order Valuation", desc: "Set investment amounts" },
          { icon: CreditCard, title: "Payment Method", desc: "Configure payment options" },
        ].map((feature, index) => (
          <motion.div
            key={feature.title}
            className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
            whileHover={{ scale: 1.02, y: -2 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg">
                <feature.icon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">{feature.title}</h3>
                <p className="text-xs text-gray-600 mt-1">{feature.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Enhanced Form Container */}
      <motion.div
        variants={contentVariants}
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <Card className="border-0 shadow-none">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-900">Order Details</CardTitle>
                <p className="text-sm text-gray-600 mt-1">Fill in the order information below</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Investor Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="investorId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 font-medium">Investor</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select an investor" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {mockInvestors.map((investor) => (
                              <SelectItem key={investor.id} value={investor.id}>
                                <div className="flex flex-col">
                                  <span className="font-medium">{investor.name}</span>
                                  <span className="text-sm text-gray-500">{investor.email}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 font-medium">Currency</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="USD">USD ($)</SelectItem>
                            <SelectItem value="INR">INR (₹)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Token and Value Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="tokensBooked"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 font-medium">Tokens Booked</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter number of tokens"
                            className="h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="totalOrderValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 font-medium">Total Order Value</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter order value"
                            className="h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Payment Type */}
                <FormField
                  control={form.control}
                  name="paymentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 font-medium">Payment Method</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(paymentTypeLabels).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Notes */}
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 font-medium">Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Add any additional notes or comments"
                          className="min-h-[100px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
                  <Button
                    type="button"
                    variant="outline"
                    className="px-8 h-12"
                    onClick={() => navigate('/orders')}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="px-8 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? 'Creating...' : 'Create Order'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
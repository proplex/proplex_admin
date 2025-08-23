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
import api from '@/lib/httpClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  User,
  Mail,
  Phone,
  Wallet,
  MapPin,
  Shield,
  Sparkles,
  Plus,
  UserCheck
} from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  wallet_address: z.string().min(10, 'Wallet address is required'),
  country: z.string().min(1, 'Country is required'),
  city: z.string().optional(),
  customerType: z.enum(['individual', 'institutional'], {
    required_error: 'Customer type is required'
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

export default function AddCustomer() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      wallet_address: '',
      country: '',
      city: '',
      customerType: 'individual',
      notes: '',
    },
  });

  async function onSubmit(values: FormData) {
    try {
      await api.post('/v2/admin/user', values);
      toast({
        title: 'Success',
        description: 'Customer added successfully',
      });
      navigate('/customers');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to add customer',
        variant: 'destructive',
      });
    }
  }

  // Mock countries data - replace with actual API or library
  const countries = [
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
    { value: 'IN', label: 'India' },
    { value: 'SG', label: 'Singapore' },
    { value: 'AU', label: 'Australia' },
  ];

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
        className="bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 rounded-xl p-6 border border-emerald-100 shadow-sm overflow-hidden relative"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 right-4 w-32 h-32 bg-emerald-500 rounded-full blur-3xl" />
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-green-500 rounded-full blur-2xl" />
        </div>
        
        <div className="relative">
          <div className="flex items-center gap-4">
            <motion.div
              className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg relative overflow-hidden"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              />
              <User className="w-6 h-6 text-white relative z-10" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Add New Customer
              </h1>
              <p className="text-gray-600 text-sm font-medium mt-1 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Create investor profiles and manage customer relationships
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
          { icon: User, title: "Personal Info", desc: "Basic customer details" },
          { icon: Mail, title: "Contact Details", desc: "Communication preferences" },
          { icon: Wallet, title: "Web3 Integration", desc: "Blockchain wallet setup" },
          { icon: Shield, title: "Verification", desc: "KYC and compliance" },
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
              <div className="p-2 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg">
                <feature.icon className="w-5 h-5 text-emerald-600" />
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
          <CardHeader className="bg-gradient-to-r from-gray-50 to-emerald-50 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-900">Customer Information</CardTitle>
                <p className="text-sm text-gray-600 mt-1">Fill in the customer details below</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Basic Information Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                    <UserCheck className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-900 font-medium flex items-center gap-2">
                            <User className="w-4 h-4 text-emerald-600" />
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John Doe"
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
                      name="customerType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-900 font-medium flex items-center gap-2">
                            <Shield className="w-4 h-4 text-emerald-600" />
                            Customer Type
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select customer type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="individual">Individual Investor</SelectItem>
                              <SelectItem value="institutional">Institutional Investor</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Contact Information Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                    <Mail className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-900 font-medium flex items-center gap-2">
                            <Mail className="w-4 h-4 text-emerald-600" />
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="john@example.com"
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
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-900 font-medium flex items-center gap-2">
                            <Phone className="w-4 h-4 text-emerald-600" />
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="+1234567890"
                              className="h-12"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Location Information Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Location Information</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-900 font-medium flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-emerald-600" />
                            Country
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {countries.map((country) => (
                                <SelectItem key={country.value} value={country.value}>
                                  {country.label}
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
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-900 font-medium">City (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="New York"
                              className="h-12"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Blockchain Information Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                    <Wallet className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Blockchain Information</h3>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="wallet_address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 font-medium flex items-center gap-2">
                          <Wallet className="w-4 h-4 text-emerald-600" />
                          Wallet Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="0x..."
                            className="h-12 font-mono"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Additional Notes Section */}
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 font-medium">Additional Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Add any additional notes or comments about the customer"
                            className="min-h-[100px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
                  <Button
                    type="button"
                    variant="outline"
                    className="px-8 h-12"
                    onClick={() => navigate('/customers')}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="px-8 h-12 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? 'Creating...' : 'Add Customer'}
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

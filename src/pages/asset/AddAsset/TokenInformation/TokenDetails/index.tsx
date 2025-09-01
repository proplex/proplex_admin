import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Calendar, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format, parse } from "date-fns";

// Professional date picker component
const DatePickerField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  className,
  required = false
}: { 
  label: string; 
  name: string; 
  value: Date | undefined; 
  onChange: (date: Date | undefined) => void;
  className?: string;
  required?: boolean;
}) => {
  return (
    <div className={`space-y-2 ${className || ''}`}>
      <Label htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={name}
            variant="outline"
            className="w-full justify-between text-left font-normal bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors"
          >
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-gray-500" />
              <span>{value ? format(value, "MMMM d, yyyy") : `Select ${label}`}</span>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 z-[9999]" align="start">
          <div className="bg-white rounded-md border border-gray-200 shadow-lg overflow-hidden">
            <div className="p-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
              <div className="text-sm font-medium text-gray-700 text-center">{label}</div>
            </div>
            <CalendarComponent
              mode="single"
              selected={value}
              onSelect={onChange}
              initialFocus
              className="rounded-md bg-white"
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

const TokenDetails = () => {
  const { register, setValue, watch, formState } = useFormContext();
  const errors = formState.errors as any; // Type assertion to avoid TypeScript errors
  
  // Extract date values from form or initialize as undefined
  const watchedStartDate = watch("tokenInformation.listingStartDate");
  const watchedEndDate = watch("tokenInformation.listingEndDate");
  
  // Convert string dates to Date objects if they exist
  const initialStartDate = watchedStartDate ? 
    (typeof watchedStartDate === 'string' ? 
      new Date(watchedStartDate) : watchedStartDate) : undefined;
  
  const initialEndDate = watchedEndDate ? 
    (typeof watchedEndDate === 'string' ? 
      new Date(watchedEndDate) : watchedEndDate) : undefined;
  
  const [startDate, setStartDate] = useState<Date | undefined>(initialStartDate);
  const [endDate, setEndDate] = useState<Date | undefined>(initialEndDate);

  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date);
    if (date) {
      setValue("tokenInformation.listingStartDate", date, { shouldValidate: true, shouldDirty: true });
    } else {
      setValue("tokenInformation.listingStartDate", null, { shouldValidate: true, shouldDirty: true });
    }
  };

  const handleEndDateChange = (date: Date | undefined) => {
    setEndDate(date);
    if (date) {
      setValue("tokenInformation.listingEndDate", date, { shouldValidate: true, shouldDirty: true });
    } else {
      setValue("tokenInformation.listingEndDate", null, { shouldValidate: true, shouldDirty: true });
    }
  };

  return (
    <div className="space-y-8 relative z-10">
      {/* Token Information Section */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 10c0 1-1 2-4 2s-4-1-4-2"/><path d="M12 14v4"/><path d="M12 6v2"/></svg>
          </span>
          Token Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="tokenSymbol">Token Symbol <span className="text-red-500">*</span></Label>
            <Input 
              id="tokenSymbol" 
              {...register("tokenInformation.tokenSymbol", { 
                required: "Token Symbol is required" 
              })}
              placeholder="TOKK2"
              className="w-full bg-white border-gray-200 hover:border-gray-300 transition-colors focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            {errors?.tokenInformation?.tokenSymbol && (
              <p className="text-sm text-red-500">{errors.tokenInformation.tokenSymbol.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="totalTokenSupply">Total Token Supply <span className="text-red-500">*</span></Label>
            <Input 
              id="totalTokenSupply" 
              type="number"
              {...register("tokenInformation.tokenSupply", { 
                required: "Total Token Supply is required",
                min: {
                  value: 1,
                  message: "Total Token Supply must be greater than 0"
                }
              })}
              placeholder="1000"
              className="w-full bg-white border-gray-200 hover:border-gray-300 transition-colors focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            {errors?.tokenInformation?.tokenSupply && (
              <p className="text-sm text-red-500">{errors.tokenInformation.tokenSupply.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="minimumTokenToBuy">Minimum Token To Buy <span className="text-red-500">*</span></Label>
            <Input 
              id="minimumTokenToBuy" 
              type="number"
              {...register("tokenInformation.minimumTokensToBuy", { 
                required: "Minimum Token To Buy is required",
                min: {
                  value: 1,
                  message: "Minimum Token To Buy must be greater than 0"
                }
              })}
              placeholder="10"
              className="w-full bg-white border-gray-200 hover:border-gray-300 transition-colors focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            {errors?.tokenInformation?.minimumTokensToBuy && (
              <p className="text-sm text-red-500">{errors.tokenInformation.minimumTokensToBuy.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="maximumTokenToBuy">Maximum Token To Buy <span className="text-red-500">*</span></Label>
            <Input 
              id="maximumTokenToBuy" 
              type="number"
              {...register("tokenInformation.maximumTokensToBuy", { 
                required: "Maximum Token To Buy is required",
                min: {
                  value: 1,
                  message: "Maximum Token To Buy must be greater than 0"
                }
              })}
              placeholder="100"
              className="w-full bg-white border-gray-200 hover:border-gray-300 transition-colors focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            {errors?.tokenInformation?.maximumTokensToBuy && (
              <p className="text-sm text-red-500">{errors.tokenInformation.maximumTokensToBuy.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tokenPrice">Token Price</Label>
            <Input 
              id="tokenPrice" 
              type="number"
              {...register("tokenInformation.tokenPrice")}
              placeholder="1000"
              className="w-full bg-white border-gray-200 hover:border-gray-300 transition-colors focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              disabled={true}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="basePropertyValue">Base Property Value</Label>
            <Input 
              id="basePropertyValue" 
              type="number"
              {...register("basePropertyValue")}
              placeholder="1000000"
              className="w-full bg-white border-gray-200 hover:border-gray-300 transition-colors focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              disabled={true}
            />
          </div>
        </div>
      </div>

      {/* Investor Requirements & Timeline Section */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </span>
          Investor Requirements & Timeline
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="investorAccredited">Investor Accredited</Label>
            <Select 
              onValueChange={(value) => setValue("tokenInformation.investorAccredited", value, { shouldValidate: true })}
              defaultValue={watch("tokenInformation.investorAccredited") || "open_to_all"}
            >
              <SelectTrigger 
                id="investorAccredited" 
                className="w-full bg-white border-gray-200 hover:border-gray-300 transition-colors"
              >
                <SelectValue placeholder="Select investor accreditation" />
              </SelectTrigger>
              <SelectContent className="z-[9999] bg-white border border-gray-200 shadow-lg">
                <SelectItem value="open_to_all">Open to all</SelectItem>
                <SelectItem value="accredited_only">Accredited investors only</SelectItem>
                <SelectItem value="qualified_only">Qualified investors only</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="kycAmlRequirements">KYC/AML requirements</Label>
            <Select 
              onValueChange={(value) => setValue("tokenInformation.kycAmlRequirements", value, { shouldValidate: true })}
              defaultValue={watch("tokenInformation.kycAmlRequirements") || "required_for_all"}
            >
              <SelectTrigger 
                id="kycAmlRequirements" 
                className="w-full bg-white border-gray-200 hover:border-gray-300 transition-colors"
              >
                <SelectValue placeholder="Select KYC/AML requirements" />
              </SelectTrigger>
              <SelectContent className="z-[9999] bg-white border border-gray-200 shadow-lg">
                <SelectItem value="required_for_all">Required for all</SelectItem>
                <SelectItem value="required_for_accredited">Required for accredited investors</SelectItem>
                <SelectItem value="not_required">Not required</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lockupPeriod">Lockup Period</Label>
            <Select 
              onValueChange={(value) => setValue("tokenInformation.lockupPeriod", value, { shouldValidate: true })}
              defaultValue={watch("tokenInformation.lockupPeriod") || "no_lockup"}
            >
              <SelectTrigger 
                id="lockupPeriod" 
                className="w-full bg-white border-gray-200 hover:border-gray-300 transition-colors"
              >
                <SelectValue placeholder="Select lockup period" />
              </SelectTrigger>
              <SelectContent className="z-[9999] bg-white border border-gray-200 shadow-lg">
                <SelectItem value="no_lockup">No lockup</SelectItem>
                <SelectItem value="three_months">3 months</SelectItem>
                <SelectItem value="six_months">6 months</SelectItem>
                <SelectItem value="one_year">1 year</SelectItem>
                <SelectItem value="two_years">2 years</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <DatePickerField
            label="Listing Start Date"
            name="listingStartDate"
            value={startDate}
            onChange={handleStartDateChange}
            className="w-full"
          />
          
          <DatePickerField
            label="Listing End Date"
            name="listingEndDate"
            value={endDate}
            onChange={handleEndDateChange}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default TokenDetails;
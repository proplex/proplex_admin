import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

const TokenDetails = () => {
  const { register, setValue, watch, formState } = useFormContext();
  const errors = formState.errors as any; // Type assertion to avoid TypeScript errors
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date);
    if (date) {
      setValue("tokenInformation.listingStartDate", date);
    }
  };

  const handleEndDateChange = (date: Date | undefined) => {
    setEndDate(date);
    if (date) {
      setValue("tokenInformation.listingEndDate", date);
    }
  };

  return (
    <div className="space-y-8">
      {/* Token Information Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Token Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="tokenSymbol">Token Symbol <span className="text-red-500">*</span></Label>
            <Input 
              id="tokenSymbol" 
              {...register("tokenInformation.tokenSymbol", { 
                required: "Token Symbol is required" 
              })}
              placeholder="TOKK2"
              className="w-full"
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
              className="w-full"
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
              className="w-full"
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
              className="w-full"
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
              className="w-full"
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
              className="w-full"
              disabled={true}
            />
          </div>
        </div>
      </div>

      {/* Investor Requirements & Timeline Section */}
      <div className="pt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Investor Requirements & Timeline</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="investorAccredited">Investor Accredited</Label>
            <Select 
              onValueChange={(value) => setValue("tokenInformation.investorAccredited", value)}
              defaultValue={watch("tokenInformation.investorAccredited") || "open_to_all"}
            >
              <SelectTrigger id="investorAccredited" className="w-full">
                <SelectValue placeholder="Select investor accreditation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open_to_all">Open to all</SelectItem>
                <SelectItem value="accredited_only">Accredited investors only</SelectItem>
                <SelectItem value="qualified_only">Qualified investors only</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="kycAmlRequirements">KYC/AML requirments</Label>
            <Select 
              onValueChange={(value) => setValue("tokenInformation.kycAmlRequirements", value)}
              defaultValue={watch("tokenInformation.kycAmlRequirements") || "required_for_all"}
            >
              <SelectTrigger id="kycAmlRequirements" className="w-full">
                <SelectValue placeholder="Select KYC/AML requirements" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="required_for_all">Required for all</SelectItem>
                <SelectItem value="required_for_accredited">Required for accredited investors</SelectItem>
                <SelectItem value="not_required">Not required</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lockupPeriod">Lockup Period</Label>
            <Select 
              onValueChange={(value) => setValue("tokenInformation.lockupPeriod", value)}
              defaultValue={watch("tokenInformation.lockupPeriod") || "no_lockup"}
            >
              <SelectTrigger id="lockupPeriod" className="w-full">
                <SelectValue placeholder="Select lockup period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no_lockup">No lockup</SelectItem>
                <SelectItem value="three_months">3 months</SelectItem>
                <SelectItem value="six_months">6 months</SelectItem>
                <SelectItem value="one_year">1 year</SelectItem>
                <SelectItem value="two_years">2 years</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="listingStartDate">Listing Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : "Listing Start Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={startDate}
                  onSelect={handleStartDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="listingEndDate">Listing End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : "Listing End Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={endDate}
                  onSelect={handleEndDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenDetails;
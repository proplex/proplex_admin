import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from "lucide-react";
import { SPV_TYPES } from "@/constants/global";

interface FiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedFilters: string[];
  handleFilterToggle: (value: string) => void;
  removeFilter: (value: string) => void;
  clearAllFilters: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedFilters,
  handleFilterToggle,
  removeFilter,
  clearAllFilters,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          type="search"
          placeholder="Search"
          className="w-full max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              Filter By Type
              {selectedFilters.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {selectedFilters.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="end">
            <div className="p-2">
              {SPV_TYPES.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-2 p-2"
                >
                  <Checkbox
                    id={option.value}
                    checked={selectedFilters.includes(
                      option.value.toLowerCase().replace(/\s+/g, "").trim()
                    )}
                    onCheckedChange={() => handleFilterToggle(option.value)}
                  />
                  <label
                    htmlFor={option.value}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-grow"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-wrap gap-2 h-8 items-center">
        {selectedFilters.length > 0 ? (
          selectedFilters.map((filter) => {
            const option = SPV_TYPES.find((opt) => opt.value === filter);
            return (
              <Badge
                key={filter}
                variant="outline"
                className="flex items-center gap-1 px-3 py-1"
              >
                {option?.label || filter}
                <X
                  size={14}
                  className="cursor-pointer"
                  onClick={() => removeFilter(filter)}
                />
              </Badge>
            );
          })
        ) : (
          <p className="text-sm text-gray-500">No filters selected</p>
        )}
        {selectedFilters.length > 0 && (
          <Button
            variant="link"
            className="text-sm text-blue-500"
            onClick={clearAllFilters}
          >
            Clear All
          </Button>
        )}
      </div>
    </div>
  );
};

export default Filters;
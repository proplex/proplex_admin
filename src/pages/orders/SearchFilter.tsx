import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectViewport } from "@radix-ui/react-select";

interface SearchFilterProps {
  search: string;
  setSearch: (value: string) => void;
  filter: string;
  setFilter: (value: string) => void;
  orderTrackingStatus: { value: string; label: string }[];
}

const SearchFilter = ({
  search,
  setSearch,
  filter,
  setFilter,
  orderTrackingStatus,
}: SearchFilterProps) => {
  return (
    <div className="flex gap-4 items-center">
      <Input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        value={search}
        type="search"
        placeholder="Search"
      />
      <Select
        onValueChange={(value) => {
          setFilter(value);
        }}
        defaultValue={filter}
      >
        <SelectTrigger className="max-w-xl">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectViewport>
            {orderTrackingStatus.map((status) => (
              <SelectItem
                key={status.value}
                value={status.value}
                className="flex items-center gap-2 text-ellipsis"
              >
                {status.label}
              </SelectItem>
            ))}
          </SelectViewport>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchFilter;

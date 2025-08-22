import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SearchFilterProps {
  search: string;
  setSearch: (value: string) => void;
  filter: string;
  setFilter: (value: string) => void;
  orderTrackingStatus: { value: string; label: string }[];
}

export const SearchFilter = ({
  search,
  setSearch,
  filter,
  setFilter,
  orderTrackingStatus,
}: SearchFilterProps) => {
  return (
    <div className="flex gap-2">
      <Input
        placeholder="Search orders..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-xs"
      />
      <Select value={filter} onValueChange={setFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Status</SelectItem>
          {orderTrackingStatus.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

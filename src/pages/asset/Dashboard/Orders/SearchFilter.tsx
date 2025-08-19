import React from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ORDER_TRACKING_STATUS } from '@/constants/global';

interface SearchFilterProps {
  search: string;
  setSearch: (value: string) => void;
  filter: string;
  setFilter: (value: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  search,
  setSearch,
  filter,
  setFilter,
}) => {
  return (
    <div className='flex gap-4 items-center'>
      <Input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        value={search}
        type='search'
        placeholder='Search'
      />
      <Select
        onValueChange={(value) => {
          setFilter(value);
        }}
        defaultValue={filter}
      >
        <SelectTrigger className='max-w-xl'>
          <SelectValue placeholder='Filter by status' />
        </SelectTrigger>
        <SelectContent>
          {ORDER_TRACKING_STATUS.map((status) => (
            <SelectItem
              key={status.value}
              value={status.value}
              className='flex items-center gap-2 text-ellipsis'
            >
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchFilter;

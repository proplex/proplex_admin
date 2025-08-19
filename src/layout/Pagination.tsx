

import type React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  limit: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (limit: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages = 1,
  hasPreviousPage = false,
  hasNextPage = false,
  limit = 10,
  pageSizeOptions = [1, 3, 5, 10, 25, 50],
  onPageChange = () => {},
  onPageSizeChange = () => {},
  className,
}) => {
  const getPageNumbers = () => {
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 'ellipsis', totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, 'ellipsis', totalPages - 2, totalPages - 1, totalPages];
    }

    return [
      1,
      'ellipsis',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      'ellipsis',
      totalPages,
    ];
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && hasPreviousPage) {
      onPageChange(currentPage - 1);
    } else if (e.key === 'ArrowRight' && hasNextPage) {
      onPageChange(currentPage + 1);
    } else if (e.key === 'Home' && currentPage !== 1) {
      onPageChange(1);
    } else if (e.key === 'End' && currentPage !== totalPages) {
      onPageChange(totalPages);
    }
  };

  // Ensure the current limit is in the options list
  const effectiveOptions = pageSizeOptions.includes(limit)
    ? pageSizeOptions
    : [...pageSizeOptions, limit].sort((a, b) => a - b);

  return (
    <div
      className={cn('flex items-center justify-between bg-white', className)}
      onKeyDown={(e) => handleKeyDown(e)}
      tabIndex={0}
      role='navigation'
      aria-label='Pagination'
    >
      {/* Page Size Selector */}
      <div className='flex items-center gap-2'>
        <span className='text-sm text-muted-foreground'>Per page</span>
        <Select
          value={limit.toString()}
          onValueChange={(value) => onPageSizeChange(Number(value))}
        >
          <SelectTrigger className='w-[60px] h-9'>
            <SelectValue placeholder={limit} />
          </SelectTrigger>
          <SelectContent>
            {effectiveOptions.map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Page Navigation */}
      <div className='flex items-center justify-center gap-1'>
        <Button
          variant='outline'
          size='icon'
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPreviousPage}
          aria-label='Previous page'
        >
          <ChevronLeft className='h-4 w-4' />
        </Button>

        <div className='flex items-center'>
          {getPageNumbers().map((page, idx) =>
            page === 'ellipsis' ? (
              <span
                key={`ellipsis-${idx}`}
                className='px-2 text-muted-foreground'
              >
                &#8230;
              </span>
            ) : (
              <Button
                key={page}
                variant={page === currentPage ? 'default' : 'outline'}
                className='mx-0.5'
                onClick={() => onPageChange(page as number)}
                aria-label={`Page ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </Button>
            )
          )}
        </div>

        <Button
          variant='outline'
          size='icon'
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
          aria-label='Next page'
        >
          <ChevronRight className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;

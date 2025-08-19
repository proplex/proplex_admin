import React from "react";

type Pager = {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
};

interface PaginationProps {
  pager: Pager;
  onPageChange: (page: number) => void;
}

const  Pagination: React.FC<PaginationProps> = ({ pager, onPageChange }) => {
  const { currentPage, totalPages } = pager;

  const generatePages = () => {
    const pages: (number | string)[] = [];
    const range = 2;

    if (totalPages <= 1) return pages;

    if (currentPage > range + 1) pages.push(1, "...");

    for (
      let i = Math.max(1, currentPage - range);
      i <= Math.min(totalPages, currentPage + range);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - range) pages.push("...", totalPages);

    return pages;
  };

  const pages = generatePages();

  return (
    <div className='flex items-center justify-end gap-3 mt-6'>
      <button
        className={`flex items-end justify-end px-3 py-1 text-sm font-medium border rounded-lg ${
          currentPage === 1
            ? 'cursor-not-allowed bg-gray-200 text-gray-500'
            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900'
        }`}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {/* Page Numbers */}
      <div className='flex items-center gap-2'>
        {pages.map((page, index) =>
          typeof page === 'number' ? (
            <button
              key={index}
              className={`flex items-center justify-center w-7 h-7 rounded-lg text-sm px-3 font-medium ${
                page === currentPage
                  ? 'bg-teal-400 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ) : (
            <span
              key={index}
              className='flex items-center justify-center w-5 h-5 text-gray-500'
            >
              {page}
            </span>
          )
        )}
      </div>

      {/* Next Button */}
      <button
        className={`flex items-center justify-center px-3 py-1 text-sm font-medium border rounded-lg ${
          currentPage === totalPages
            ? 'cursor-not-allowed bg-gray-200 text-gray-500'
            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900'
        }`}
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

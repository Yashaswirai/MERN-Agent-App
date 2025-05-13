import React from 'react';
import { TableRowSkeleton } from './Skeleton';

export const Table = ({ 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <div className={`overflow-x-auto ${className}`} {...props}>
      <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
        {children}
      </table>
    </div>
  );
};

export const TableHead = ({ 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <thead className={`bg-neutral-50 dark:bg-neutral-800 ${className}`} {...props}>
      {children}
    </thead>
  );
};

export const TableBody = ({ 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <tbody 
      className={`bg-white divide-y divide-neutral-200 dark:bg-neutral-900 dark:divide-neutral-700 ${className}`} 
      {...props}
    >
      {children}
    </tbody>
  );
};

export const TableRow = ({ 
  children, 
  className = '',
  isHoverable = true,
  isSelected = false,
  ...props 
}) => {
  const hoverClass = isHoverable ? 'hover:bg-neutral-50 dark:hover:bg-neutral-800' : '';
  const selectedClass = isSelected ? 'bg-primary-50 dark:bg-primary-900/30' : '';
  
  return (
    <tr 
      className={`transition-colors ${hoverClass} ${selectedClass} ${className}`} 
      {...props}
    >
      {children}
    </tr>
  );
};

export const TableCell = ({ 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <td 
      className={`px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100 ${className}`} 
      {...props}
    >
      {children}
    </td>
  );
};

export const TableHeader = ({ 
  children, 
  className = '',
  isSortable = false,
  isSorted = false,
  sortDirection = null,
  onSort = null,
  ...props 
}) => {
  const sortableClass = isSortable ? 'cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700' : '';
  
  const handleClick = () => {
    if (isSortable && onSort) {
      onSort();
    }
  };
  
  return (
    <th 
      className={`px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider dark:text-neutral-400 ${sortableClass} ${className}`} 
      onClick={handleClick}
      {...props}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        {isSortable && (
          <span className="inline-flex flex-col">
            <svg 
              className={`h-2 w-2 ${sortDirection === 'asc' && isSorted ? 'text-neutral-900 dark:text-white' : 'text-neutral-400'}`} 
              viewBox="0 0 16 16" 
              fill="currentColor"
            >
              <path d="M8 4l4 4H4l4-4z" />
            </svg>
            <svg 
              className={`h-2 w-2 ${sortDirection === 'desc' && isSorted ? 'text-neutral-900 dark:text-white' : 'text-neutral-400'}`} 
              viewBox="0 0 16 16" 
              fill="currentColor"
            >
              <path d="M8 12l4-4H4l4 4z" />
            </svg>
          </span>
        )}
      </div>
    </th>
  );
};

export const TableFooter = ({ 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <tfoot 
      className={`bg-neutral-50 dark:bg-neutral-800 ${className}`} 
      {...props}
    >
      {children}
    </tfoot>
  );
};

export const TablePagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className = '',
  ...props
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  
  return (
    <div 
      className={`flex items-center justify-between px-4 py-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 ${className}`}
      {...props}
    >
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md ${
            currentPage === 1
              ? 'text-neutral-400 bg-neutral-50 cursor-not-allowed dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-500'
              : 'text-neutral-700 bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-700'
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`ml-3 relative inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md ${
            currentPage === totalPages
              ? 'text-neutral-400 bg-neutral-50 cursor-not-allowed dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-500'
              : 'text-neutral-700 bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-700'
          }`}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            Showing page <span className="font-medium">{currentPage}</span> of{' '}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-neutral-300 bg-white text-sm font-medium ${
                currentPage === 1
                  ? 'text-neutral-400 cursor-not-allowed dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-500'
                  : 'text-neutral-500 hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-700'
              }`}
            >
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Page numbers would go here */}
            
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-neutral-300 bg-white text-sm font-medium ${
                currentPage === totalPages
                  ? 'text-neutral-400 cursor-not-allowed dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-500'
                  : 'text-neutral-500 hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-700'
              }`}
            >
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export const TableSkeleton = ({ rows = 5, columns = 4, className = '', ...props }) => {
  return (
    <div className={`space-y-2 ${className}`} {...props}>
      {[...Array(rows)].map((_, i) => (
        <TableRowSkeleton key={i} cols={columns} />
      ))}
    </div>
  );
};

export default Table;

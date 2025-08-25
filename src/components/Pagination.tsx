import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const halfPages = Math.floor(maxPagesToShow / 2);

    if (totalPages <= maxPagesToShow + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (currentPage > halfPages + 2) {
        pageNumbers.push('...');
      }

      let start = Math.max(2, currentPage - halfPages);
      let end = Math.min(totalPages - 1, currentPage + halfPages);

      if (currentPage <= halfPages + 1) {
        end = maxPagesToShow - 1;
      }

      if (currentPage >= totalPages - halfPages) {
        start = totalPages - (maxPagesToShow - 2);
      }
      
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      if (currentPage < totalPages - halfPages - 1) {
        pageNumbers.push('...');
      }
      pageNumbers.push(totalPages);
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex items-center justify-center space-x-2 sm:space-x-4" aria-label="Pagination">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-600 transition-colors hover:bg-gold-50 hover:border-gold-300 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous Page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      
      <div className="flex items-center space-x-1 sm:space-x-2">
        {pageNumbers.map((page, index) => (
          <React.Fragment key={index}>
            {typeof page === 'number' ? (
              <button
                onClick={() => onPageChange(page)}
                className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold transition-all duration-200 ${
                  currentPage === page
                    ? 'bg-gold-600 text-white shadow-lg scale-110'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gold-50 hover:border-gold-300 hover:text-gold-700'
                }`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            ) : (
              <span className="flex items-center justify-center w-10 h-10 text-gray-500">
                {page}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-600 transition-colors hover:bg-gold-50 hover:border-gold-300 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next Page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </nav>
  );
};

export default Pagination;

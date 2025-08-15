import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
  showPreviousNext?: boolean;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  showPreviousNext = true,
  className = "",
}: TPaginationProps) {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Add ellipsis at the beginning if needed
    if (startPage > 1) {
      buttons.push(
        <Button
          key={1}
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(1)}
          className="w-8 h-8 p-0"
        >
          1
        </Button>
      );

      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis-start" className="px-2 text-gray-500">
            ...
          </span>
        );
      }
    }

    // Add page number buttons
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant={i === currentPage ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(i)}
          className="w-8 h-8 p-0"
        >
          {i}
        </Button>
      );
    }

    // Add ellipsis at the end if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis-end" className="px-2 text-gray-500">
            ...
          </span>
        );
      }

      buttons.push(
        <Button
          key={totalPages}
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(totalPages)}
          className="w-8 h-8 p-0"
        >
          {totalPages}
        </Button>
      );
    }

    return buttons;
  };

  // Don't render if there's only one page or no pages
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {showPreviousNext && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
      )}

      <div className="flex items-center gap-2">{renderPaginationButtons()}</div>

      {showPreviousNext && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

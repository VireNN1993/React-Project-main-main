// src/components/Pagination.tsx
import { Button } from "flowbite-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  getPageNumbers: () => (number | string)[];
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  getPageNumbers,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {/* Previous Button */}
      <Button
        color="light"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo;
      </Button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) =>
        typeof page === "number" ? (
          <Button
            key={index}
            color={currentPage === page ? "blue" : "light"}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ) : (
          <span key={index} className="px-2 py-1">
            {page}
          </span>
        ),
      )}

      {/* Next Button */}
      <Button
        color="light"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &raquo;
      </Button>
    </div>
  );
};

export default Pagination;

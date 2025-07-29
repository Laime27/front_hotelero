import { useState } from "react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
  range?: number;
}

export default function Paginacion({
  currentPage,
  lastPage,
  onPageChange,
  range = 3,
}: PaginationProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePageChange = (page: number) => {
    if (page === currentPage || isTransitioning) return;
    setIsTransitioning(true);
    onPageChange(page);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const pageNumbers: number[] = [];
  const start = Math.max(1, currentPage - range);
  const end = Math.min(lastPage, currentPage + range);

  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center my-4 space-x-2 flex-wrap">
      <Button
        variant="outline"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || isTransitioning}
      >
        Anterior
      </Button>

      {pageNumbers.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          onClick={() => handlePageChange(page)}
          disabled={isTransitioning}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === lastPage || isTransitioning}
      >
        Siguiente
      </Button>
    </div>
  );
}

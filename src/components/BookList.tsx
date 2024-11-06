import { BookItem } from "@/components/BookItem";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Book, BookStatus } from "@/types";

type BookListProps = {
  books: Book[];
  onEditBook: (book: Book) => void;
  onDeleteBook: (id: number) => void;
  getStatusText: (status: BookStatus) => string;
  pagination?: {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
  };
};

export const BookList = ({
  books,
  onEditBook,
  onDeleteBook,
  getStatusText,
  pagination,
}: BookListProps) => {
  const renderPaginationItems = () => {
    if (!pagination) return null;

    const { totalPages, currentPage, onPageChange } = pagination;
    const items = [];

    // Previous button
    items.push(
      <PaginationItem key="previous">
        <PaginationPrevious
          aria-disabled={currentPage === 1}
          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        />
      </PaginationItem>
    );

    // First page
    items.push(
      <PaginationItem key={1}>
        <PaginationLink
          onClick={() => onPageChange(1)}
          isActive={currentPage === 1}
          className="cursor-pointer"
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Ellipsis and middle pages
    if (totalPages > 5) {
      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => onPageChange(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    } else {
      for (let i = 2; i < totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => onPageChange(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    // Last page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => onPageChange(totalPages)}
            isActive={currentPage === totalPages}
            className="cursor-pointer"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Next button
    items.push(
      <PaginationItem key="next">
        <PaginationNext
          aria-disabled={currentPage === totalPages}
          className={
            currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"
          }
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
        />
      </PaginationItem>
    );

    return items;
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            onEdit={onEditBook}
            onDelete={onDeleteBook}
            getStatusText={getStatusText}
          />
        ))}
      </div>
      {pagination && (
        <div className="mt-4">
          <Pagination>
            <PaginationContent>{renderPaginationItems()}</PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
};

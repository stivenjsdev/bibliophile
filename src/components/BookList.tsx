import { BookItem } from "@/components/BookItem";
import { Button } from "@/components/ui/button";
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
        <div className="mt-4 flex justify-center">
          {Array.from({ length: pagination.totalPages }, (_, i) => (
            <Button
              key={i}
              variant="outline"
              size="sm"
              className="mx-1"
              onClick={() => pagination.onPageChange(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      )}
    </>
  );
};

import { BookDashboardSkeleton } from "@/components/BookDashboardSkeleton";
import { BookForm } from "@/components/BookForm";
import { BookList } from "@/components/BookList";
import { BookSearch } from "@/components/BookSearch";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useBook } from "@/hooks/useBook";
import { Book, BookFilters, BookStatus } from "@/types";
import debounce from "lodash/debounce";
import { Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function BookDashboard() {
  const { state, fetchBooks, searchBooks, addBook, updateBook, deleteBook } =
    useBook();
  const { books, pagination, loading, error, genres, currentFilters } = state;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [localFilters, setLocalFilters] = useState<BookFilters>(currentFilters);

  useEffect(() => {
    setLocalFilters(currentFilters);
  }, [currentFilters]);

  const debouncedSearch = useMemo(
    () =>
      debounce((filters: BookFilters) => {
        searchBooks(filters);
      }, 600),
    [searchBooks]
  );

  const handleFilterChange = useCallback(
    (key: keyof BookFilters, value: string | number | null) => {
      setLocalFilters((prevFilters) => {
        const newFilters = { ...prevFilters, [key]: value };
        debouncedSearch(newFilters);
        return newFilters;
      });
    },
    [debouncedSearch]
  );

  const handleAddBook = async (newBook: Omit<Book, "id">) => {
    await addBook(newBook);
    setIsDialogOpen(false);
  };

  const handleEditBook = async (
    updatedBook: Omit<Book, "id"> & { id?: number }
  ) => {
    if (updatedBook.id) {
      await updateBook(updatedBook.id, updatedBook);
      setIsDialogOpen(false);
      setEditingBook(null);
    }
  };

  const handleDeleteBook = async (id: number) => {
    await deleteBook(id);
  };

  const getStatusText = (status: BookStatus): string => {
    switch (status) {
      case BookStatus.TO_READ:
        return "Por leer";
      case BookStatus.READING:
        return "Leyendo";
      case BookStatus.READ:
        return "Leído";
      default:
        return "Desconocido";
    }
  };

  const handleEditClick = (book: Book) => {
    setEditingBook(book);
    setIsDialogOpen(true);
  };

  const handleCancelEdit = () => {
    setEditingBook(null);
    setIsDialogOpen(false);
  };

  const handlePageChange = (page: number) => {
    fetchBooks(page, pagination?.limit, localFilters);
  };

  if (loading) return <BookDashboardSkeleton />;

  // Error al cargar los libros
  if (error) return <div>Error: {error}. Por favor recargue la página</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto p-4 flex-grow">
        <BookSearch
          filters={localFilters}
          onFilterChange={handleFilterChange}
          uniqueGenres={genres}
          autoFocus={true}
        />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mb-4">
              <Plus className="mr-2 h-4 w-4" /> Añadir Libro
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingBook ? "Editar Libro" : "Añadir Nuevo Libro"}
              </DialogTitle>
              <DialogDescription>
                {editingBook
                  ? "Modifica los detalles del libro seleccionado."
                  : "Ingresa los detalles del nuevo libro."}
              </DialogDescription>
            </DialogHeader>
            <BookForm
              book={editingBook}
              onSubmit={editingBook ? handleEditBook : handleAddBook}
              onCancel={handleCancelEdit}
            />
          </DialogContent>
        </Dialog>
        <BookList
          books={books}
          onEditBook={handleEditClick}
          onDeleteBook={handleDeleteBook}
          getStatusText={getStatusText}
          pagination={{
            totalPages: pagination?.totalPages || 1,
            currentPage: pagination?.page || 1,
            onPageChange: handlePageChange,
          }}
        />
      </div>
    </div>
  );
}

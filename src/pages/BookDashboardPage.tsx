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
import { Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function BookDashboard() {
  const { state, fetchBooks, searchBooks, addBook, updateBook, deleteBook } =
    useBook();
  const { books, pagination, loading, error } = state;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [filters, setFilters] = useState<BookFilters>({});

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uniqueGenres = useMemo(() => {
    const genres = new Set(books.map((book) => book.genre));
    return Array.from(genres);
  }, [books]);

  const handleSearch = useCallback(() => {
    searchBooks(filters);
  }, [searchBooks, filters]);

  const handleAddBook = useCallback(
    async (newBook: Omit<Book, "id">) => {
      await addBook(newBook);
      setIsDialogOpen(false);
    },
    [addBook]
  );

  const handleEditBook = useCallback(
    async (updatedBook: Omit<Book, "id"> & { id?: number }) => {
      if (updatedBook.id) {
        await updateBook(updatedBook.id, updatedBook);
        setIsDialogOpen(false);
        setEditingBook(null);
      }
    },
    [updateBook]
  );

  const handleDeleteBook = useCallback(
    async (id: number) => {
      await deleteBook(id);
    },
    [deleteBook]
  );

  const handleFilterChange = (
    key: keyof BookFilters,
    value: string | number | null
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const getStatusText = useCallback((status: BookStatus): string => {
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
  }, []);

  const handleEditClick = (book: Book) => {
    setEditingBook(book);
    setIsDialogOpen(true);
  };

  const handleCancelEdit = () => {
    setEditingBook(null);
    setIsDialogOpen(false);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto p-4 flex-grow">
        <BookSearch
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          uniqueGenres={uniqueGenres}
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
            onPageChange: (page) => fetchBooks(page, pagination?.limit),
          }}
        />
      </div>
    </div>
  );
}

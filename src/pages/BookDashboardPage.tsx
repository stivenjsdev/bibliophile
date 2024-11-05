import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBook } from "@/hooks/useBook";
import { Book, BookStatus } from "@/types";
import { Edit, Plus, Search, Star, Trash2 } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";

export default function BookDashboard() {
  const { state, dispatch } = useBook();
  const { books, editingBookId, filter, searchTerm } = state;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [genreFilter, setGenreFilter] = useState<string | null>(null);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatusFilter = filter === null || book.status === filter;
      const matchesGenreFilter =
        genreFilter === null || book.genre === genreFilter;
      return matchesSearch && matchesStatusFilter && matchesGenreFilter;
    });
  }, [books, searchTerm, filter, genreFilter]);

  const handleAddBook = useCallback(
    (newBook: Omit<Book, "id">) => {
      const bookWithId = { ...newBook, id: Date.now() };
      dispatch({ type: "ADD_BOOK", payload: { newBook: bookWithId } });
      setIsDialogOpen(false);
    },
    [dispatch]
  );

  const handleEditBook = useCallback(
    (updatedBook: Book) => {
      dispatch({ type: "EDIT_BOOK", payload: { updatedBook } });
      setIsDialogOpen(false);
    },
    [dispatch]
  );

  const handleDeleteBook = (id: number) => {
    dispatch({ type: "DELETE_BOOK", payload: { id } });
  };

  const uniqueGenres = useMemo(
    () => Array.from(new Set(books.map((book) => book.genre))),
    [books]
  );

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_SEARCH", payload: { searchTerm: e.target.value } });
  };

  const handleStatusFilterChange = (value: string) => {
    dispatch({
      type: "SET_FILTER",
      payload: {
        filter: value === "all" ? null : (Number(value) as BookStatus),
      },
    });
  };

  const handleGenreFilterChange = (value: string) => {
    setGenreFilter(value === "all" ? null : value);
  };

  const handleEditClick = (id: number) => {
    dispatch({ type: "SET_EDITING_BOOK", payload: { id } });
    setIsDialogOpen(true);
  };

  const handleCancelEdit = () => {
    dispatch({ type: "SET_EDITING_BOOK", payload: { id: null } });
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto p-4 flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 w-full md:w-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Buscar por título o autor..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-8"
            />
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
            <Select
              value={filter !== null ? filter.toString() : "all"}
              onValueChange={handleStatusFilterChange}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value={BookStatus.TO_READ.toString()}>
                  Por leer
                </SelectItem>
                <SelectItem value={BookStatus.READING.toString()}>
                  Leyendo
                </SelectItem>
                <SelectItem value={BookStatus.READ.toString()}>
                  Leído
                </SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={genreFilter || "all"}
              onValueChange={handleGenreFilterChange}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filtrar por género" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los géneros</SelectItem>
                {uniqueGenres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full md:w-auto">
                <Plus className="mr-2 h-4 w-4" /> Añadir Libro
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {editingBookId !== null
                    ? "Editar Libro"
                    : "Añadir Nuevo Libro"}
                </DialogTitle>
                <DialogDescription>
                  {editingBookId !== null
                    ? "Modifica los detalles del libro seleccionado."
                    : "Ingresa los detalles del nuevo libro."}
                </DialogDescription>
              </DialogHeader>
              <BookForm
                book={
                  editingBookId !== null
                    ? books.find((b) => b.id === editingBookId) || null
                    : null
                }
                onSubmit={
                  editingBookId !== null ? handleEditBook : handleAddBook
                }
                onCancel={handleCancelEdit}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBooks.map((book) => (
            <Card key={book.id}>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-primary mb-2">
                  {book.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Autor:</strong> {book.author}
                </p>
                <p>
                  <strong>Género:</strong> {book.genre}
                </p>
                <p>
                  <strong>Estado:</strong> {getStatusText(book.status)}
                </p>
                <div className="flex items-center">
                  <strong className="mr-2">Valoración:</strong>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= book.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditClick(book.id)}
                  >
                    <Edit className="mr-2 h-4 w-4" /> Editar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteBook(book.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

type BookFormProps = {
  book: Book | null;
  onSubmit: (book: Book) => void;
  onCancel: () => void;
};

const BookForm = React.memo(({ book, onSubmit, onCancel }: BookFormProps) => {
  const [title, setTitle] = useState(book?.title || "");
  const [author, setAuthor] = useState(book?.author || "");
  const [genre, setGenre] = useState(book?.genre || "");
  const [status, setStatus] = useState<BookStatus>(
    book?.status || BookStatus.TO_READ
  );
  const [rating, setRating] = useState(book?.rating || 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBook: Book = {
      id: book?.id || Date.now(),
      title,
      author,
      genre,
      status,
      rating,
    };
    onSubmit(newBook);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="author">Autor</Label>
        <Input
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="genre">Género</Label>
        <Input
          id="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="status">Estado</Label>
        <Select
          value={status.toString()}
          onValueChange={(value) => setStatus(Number(value) as BookStatus)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={BookStatus.TO_READ.toString()}>
              Por leer
            </SelectItem>
            <SelectItem value={BookStatus.READING.toString()}>
              Leyendo
            </SelectItem>
            <SelectItem value={BookStatus.READ.toString()}>Leído</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="rating">Valoración</Label>
        <Select
          value={rating.toString()}
          onValueChange={(value) => setRating(Number(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar valoración" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map((value) => (
              <SelectItem key={value} value={value.toString()}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">{book ? "Actualizar" : "Añadir"}</Button>
      </div>
    </form>
  );
});

BookForm.displayName = "BookForm";

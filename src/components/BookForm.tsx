import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Book, BookStatus } from "@/types";
import React, { useState } from "react";

type BookFormProps = {
  book: Book | null;
  onSubmit: (book: Omit<Book, "id"> & { id?: number }) => void;
  onCancel: () => void;
};

export const BookForm = React.memo(
  ({ book, onSubmit, onCancel }: BookFormProps) => {
    const [title, setTitle] = useState(book?.title || "");
    const [author, setAuthor] = useState(book?.author || "");
    const [genre, setGenre] = useState(book?.genre || "");
    const [status, setStatus] = useState<BookStatus>(
      book?.status || BookStatus.TO_READ
    );
    const [rating, setRating] = useState(book?.rating || 1);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newBook = {
        ...(book ? { id: book.id } : {}),
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
  }
);

BookForm.displayName = "BookForm";

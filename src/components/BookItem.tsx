import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, BookStatus } from "@/types";
import { Edit, Star, Trash2 } from "lucide-react";

type BookItemProps = {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
  getStatusText: (status: BookStatus) => string;
};

export const BookItem = ({
  book,
  onEdit,
  onDelete,
  getStatusText,
}: BookItemProps) => {
  return (
    <Card>
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
          <Button variant="outline" size="sm" onClick={() => onEdit(book)}>
            <Edit className="mr-2 h-4 w-4" /> Editar
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(book.id)}
          >
            <Trash2 className="mr-2 h-4 w-4" /> Eliminar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

import { Book, BookFilters } from "@/types";
import { createContext, Dispatch } from "react";
import { BookActions, BookState } from "../reducers/bookReducer";

type BookContextType = {
  state: BookState;
  dispatch: Dispatch<BookActions>;
  fetchBooks: (page?: number, limit?: number) => Promise<void>;
  searchBooks: (
    filters: BookFilters,
    page?: number,
    limit?: number
  ) => Promise<void>;
  addBook: (book: Omit<Book, "id">) => Promise<void>;
  updateBook: (id: number, book: Partial<Book>) => Promise<void>;
  deleteBook: (id: number) => Promise<void>;
};

export const BookContext = createContext<BookContextType>(null!);

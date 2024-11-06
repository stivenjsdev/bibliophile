import { BookContext } from "@/context/BookContext";
import { useAuth } from "@/hooks/useAuth";
import bookService from "@/services/bookService";
import { ReactNode, useEffect, useReducer } from "react";
import { bookReducer, initialState } from "../reducers/bookReducer";
import { Book, BookFilters } from "../types";

type BookContextProviderProps = {
  children: ReactNode;
};

export const BookProvider = ({ children }: BookContextProviderProps) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);
  const { user } = useAuth();

  const fetchBooks = async (
    page: number = 1,
    limit: number = 6,
    filters: BookFilters = {}
  ) => {
    dispatch({ type: "FETCH_BOOKS_START" });
    try {
      const response = await bookService.searchBooks(filters, page, limit);
      dispatch({ type: "FETCH_BOOKS_SUCCESS", payload: response });
    } catch (error) {
      dispatch({
        type: "FETCH_BOOKS_ERROR",
        payload:
          error instanceof Error
            ? error.message
            : "An unknown error occurred while fetching books",
      });
    }
  };

  const searchBooks = async (
    filters: BookFilters,
    page: number = 1,
    limit: number = 6
  ) => {
    dispatch({ type: "UPDATE_FILTERS", payload: filters });
    await fetchBooks(page, limit, filters);
  };

  const addBook = async (book: Omit<Book, "id">) => {
    try {
      const newBook = await bookService.createBook(book);
      dispatch({ type: "ADD_BOOK", payload: newBook });
    } catch (error) {
      dispatch({
        type: "FETCH_BOOKS_ERROR",
        payload:
          error instanceof Error
            ? error.message
            : "An unknown error occurred while adding a book",
      });
    }
  };

  const updateBook = async (id: number, book: Partial<Book>) => {
    try {
      const updatedBook = await bookService.updateBook(id, book);
      dispatch({ type: "UPDATE_BOOK", payload: updatedBook });
    } catch (error) {
      dispatch({
        type: "FETCH_BOOKS_ERROR",
        payload:
          error instanceof Error
            ? error.message
            : "An unknown error occurred while updating a book",
      });
    }
  };

  const deleteBook = async (id: number) => {
    try {
      await bookService.deleteBook(id);
      dispatch({ type: "DELETE_BOOK", payload: id });
    } catch (error) {
      dispatch({
        type: "FETCH_BOOKS_ERROR",
        payload:
          error instanceof Error
            ? error.message
            : "An unknown error occurred while deleting a book",
      });
    }
  };

  const fetchGenres = async () => {
    try {
      const genreList = await bookService.getAllGenres();
      dispatch({ type: "FETCH_GENRES_SUCCESS", payload: genreList });
    } catch (error) {
      console.error("Error fetching genres:", error);
      dispatch({
        type: "FETCH_BOOKS_ERROR",
        payload: "Error al obtener los géneros",
      });
    }
  };

  useEffect(() => {
    if (user) {
      fetchBooks(1, 6, state.currentFilters);
      fetchGenres();
    } else {
      dispatch({
        type: "FETCH_BOOKS_SUCCESS",
        payload: {
          books: [],
          pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
        },
      });
      dispatch({ type: "FETCH_GENRES_SUCCESS", payload: [] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <BookContext.Provider
      value={{
        state,
        dispatch,
        fetchBooks,
        searchBooks,
        addBook,
        updateBook,
        deleteBook,
        fetchGenres,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

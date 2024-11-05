import { Book, PaginationData } from "../types";

export interface BookState {
  books: Book[];
  pagination: PaginationData;
  loading: boolean;
  error: string | null;
}

export type BookActions =
  | { type: "FETCH_BOOKS_START" }
  | {
      type: "FETCH_BOOKS_SUCCESS";
      payload: { books: Book[]; pagination: PaginationData };
    }
  | { type: "FETCH_BOOKS_ERROR"; payload: string }
  | { type: "ADD_BOOK"; payload: Book }
  | { type: "UPDATE_BOOK"; payload: Book }
  | { type: "DELETE_BOOK"; payload: number };

export const initialState: BookState = {
  books: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  loading: false,
  error: null,
};

export const bookReducer = (
  state: BookState,
  action: BookActions
): BookState => {
  if (action.type === "FETCH_BOOKS_START") {
    return { ...state, loading: true, error: null };
  }

  if (action.type === "FETCH_BOOKS_SUCCESS") {
    return {
      ...state,
      loading: false,
      books: action.payload.books,
      pagination: action.payload.pagination,
      error: null,
    };
  }

  if (action.type === "FETCH_BOOKS_ERROR") {
    return { ...state, loading: false, error: action.payload };
  }

  if (action.type === "ADD_BOOK") {
    return { ...state, books: [action.payload, ...state.books] };
  }

  if (action.type === "UPDATE_BOOK") {
    return {
      ...state,
      books: state.books.map((book) =>
        book.id === action.payload.id ? action.payload : book
      ),
    };
  }

  if (action.type === "DELETE_BOOK") {
    return {
      ...state,
      books: state.books.filter((book) => book.id !== action.payload),
    };
  }

  return state;
};

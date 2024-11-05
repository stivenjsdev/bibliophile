import { Book, BookStatus } from "../types/index";

export type BookActions =
  | { type: "ADD_BOOK"; payload: { newBook: Book } }
  | { type: "EDIT_BOOK"; payload: { updatedBook: Book } }
  | { type: "DELETE_BOOK"; payload: { id: Book["id"] } }
  | { type: "SET_EDITING_BOOK"; payload: { id: Book["id"] | null } }
  | { type: "SET_FILTER"; payload: { filter: BookStatus | null } }
  | { type: "SET_SEARCH"; payload: { searchTerm: string } };

export type BookState = {
  books: Book[];
  editingBookId: Book["id"] | null;
  filter: BookStatus | null;
  searchTerm: string;
};

const localStorageBooks = (): Book[] => {
  const books = localStorage.getItem("books");
  return books ? JSON.parse(books) : [];
};

export const initialState: BookState = {
  books: localStorageBooks(),
  editingBookId: null,
  filter: null,
  searchTerm: "",
};

export const bookReducer = (
  state: BookState = initialState,
  action: BookActions
): BookState => {
  if (action.type === "ADD_BOOK") {
    return {
      ...state,
      books: [...state.books, action.payload.newBook],
    };
  }

  if (action.type === "EDIT_BOOK") {
    return {
      ...state,
      books: state.books.map((book) =>
        book.id === action.payload.updatedBook.id
          ? action.payload.updatedBook
          : book
      ),
      editingBookId: null,
    };
  }

  if (action.type === "DELETE_BOOK") {
    return {
      ...state,
      books: state.books.filter((book) => book.id !== action.payload.id),
    };
  }

  if (action.type === "SET_EDITING_BOOK") {
    return {
      ...state,
      editingBookId: action.payload.id,
    };
  }

  if (action.type === "SET_FILTER") {
    return {
      ...state,
      filter: action.payload.filter,
    };
  }

  if (action.type === "SET_SEARCH") {
    return {
      ...state,
      searchTerm: action.payload.searchTerm,
    };
  }

  return state;
};

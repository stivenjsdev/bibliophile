import {
  createContext,
  Dispatch
} from "react";
import {
  BookActions,
  BookState
} from "../reducers/bookReducer";

type BookContextType = {
  state: BookState;
  dispatch: Dispatch<BookActions>;
};

export const BookContext = createContext<BookContextType>(null!);


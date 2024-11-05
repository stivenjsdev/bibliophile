import { BookContext } from "@/context/BookContext";
import { ReactNode, useEffect, useReducer } from "react";
import { bookReducer, initialState } from "../reducers/bookReducer";

type BookContextProviderProps = {
  children: ReactNode;
};

export const BookProvider = ({ children }: BookContextProviderProps) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(state.books));
  }, [state.books]);

  return (
    <BookContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

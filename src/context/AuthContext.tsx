import { AuthActions, AuthState } from "@/reducers/authReducer";
import { createContext, Dispatch } from "react";

type AuthContextType = {
  state: AuthState;
  dispatch: Dispatch<AuthActions>;
  login: (phone: string, password: string) => Promise<void>;
  register: (name: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>(null!);

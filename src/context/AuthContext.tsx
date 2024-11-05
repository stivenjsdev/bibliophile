import { User } from "@/types";
import { createContext } from "react";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (phone: string, password: string) => Promise<void>;
  register: (name: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>(null!);

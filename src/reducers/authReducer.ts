import { User } from "@/types";

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export type AuthActions =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_ERROR"; payload: string }
  | { type: "LOGOUT" };

export const initialAuthState: AuthState = {
  user: null,
  loading: true,
  error: null,
};

export const authReducer = (
  state: AuthState,
  action: AuthActions
): AuthState => {
  if (action.type === "LOGIN_START") {
    return { ...state, loading: true, error: null };
  }
  if (action.type === "LOGIN_SUCCESS") {
    return { ...state, loading: false, user: action.payload };
  }
  if (action.type === "LOGIN_ERROR") {
    return { ...state, loading: false, error: action.payload };
  }
  if (action.type === "LOGOUT") {
    return { ...state, user: null, loading: false, error: null };
  }
  return state;
};

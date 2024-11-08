// AuthProvider.tsx
import { AuthContext } from "@/context/AuthContext";
import { authReducer, initialAuthState } from "@/reducers/authReducer";
import axios from "axios";
import { ReactNode, useEffect, useReducer } from "react";

const API_URL = import.meta.env.VITE_API_BASE_URL;

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch({ type: "LOGIN_START" });
        try {
          const response = await axios.get(`${API_URL}/auth/validate`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch({ type: "LOGIN_SUCCESS", payload: response.data.user });
        } catch (error) {
          console.error("Error validating token:", error);
          localStorage.removeItem("token");
          dispatch({
            type: "LOGIN_ERROR",
            payload: "Token invalid or expired",
          });
        }
      }
    };

    validateToken();
  }, []);

  const login = async (phone: string, password: string) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        phone,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
    } catch (error) {
      console.error("Error logging in:", error);
      dispatch({ type: "LOGIN_ERROR", payload: "Error logging in" });
    }
  };

  const register = async (name: string, phone: string, password: string) => {
    try {
      await axios.post(`${API_URL}/auth/register`, { name, phone, password });
      // Después del registro exitoso, iniciamos sesión con las credenciales proporcionadas
      await login(phone, password);
    } catch (error) {
      console.error("Error registering:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

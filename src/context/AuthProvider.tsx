// AuthProvider.tsx
import { AuthContext } from "@/context/AuthContext";
import { authReducer, initialAuthState } from "@/reducers/authReducer";
import authService from "@/services/authService";
import { ReactNode, useEffect, useReducer } from "react";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  // useEffect para validar el token al cargar el proveedor
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch({ type: "LOGIN_START" });
        try {
          const user = await authService.validateToken(token);
          dispatch({ type: "LOGIN_SUCCESS", payload: user });
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
      const { token, user } = await authService.login(phone, password);
      localStorage.setItem("token", token);
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
    } catch (error) {
      console.error("Error logging in:", error);
      dispatch({ type: "LOGIN_ERROR", payload: "Error logging in" });
    }
  };

  const register = async (name: string, phone: string, password: string) => {
    try {
      await authService.register(name, phone, password);
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

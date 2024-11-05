import { AuthContext } from "@/context/AuthContext";
import { User } from "@/types";
import axios from "axios";
import { ReactNode, useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_BASE_URL;

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(`${API_URL}/auth/validate`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.data.user) {
            setUser(response.data.user);
          }
        } catch (error) {
          console.error("Error validating token:", error);
          localStorage.removeItem("token");
        }
      }
    };

    validateToken();
  }, []);

  const login = async (phone: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        phone,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);

      // Validar el token para obtener los datos del usuario
      const userResponse = await axios.get(`${API_URL}/auth/validate`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(userResponse.data.user);
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
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
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

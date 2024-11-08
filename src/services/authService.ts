import { User } from "@/types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const authService = {
  login: async (
    phone: string,
    password: string
  ): Promise<{ token: string; user: User }> => {
    const response = await axios.post(`${API_URL}/auth/login`, {
      phone,
      password,
    });
    return response.data;
  },

  register: async (
    name: string,
    phone: string,
    password: string
  ): Promise<void> => {
    await axios.post(`${API_URL}/auth/register`, { name, phone, password });
  },

  validateToken: async (token: string): Promise<User> => {
    const response = await axios.get(`${API_URL}/auth/validate`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.user;
  },
};

export default authService;

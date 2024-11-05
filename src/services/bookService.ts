import axios from "axios";
import { Book, BookFilters, PaginationData } from "../types";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const bookService = {
  getAllBooks: async (
    page: number = 1,
    limit: number = 6
  ): Promise<{ books: Book[]; pagination: PaginationData }> => {
    const response = await axios.get(`${API_URL}/api/books`, {
      params: { page, limit },
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  },

  searchBooks: async (
    filters: BookFilters,
    page: number = 1,
    limit: number = 6
  ): Promise<{ books: Book[]; pagination: PaginationData }> => {
    const response = await axios.get(`${API_URL}/api/books/search`, {
      params: { ...filters, page, limit },
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  },

  createBook: async (bookData: Omit<Book, "id">): Promise<Book> => {
    const response = await axios.post(`${API_URL}/api/books`, bookData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  },

  updateBook: async (id: number, bookData: Partial<Book>): Promise<Book> => {
    const response = await axios.put(`${API_URL}/api/books/${id}`, bookData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  },

  getBookById: async (id: number): Promise<Book> => {
    const response = await axios.get(`${API_URL}/api/books/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  },

  deleteBook: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/api/books/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  },

  getAllGenres: async (): Promise<string[]> => {
    const response = await axios.get(`${API_URL}/api/books/genres`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  },
};

export default bookService;

export enum BookStatus {
  TO_READ = 0,
  READING = 1,
  READ = 2,
}

export type Book = {
  id: number;
  title: string;
  author: string;
  genre: string;
  status: BookStatus;
  rating: number;
};

export type User = {
  id: number;
  name: string;
  phone: string;
};

export interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface BookFilters {
  title?: string;
  author?: string;
  genre?: string;
  status?: BookStatus;
  rating?: number;
}

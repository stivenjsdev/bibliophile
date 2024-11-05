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

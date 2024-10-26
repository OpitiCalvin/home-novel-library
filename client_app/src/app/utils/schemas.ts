export type Author = {
  id: number;
  name: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
};
export type Genre = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Book = {
  id: number;
  title: string;
  author_id: number;
  genre_id: number;
  published_year: number;
  isbn: string;
  description: string;
  availability_status: string;
  read_status: string;
  createdAt: string;
  updatedAt: string;
  genre: Genre;
  author: Author;
};
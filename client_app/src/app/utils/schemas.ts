export type Author = {
  id: number;
  name: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
};
export interface NewAuthor {
  name: string;
  bio: string;
};
export type Genre = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export interface NewGenre {
  name: string;
};

export type Book = {
  id: number;
  title: string;
  authorId: number;
  publishedYear: number;
  isbn: string;
  description: string;
  availabilityStatus: string;
  readStatus: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
  // genre: Genre;
};

export interface NewBook {
  title: string;
  authorId: number;
  publishedYear: number;
  isbn: string;
  description: string;
  availabilityStatus: string;
  readStatus: string;
  author: Author;
  // genre: Genre;
  // genreId: number;
};
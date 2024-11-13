export interface IAuthorAndBooksResponse {
  id: number;
  name: string;
  bio: string;
  books: IBook[]
};
export interface IAuthor {
  name: string;
  bio: string;
};
export interface IAuthorResponse {
  id: number;
  name: string;
  bio: string;
};
export interface IGenreResponse {
  id: number;
  name: string;
};

export interface IGenre {
  name: string;
};

export interface IBookResponse {
  id: number;
  title: string;
  authorId: number;
  publishedYear: number;
  isbn: string;
  description: string;
  availabilityStatus: string;
  readStatus: string;
  author: IAuthor;
  bookImages:IBookImageResponse[]
  // genre: IGenre;
};

export interface IBook {
  title: string;
  authorId: number;
  publishedYear: number;
  isbn: string;
  description: string;
  availabilityStatus: string;
  readStatus: string;
  // author: IAuthor;
  // genre: IGenre;
  // genreId: number;
};

export interface IBookImageResponse {
  id: number;
  filename: string;
  filepath: string;
  mimetype: string;
  size: string;
  encoding: string;
  bookId: number;
}
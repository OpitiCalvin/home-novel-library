export interface IAuthorAndBooksResponse {
  id: number;
  name: string;
  bio: string;
  books: IBookResponse[]
};
export interface IAuthor {
  name: string;
  bio: string;
};
export interface IAuthorResponse {
  id: number;
  name: string;
  bio: string;
  books:IBookResponse[]
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
  publishedYear: number;
  isbn: string;
  description: string;
  availabilityStatus: string;
  readStatus: string;
  authorId: number;
  author?: IAuthor;
};

export interface IBookAndAuthorResponse {
  id: number;
  title: string;
  publishedYear: number;
  isbn: string;
  description: string;
  availabilityStatus: string;
  readStatus: string;
  authorId: number;
  author: IAuthor;
  // bookImages:IBookImageResponse[]
  // genre: IGenre;
};

export interface IBook {
  title: string;
  publishedYear: number;
  isbn: string;
  description: string;
  availabilityStatus: string;
  readStatus: string;
  authorId: number;
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
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
  category: string;
  description: string;
};
export interface IGenreAndBooksResponse {
  id: number;
  name: string;
  category: string;
  description: string;
  books: IBookResponse[]
};

export interface IGenre {
  name: string;
  category: string;
  description: string;
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
};

export interface IBookAuthorGenreResponse {
  id: number;
  title: string;
  publishedYear: number;
  isbn: string;
  description: string;
  availabilityStatus: string;
  readStatus: string;
  authorId: number;
  author: IAuthor;
  genres: IGenreResponse[];
};


export interface IBook {
  title: string;
  publishedYear: number;
  isbn: string;
  description: string;
  availabilityStatus: string;
  readStatus: string;
  authorId: number;
  genres: number[];
  // author: IAuthor;
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
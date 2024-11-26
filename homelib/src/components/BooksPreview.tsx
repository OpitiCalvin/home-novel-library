import React from "react";
import { IBookAuthorGenreResponse } from "@/lib/schemas";
import BookCard from "./BookCard";
import { getAllBooks } from "@/lib/fetchers/books";

const BooksPreview = async () => {
  const books: IBookAuthorGenreResponse[] = await getAllBooks();
  return (
    <>
      {books && books.length > 0 &&
        books.map((book) => <BookCard key={book.id} book={book} />)}
    </>
  );
};

export default BooksPreview;

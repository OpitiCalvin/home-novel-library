import React from "react";
import { IBookResponse } from "@/lib/schemas";
import BookCard from "./BookCard";
import { getAllBooks } from "@/lib/fetchers/books";

const BooksPreview = async () => {
  const books: IBookResponse[] = await getAllBooks();
  return (
    <>
      {books.length > 0 &&
        books.map((book) => <BookCard key={book.id} book={book} />)}
    </>
  );
};

export default BooksPreview;

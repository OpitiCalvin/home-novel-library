import React from "react";
import { IBookResponse } from "../utils/schemas";
import BookCard from "./BookCard";
import { getAllBooks } from "@/api/books";

const BookPreview = async () => {
  const books: IBookResponse[] = await getAllBooks();
  return (
    <>
      {books.length > 0 && books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </>
  );
};

export default BookPreview;

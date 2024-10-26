import React from 'react';
import { Book } from '../utils/schemas';
import BookCard from './BookCard';

const BookPreview = async () => {
  let data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`);
  let apiBooks = await data.json();
  const books: Book[] = apiBooks["books"];
  return (
    <div className="max-w-2xl mx-auto">      
      {books.map((book, index) => (
        <BookCard index={index} book={book} />
      ))}
    </div>
  );
}

export default BookPreview
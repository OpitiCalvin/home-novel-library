import React from "react";
import Head from "next/head";

type Book = {
  title: string;
  author: string;
  genre: string;
  year: number;
};

const Library: React.FC = () => {
  const books: Book[] = [
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Classics",
      year: 1925,
    },
    { title: "1984", author: "George Orwell", genre: "Dystopian", year: 1949 },
    {
      title: "Moby Dick",
      author: "Herman Melville",
      genre: "Adventure",
      year: 1851,
    },
  ];
  return (
    <>
      <Head>
        <title>My Library</title>
        <meta name="description" content="Explore my library collection" />
        <link rel="icon" href="../favicon.ico" />
      </Head>

      <main className="flex flex-col items-center min-h-screen bg-gray-50 py-10 px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">My Library</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {books.map((book, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-md p-4 text-center"
            >
              <h2 className="text-2xl font-semibold text-gray-800">
                {book.title}
              </h2>
              <p className="text-lg text-gray-600">{book.author}</p>
              <p className="text-sm text-gray-500">
                {book.genre}, {book.year}
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Library;

import React from "react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Book } from "../utils/schemas";


const Library: React.FC = async () => {
  // let data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`);
  let data = await fetch("https://testappb.opititechgeolabs.com/api/books");
  let apiBooks = await data.json();
  const books: Book[] = apiBooks["books"];

  return (
    <>
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">
        My Library
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {books.map((book, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-md p-4 text-center"
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              {book.title}
            </h2>
            <p className="text-lg text-gray-600">{book.author.name}</p>
            <p className="text-sm text-gray-500">
              {book.genre.name}, {book.published_year}
            </p>
            <hr className="my-2" />
            <div>
              <Link href={`/books/${book.id}`}>
                More Info <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Library;

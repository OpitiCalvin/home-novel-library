import React, { FunctionComponent } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { IBookResponse } from "@/lib/schemas";

type Props = {
  book: IBookResponse;
};
const BookCardMinimal: FunctionComponent<Props> = ({ book }) => {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/4 p-4 bg-white shadow-md border border-gray-200 rounded-lg mb-2 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-5 text-center">
        <a href="#">
          <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
            {book.title}
          </h5>
        </a>
        <p className="text-lg text-gray-600">{book.author?.name}</p>
        <p className="text-sm text-gray-500">{book.publishedYear}</p>
        <hr className="my-2" />
        <Link
          href={`/books/${book.id}`}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          more info <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default BookCardMinimal;

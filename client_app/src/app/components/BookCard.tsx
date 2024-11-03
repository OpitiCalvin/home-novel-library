import React, { FunctionComponent } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Book } from "../utils/schemas";

type Props = {
  book: Book
}
const BookCard: FunctionComponent<Props> = ({book}) => {
  return (
    <div
      className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700"
    >
      <a href="#">
        <Image
          className="rounded-t-lg"
          src="https://flowbite.com/docs/images/blog/image-1.jpg"
          alt=""
          width={200}
          height={200}
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
            {book.title}
          </h5>
        </a>
        <p className="text-lg text-gray-600">{book.author.name}</p>
        <p className="text-sm text-gray-500">
          {/* {book.genre.name},  */}
          {book.publishedYear}
        </p>
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

export default BookCard;

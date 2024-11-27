"use client";

import React, { FunctionComponent } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  IBookImageResponse,
  IBookResponse,
  IBookAuthorGenreResponse,
} from "@/lib/schemas";
import useSWR from "swr";
import { fetcher } from "@/lib/apiFetcher";

type Props = {
  book: IBookResponse | IBookAuthorGenreResponse;
};
const BookCard: FunctionComponent<Props> = ({ book }) => {
  // fetch for book's associated images
  const { data, error, isLoading } = useSWR(`books/${book.id}/images`, fetcher);
  if (error) return <div>Failed to Load.</div>;
  if (isLoading) return <div>Loading books and cover images...</div>;
  if (data) {
    // list out genres
    let bookGenres!: string[];
    if (book?.genres && book?.genres.length > 0) {
      bookGenres = book?.genres.map((genre) => genre.name);
    }
    const bookImages: IBookImageResponse[] = data["images"];
    const randBookId: number =
      bookImages?.length > 1
        ? Math.floor(Math.random() * bookImages.length)
        : 0;
    return (
      <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
        {bookImages?.length >= 1 ? (
          <a href={`/books/${book.id}`}>
            <Image
              className="rounded-t-lg"
              src={`/${bookImages[randBookId].filepath}`}
              alt="Image of the novel"
              height="0"
              width={382}
              // className="w-auto h-auto"
            />
          </a>
        ) : (
          <a href={`/books/${book.id}`}>
            <Image
              className="rounded-t-lg"
              src="/unavailableCoverImage.jpeg"
              alt="Placeholder Image"
              height="0"
              width={382}
              // className="w-auto h-auto"
            />
          </a>
        )}
        <div className="p-5 text-center">
          <a href="#">
            <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
              {book.title}
            </h5>
          </a>
          <p className="text-lg text-gray-600">{book.author?.name}</p>
          <p className="text-sm text-gray-500">{book.publishedYear}</p>
          <hr className="my-2" />
          {bookGenres?.length > 0 && (
            <>
              <p className="text-sm text-gray-500">{bookGenres?.join(", ")}</p>
              <hr className="my-2" />
            </>
          )}
          <Link
            href={`/books/${book.id}`}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            more info <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </Link>
        </div>
      </div>
    );
  }
};

export default BookCard;

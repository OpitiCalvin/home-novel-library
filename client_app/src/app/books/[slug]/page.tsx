"use client";

import React from "react";
import { IBookImageResponse, IBookResponse } from "@/app/utils/schemas";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/api/apiFetcher";
import Image from "next/image";

const Page: React.FC = () => {
  const params = useParams();
  const bookId = params?.slug;

  const { data, error, isLoading } = useSWR(`books/${bookId}`, fetcher);
  if (isLoading) return <div> Loading...</div>;
  if (error) return <div>Failed to load.</div>;
  if (data) {
    const book: IBookResponse = data["book"];
    const bookImages: IBookImageResponse[] = book["bookImages"];
    const randBookId: number =
      bookImages.length > 1 ? Math.floor(Math.random() * bookImages.length) : 0;

    return (
      <section className="grid place-items-center">
        <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
          {bookImages.length >= 1 ? (
            <a href="#">
              <Image
                className="rounded-t-lg"
                src={`${process.env.NEXT_PUBLIC_API_URL}/${bookImages[randBookId].filepath}`}
                alt="Image of the novel"
                height="0"
                width={382}
                // className="w-auto h-auto"
              />
            </a>
          ) : (
            <a href="#">
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
          <div className="text-center p-5">
            <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
              {book.title}
            </h5>
            <p className="text-lg text-gray-600">{book.author.name}</p>
            <hr className="my-2" />
            <p className="text-sm text-gray-500">Year: {book.publishedYear}</p>
            <p className="text-sm text-gray-500">ISBN: {book.isbn}</p>
            <hr className="my-2" />
            <p className="text-sm text-gray-500">{book.description}</p>
          </div>
        </div>
      </section>
    );
  }
};

export default Page;

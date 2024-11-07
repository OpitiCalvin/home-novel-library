"use client";

import React from "react";
import { Book } from "@/app/utils/schemas";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/api/apiFetcher";
import Image from "next/image";

const Page: React.FC = () => {
  const params = useParams();
  const bookId = params?.slug;

  const {data, error, isLoading} = useSWR(`books/${bookId}`, fetcher)
  if (isLoading) return <div> Loading...</div>
  if (error) return <div>Failed to load.</div>
  if (data) {
    const book:Book = data["book"];
    
    return (
      <section className="grid place-items-center">
        <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">
          {book?.title}
        </h1>
        <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <Image
              className="rounded-t-lg"
              src="https://flowbite.com/docs/images/blog/image-1.jpg"
              alt=""
              width={200}
              height={200}
            />
          </a>
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

"use client";

import React from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/apiFetcher";
import { IGenreAndBooksResponse } from "@/lib/schemas";
import BookCardMinimal from "@/components/BookCardMinimal";

const Page: React.FC = () => {
  const params = useParams();
  const genreId = params?.slug;

  const { data, error, isLoading } = useSWR(`genres/${genreId}/books`, fetcher);
  if (isLoading) return <div> Loading...</div>;
  if (error) return <div>Failed to load.</div>;
  if (data) {
    const genre: IGenreAndBooksResponse = data["genre"];

    return (
      <>
        <section className="grid place-items-center">
          <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">
            {genre?.name}
          </h1>
          <div className="bg-white shadow-md rounded-md p-4 text-center">
            <p className="text-sm text-gray-500">{genre?.description}</p>
            <p className="text-xm text-gray-400">{genre?.category}</p>
          </div>
        </section>
        {genre.books.length > 0 && (
          <section className="grid place-items-center py-4">
            <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">
              Books
            </h1>
            {/* Author's Published Books */}
            {genre.books.map((book, index) => (
              <BookCardMinimal key={index} book={book} />
            ))}
          </section>
        )}
      </>
    );
  }
};

export default Page;

"use client";

import { fetcher } from "@/api/apiFetcher";
import BookCard from "@/app/components/BookCard";
import { IAuthorAndBooksResponse } from "@/app/utils/schemas";
import { useParams } from "next/navigation";
import React from "react";
import useSWR from "swr";

const SingleAuthor: React.FC = () => {
  const params = useParams();
  const authorId = params?.slug;

  const { data, error, isLoading } = useSWR(`/authors/${authorId}/books`, fetcher);
  if (isLoading) return <div> Loading...</div>;
  if (error) return <div>Failed to load.</div>;
  if (data) {
    const author: IAuthorAndBooksResponse = data["author"];

    return (
      <>
        <section className="grid place-items-center">
          <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">
            {author?.name}
          </h1>
          <div className="bg-white shadow-md rounded-md p-4 text-center">
            <p className="text-sm text-gray-500">{author?.bio}</p>
          </div>
        </section>
        {author.books.length > 0 && (
          <section className="grid place-items-center py-4">
            <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">
              Pubished Books
            </h1>
            {/* Author's Published Books */}
            {author.books.map((book, index) => (
            <BookCard key={index} book={book} />
            ))}
          </section>
        )}
      </>
    );
  }
};

export default SingleAuthor;

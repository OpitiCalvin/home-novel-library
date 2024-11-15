"use client";

import React from "react";
import { IBookResponse } from "@/utils/schemas";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/api/apiFetcher";
import BookCard from "@/components/BookCard";
import BookImageSlider from "@/components/BookImageSlider";

const Page: React.FC = () => {
  const params = useParams();
  const bookId = params?.slug;

  const { data, error, isLoading } = useSWR(`books/${bookId}`, fetcher);
  if (isLoading) return <div> Loading book...</div>;
  if (error) return <div>Failed to load.</div>;
  if (data) {
    const book: IBookResponse = data["book"];

    return (
      <>
        <section className="grid place-items-center py-8 px-4">
          <BookCard book={book} />
        </section>
        <section className="text-center py-4 px-2">
          <BookImageSlider bookId={book.id} />
        </section>
      </>
    );
  }
};

export default Page;

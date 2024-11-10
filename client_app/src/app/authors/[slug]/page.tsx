"use client";

import { fetcher } from "@/api/apiFetcher";
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
            <div className="flex items-center sm:justify-center ml-4 sm:ml-0">
              <table className="md:table-fixed">
                <thead className="sr-only">
                  <tr className="tr-class">
                    <th>Title</th>
                    <th>Year Published</th>
                    <th>ISBN</th>
                    <th>Available?</th>
                    <th>Read Status</th>
                    {/* <th>Description</th> */}
                  </tr>
                </thead>
                <tbody>
                  {author.books.map((book, index) => (
                    <tr key={index} className="tr-class">
                      <td className="td-class">{book.title}</td>
                      <td className="td-class">{book.publishedYear}</td>
                      <td className="td-class">{book.isbn}</td>
                      <td className="td-class">{book.availabilityStatus}</td>
                      <td className="td-class">{book.readStatus}</td>
                      {/* <td className="td-class" style={{maxWidth: "200px"}}>{book.description}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </>
    );
  }
};

export default SingleAuthor;

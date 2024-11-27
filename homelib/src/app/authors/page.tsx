import React from "react";
import { IAuthorResponse } from "@/lib/schemas";
import AuthorCard from "../../components/AuthorCard";
import Link from "next/link";
import { getAllAuthors } from "@/lib/fetchers/authors";

export const dynamic = "force-dynamic";

const AuthorList: React.FC = async () => {
  const authors: IAuthorResponse[] = await getAllAuthors();
  return (
    <section className="grid place-items-center text-center py-8 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">List of Authors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {authors.map((author, index) => (
          <AuthorCard key={index} author={author} />
        ))}
      </div>
      <div className="my-4">
        <Link
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          href="/authors/add"
        >
          Add Author
        </Link>{" "}
      </div>
    </section>
  );
};

export default AuthorList;

import React from "react";
import { IAuthorResponse } from "@/lib/schemas";
import AuthorCard from "../../components/AuthorCard";
import Link from "next/link";
import { getAllAuthors } from "@/lib/fetchers/authors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export const dynamic = "force-dynamic";

const AuthorList: React.FC = async () => {
  const authors: IAuthorResponse[] = await getAllAuthors();
  return (
    <>
      <div>
        <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">
          List of Authors
        </h1>
      </div>
      <div className="my-4 px-2">
        <Link
          className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          href="/authors/add"
        >
          <FontAwesomeIcon
            icon={faCirclePlus}
            className="text-gray-400 text-lg leading-lg mr-2"
          />
          Add New Author
        </Link>
      </div>
      <section className="grid place-items-center text-center py-2 px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {authors.map((author, index) => (
            <AuthorCard key={index} author={author} />
          ))}
        </div>
      </section>
    </>
  );
};

export default AuthorList;

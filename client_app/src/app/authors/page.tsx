import React from "react";
import { Author } from "../utils/schemas";
import AuthorCard from "../components/AuthorCard";

const AuthorList: React.FC = async () => {
    let data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authors`);
    let response = await data.json();
    const authors: Author[] = response["authors"];
  return (
    <>
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">
        List of Authors
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {authors.map((author, index) => (
          <AuthorCard index={index} author={author} />
        ))}
      </div>
    </>
  );
};

export default AuthorList;

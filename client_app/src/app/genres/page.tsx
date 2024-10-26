import React from "react";
import { Genre } from "../utils/schemas";
import GenreCard from "../components/GenreCard";

const GenreList: React.FC = async () => {
  let data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/genres`);
  let response = await data.json();
  const genres: Genre[] = response["genres"];
  console.log("genres", genres)
  return (
    <>
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">
        List of Genres
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {genres.map((genre, index) => (
          <GenreCard index={index} genre={genre} />
        ))}
      </div>
    </>
  );
};

export default GenreList;

import React from "react";
import { IGenreResponse } from "../../utils/schemas";
import GenreCard from "../../components/GenreCard";
import Link from "next/link";
import { getAllGenres } from "@/api/genres";

const GenreList: React.FC = async () => {
  const genres: IGenreResponse[] = await getAllGenres();

  return (
    <section className="grid place-items-center text-center py-8 px-4">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">
        List of Genres
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {genres?.map((genre, index) => (
          <GenreCard key={index} genre={genre} />
        ))}
      </div>
      {/* <hr className="my-2" /> */}
      <div className="my-4">
        <Link
          href="/genres/add"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add a Genre
        </Link>
      </div>
    </section>
  );
};

export default GenreList;

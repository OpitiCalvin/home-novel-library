import React from "react";
import GenreCard from "../../components/GenreCard";
import Link from "next/link";
import { getAllGenres } from "@/lib/fetchers/genres";
import { IGenreResponse } from "@/lib/schemas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export const dynamic = "force-dynamic";

const GenreList: React.FC = async () => {
  const genres: IGenreResponse[] = await getAllGenres();

  return (
    <>
      <div>
        <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">
          List of Genres
        </h1>
      </div>
      <div className="my-4 px-2">
        <Link
          href="/genres/add"
          className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          <FontAwesomeIcon icon={faCirclePlus} className="text-gray-400 text-lg leading-lg mr-2" />
          Add New Genre
        </Link>
      </div>
      <section className="grid place-items-center text-center py-2 px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {genres?.map((genre, index) => (
            <GenreCard key={index} genre={genre} />
          ))}
        </div>
      </section>
    </>
  );
};

export default GenreList;

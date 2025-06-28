"use client";

import { useState, useEffect } from "react";
import GenreCard from "../../components/GenreCard";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import Pagination from "@/components/Pagination";

export const dynamic = "force-dynamic";

const GenreList: React.FC = () => {
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6; //items per page

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/genres?page=${currentPage}&limit=${limit}`
      );
      const data = await res.json();
      setGenres(data.genres);
      setTotalPages(data.totalPages);
    };
    fetchGenres();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
          <FontAwesomeIcon
            icon={faCirclePlus}
            className="text-gray-400 text-lg leading-lg mr-2"
          />
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
      <Pagination currentPage={currentPage} totalPages={totalPages} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} />
    </>
  );
};

export default GenreList;

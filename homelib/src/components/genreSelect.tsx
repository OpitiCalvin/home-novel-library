import React from "react";
import { IBook, IGenreResponse } from "@/lib/schemas";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { fetcher } from "@/lib/apiFetcher";
import useSWR from "swr";

const inputClasses =
  "px-4 py-2 block border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 border-gray-400 w-full";

export function GenreSelect({
  register,
  errors,
}: {
  register: UseFormRegister<IBook>;
  errors: FieldErrors<IBook>;
}) {
  const { data, error, isLoading } = useSWR("genres", fetcher);

  if (error) return <div>Failed to Load...</div>;
  if (isLoading) return <div>Loading genres...</div>;
  if (!data) {
    console.log(data.parse);
  }

  if (data) {
    const genres: IGenreResponse[] = data["genres"];

    return (
      <div className="mb-4">
        <label htmlFor="genres" className="block text-gray-700">
          Genre
        </label>
        <div className="flex items-center mt-1"></div>
        <select {...register("genres")} name="genres" className={inputClasses}>
          <option value="">Select a Genre</option>
          {genres.map((genre, index) => (
            <option key={index} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <ErrorMessage name="genreId" errors={errors} />
      </div>
    );
  }
}

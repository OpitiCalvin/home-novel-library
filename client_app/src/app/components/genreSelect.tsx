import React from "react";
import { Genre, NewBook } from "../utils/schemas";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { fetcher } from "@/api/apiFetcher";
import useSWR from "swr";

const inputClasses =
  "px-4 py-2 block border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 border-gray-400 w-full";

export function GenreSelect({
  register,
  errors,
}: {
  register: UseFormRegister<NewBook>;
  errors: FieldErrors<NewBook>;
}) {
  // const genres: Genre[] = await getAllGenres();
  const { data, error, isLoading } = useSWR("genres", fetcher);

  if (error) return <div>Failed to Load...</div>;
  if (isLoading) return <div>Loading genres...</div>;
  if (!data) {
    console.log(data.parse);
  }

  if (data) {
    const genres: Genre[] = data["genres"];
    console.log(data);

    return (
      <div className="mb-4">
        <label className="block text-gray-700">Genre</label>
        <select {...register("genreId")} name="genreId" className={inputClasses}>
          <option value="0">New Genre</option>
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

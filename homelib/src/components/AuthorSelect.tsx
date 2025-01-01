import React from "react";
import { IAuthorResponse, IBook } from "@/lib/schemas";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { fetcher } from "@/lib/apiFetcher";
import useSWR from "swr";

const inputClasses =
  "px-4 py-2 block border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 border-gray-400 w-full";

export function AuthorSelect({
  register,
  errors,
}: {
  register: UseFormRegister<IBook>;
  errors: FieldErrors<IBook>;
}) {
  const { data, error, isLoading } = useSWR("authors", fetcher);

  if (error) return <div>Failed to Load...</div>;
  if (isLoading) return <div>Loading authors...</div>;
  if (!data) {
    console.log(data.parse);
  }

  if (data) {
    const authors: IAuthorResponse[] = data["authors"];
    return (
      <div className="mb-4">
        <label className="block text-gray-700">Author</label>
        <select
          {...register("authorId")}
          name="authorId"
          className={inputClasses}
        >
          <option value="">Select an Author</option>
          {authors.map((author, index) => (
            <option key={index} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
        {errors.authorId && (
          <span className="text-red-500 font-semibold text-sm">
            {errors.authorId.message}
          </span>
        )}
      </div>
    );
  }
}

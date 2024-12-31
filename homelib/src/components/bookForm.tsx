"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { bookFormSchema } from "../formValidators/addBookValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthorSelect } from "./AuthorSelect";
import { IBook } from "@/lib/schemas";
import { GenreSelect } from "./genreSelect";
import { toast } from "sonner";

const inputClasses =
  "px-4 py-2 block border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 border-gray-400 w-full";
const buttonClasses =
  "w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:bg-gray-400 disabled:text-gray-300 disabled:cursor-not-allowed";

export function BookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IBook>({
    mode: "all",
    resolver: zodResolver(bookFormSchema),
  });

  const onSubmit = async (data: IBook) => {
    try {
      const res = await fetch("/api/books", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw new Error("An error occurred while adding a book record");
      }
      const { message } = await res.json();
      toast.success(message);
      reset();
    } catch (error) {
      console.error("An Error occurred", error);
      toast.error("An error occurred while adding a book record");
    }
  };
  return (
    <section className="grid place-items-center py-8 px-4">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">
        Add New Book
      </h1>
      <form
        className="bg-white p-6 rounded-md shadow-md w-full max-w-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label className="block text-gray-700">Book Title</label>
          <input
            {...register("title")}
            placeholder="Book Title"
            type="text"
            name="title"
            className={inputClasses}
          />
          {errors.title && (
            <span className="text-red-500 font-semibold text-sm">
              {errors.title.message}
            </span>
          )}
        </div>
        <AuthorSelect register={register} errors={errors} />
        <GenreSelect register={register} errors={errors} />
        <div className="mb-4">
          <label className="block text-gray-700">Year</label>
          <input
            {...register("publishedYear")}
            type="number"
            name="publishedYear"
            placeholder="Publication Year"
            className={inputClasses}
          />
          {errors.publishedYear && (
            <span className="text-red-500 font-semibold text-sm">
              {errors.publishedYear.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">ISBN</label>
          <input
            {...register("isbn")}
            type="text"
            name="isbn"
            placeholder="ISBN"
            className={inputClasses}
          />
          {errors.isbn && (
            <span className="text-red-500 font-semibold text-sm">
              {errors.isbn.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Availability Status</label>
          <select
            {...register("availabilityStatus")}
            name="availabilityStatus"
            className={inputClasses}
          >
            <option value="Available">Available</option>
            <option value="Loaned Out">Loaned Out</option>
            <option value="In Wish List">In Wish List</option>
          </select>
          {errors.availabilityStatus && (
            <span className="text-red-500 font-semibold text-sm">
              {errors.availabilityStatus.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Read Status</label>
          <select
            {...register("readStatus")}
            name="readStatus"
            className={inputClasses}
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Finished">Finished</option>
            <option value="Stopped">Stopped</option>
          </select>
          {errors.readStatus && (
            <span className="text-red-500 font-semibold text-sm">
              {errors.readStatus.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            {...register("description")}
            name="description"
            rows={10}
            placeholder="Description"
            className={inputClasses}
          />
          {errors.description && (
            <span className="text-red-500 font-semibold text-sm">
              {errors.description.message}
            </span>
          )}
        </div>
        <button type="submit" className={buttonClasses}>
          Submit
        </button>
      </form>
    </section>
  );
}

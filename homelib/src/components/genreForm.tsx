"use client";

import { useForm } from "react-hook-form";
import { IGenre } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { genreFormSchema } from "../formValidators/addGenreValidation";
import { toast } from "sonner";

const inputClasses =
  "px-4 py-2 block border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 border-gray-400 w-full";

export function GenreForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IGenre>({
    mode: "all",
    resolver: zodResolver(genreFormSchema),
  });

  const onSubmit = async (data: IGenre) => {
    try {
      const res = await fetch("/api/genres", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw new Error("Failed to add new genre!");
      }
      const { message } = await res.json();
      toast.success(message);
      reset();
    } catch (error) {
      console.error("Error occurred", error);
      toast.error("Failed to add new genre!");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-md shadow-md w-full max-w-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Genre Name</label>
          <input
            {...register("name")}
            type="text"
            name="name"
            placeholder="Genre Name"
            className="px-4 py-2 block border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 border-gray-400 w-full"
          />
          {errors.name && (
            <span className="text-red-500 font-semibold text-sm">
              {errors.name.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            {...register("category", { required: "Genre is required." })}
            className={inputClasses}
          >
            <option value="">Select a Category</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
          </select>
          {errors.category && (
            <span className="text-red-500 font-semibold text-sm">
              {errors.category?.message}
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
        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:bg-gray-400 disabled:text-gray-300 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      </form>
    </>
  );
}

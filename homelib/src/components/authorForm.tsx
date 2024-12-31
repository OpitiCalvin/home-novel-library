"use client";

import { useForm } from "react-hook-form";
import { IAuthor } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { authorFormSchema } from "@/formValidators/addAuthorValidation";
import { toast } from "sonner";

const inputClasses =
  "px-4 py-2 block border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 border-gray-400 w-full";
const buttonClasses =
  "w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:bg-gray-400 disabled:text-gray-300 disabled:cursor-not-allowed";

export function AuthorForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IAuthor>({
    mode: "all",
    resolver: zodResolver(authorFormSchema),
  });

  const onSubmit = async (data: IAuthor) => {
    try {
      const res = await fetch("/api/authors", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Error occurred during author record creation!");
      }

      const { message } = await res.json();
      toast.success(message);
      reset();
    } catch (error) {
      console.error("Error occurred", error);
      toast.error("An error occurred while registering a author record.");
    }
  };
  return (
    <>
      <form
        className="bg-white p-6 rounded-md shadow-md w-full max-w-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label className="block text-gray-700">Author Name</label>
          <input
            {...register("name")}
            type="text"
            name="name"
            placeholder="Author Name"
            // className="w-full px-4 py-2 border rounded-md"
            className={inputClasses}
          />
          {errors.name && (
            <span className="text-red-500 font-semibold text-sm">
              {errors.name.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Author Bio</label>
          <textarea
            {...register("bio")}
            name="bio"
            className="w-full px-4 py-2 border rounded-md"
            rows={10}
          />
          {errors.bio && (
            <span className="text-red-500 font-semibold text-sm">
              {errors.bio.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          // className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          className={buttonClasses}
        >
          Submit
        </button>
      </form>
    </>
  );
}

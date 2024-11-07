"use client";

import React, { useEffect, useActionState } from "react";
import {
  useForm,
  UseFormRegister,
  FieldErrors,
  FieldPath,
} from "react-hook-form";
import { State } from "../formValidators/formStates";
import { processAddBook } from "../actions/addBook";
import { bookFormSchema } from "../formValidators/addBookValidation";
import { useFormStatus } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { AuthorSelect } from "./AuthorSelect";
import { NewBook } from "../utils/schemas";
// import { GenreSelect } from "./genreSelect";

const inputClasses =
  "px-4 py-2 block border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 border-gray-400 w-full";
const buttonClasses =
  "w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:bg-gray-400 disabled:text-gray-300 disabled:cursor-not-allowed";

export function FormContent({
  register,
  isValid,
  errors,
}: {
  register: UseFormRegister<NewBook>;
  isValid: boolean;
  errors: FieldErrors<NewBook>;
}) {
  const { pending } = useFormStatus();

  return (
    <>
      <div className="mb-4">
        <label className="block text-gray-700">Book Title</label>
        <input
          {...register("title")}
          placeholder="Book Title"
          type="text"
          name="title"
          className={inputClasses}
        />
        <span className="text-red-500 font-semibold text-sm">
          <ErrorMessage name="title" errors={errors} />
        </span>
      </div>
      <AuthorSelect register={register} errors={errors} />
      {/* <GenreSelect register={register} errors={errors} /> */}
      <div className="mb-4">
        <label className="block text-gray-700">Year</label>
        <input
          {...register("publishedYear")}
          type="number"
          name="publishedYear"
          placeholder="Publication Year"
          className={inputClasses}
        />
        <span className="text-red-500 font-semibold text-sm">
          <ErrorMessage name="publishedYear" errors={errors} />
        </span>
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
        <span className="text-red-500 font-semibold text-sm">
          <ErrorMessage name="isbn" errors={errors} />
        </span>
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
        </select>
        <span className="text-red-500 font-semibold text-sm">
          <ErrorMessage name="availabilityStatus" errors={errors} />
        </span>
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
        <span className="text-red-500 font-semibold text-sm">
          <ErrorMessage name="readStatus" errors={errors} />
        </span>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          {...register("description")}
          name="description"
          rows={5}
          placeholder="Description"
          className={inputClasses}
        />
        <span className="text-red-500 font-semibold text-sm">
          <ErrorMessage name="description" errors={errors} />
        </span>
      </div>
      {/* image section */}
      {/* <div>
        <label className="block text-gray-700">Cover Image </label>
        <input
          {...register("coverImage")}
          accept="image/*"
          type="file"
          name="coverImage"
          capture="environment"
          className={inputClasses}
        />
        <span className="text-red-500 font-semibold text-sm">
          <ErrorMessage name="coverImage" errors={errors} />
        </span>
      </div> */}
      <button
        type="submit"
        className={buttonClasses}
        disabled={pending || !isValid}
      >
        Submit
      </button>
      {pending && <span>Loading...</span>}
    </>
  );
}

export function BookForm() {
  const {
    register,
    formState: { isValid, errors },
    setError,
    reset,
  } = useForm<NewBook>({
    mode: "all",
    resolver: zodResolver(bookFormSchema),
  });
  const [state, formAction] = useActionState<State, FormData>(
    processAddBook,
    null
  );

  useEffect(() => {
    if (!state) {
      return;
    }
    // in case our form action returns `error` we can now `setError`s
    if (state.status === "error") {
      state.errors?.forEach((error) => {
        setError(error.path as FieldPath<NewBook>, {
          message: error.message,
        });
      });
    }
    if (state.status === "success") {
      alert(state.message);
      reset();
    }
  }, [state, setError, reset]);

  return (
    <section className="grid place-items-center py-8 px-4">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">
        Add New Book
      </h1>
      <form
        className="bg-white p-6 rounded-md shadow-md w-full max-w-md"
        action={formAction}
      >
        <FormContent register={register} isValid={isValid} errors={errors} />
      </form>
    </section>
  );
}

"use client";

import React, { useEffect } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import { processAddBook } from "../actions/addBook";
import { useFormState, useFormStatus } from "react-dom";
import { State } from "swr";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../utils/addBookValidation";
import { ErrorMessage } from "@hookform/error-message";

export interface FormValues {
  title: string;
  author: string;
  genre: string;
  year: number;
  isbn: string;
  description: string;
  availability_status: string;
  read_status: string
}

export function FormContent({
  register,
  isValid,
  errors,
}: {
  register: UseFormRegister<FormValues>;
  isValid: boolean;
  errors: FieldErrors<FormValues>;
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
          className="w-full px-4 py-2 border rounded-md"
        />
        <ErrorMessage name="title" errors={errors} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Author</label>
        <input
          {...register("author")}
          type="text"
          name="author"
          placeholder="Author Full Name"
          className="w-full px-4 py-2 border rounded-md"
        />
        <ErrorMessage name="author" errors={errors} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Genre</label>
        <input
          {...register("genre")}
          type="text"
          name="genre"
          placeholder="Genre"
          className="w-full px-4 py-2 border rounded-md"
        />
        <ErrorMessage name="genre" errors={errors} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Year</label>
        <input
          {...register("year")}
          type="number"
          name="year"
          placeholder="Publication Year"
          className="w-full px-4 py-2 border rounded-md"
        />
        <ErrorMessage name="year" errors={errors} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">ISBN</label>
        <input
          {...register("isbn")}
          type="text"
          name="isbn"
          placeholder="ISBN"
          className="w-full px-4 py-2 border rounded-md"
        />
        <ErrorMessage name="isbn" errors={errors} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Availability Status</label>
        <input
          {...register("availability_status")}
          type="text"
          name="availability_status"
          placeholder="Availability Status"
          className="w-full px-4 py-2 border rounded-md"
        />
        <ErrorMessage name="availability_status" errors={errors} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Read Status</label>
        <input
          {...register("read_status")}
          type="text"
          name="read_status"
          placeholder="Read Status"
          className="w-full px-4 py-2 border rounded-md"
        />
        <ErrorMessage name="read_status" errors={errors} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          {...register("description")}
          name="description"
          rows={5}
          placeholder="Description"
          className="w-full px-4 py-2 border rounded-md"
        />
        <ErrorMessage name="description" errors={errors} />
      </div>
      <input
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
        disabled={pending || !isValid}
      />
      {pending && <span>Loading...</span>}
    </>
  );
}

export function BookForm() {
    const { register, formState: {isValid, errors}, setError } = useForm<FormValues>({
      mode: "all",
      resolver: zodResolver(formSchema)
    });
  const [state, formAction] = useFormState<State, FormData>(
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
        setError(error.path as FieldPath<FormValues>, {
          message: error.message
        });
      });
    }
    if (state.status === "success") {
      alert(state.message);
    }
  }, [state, setError]);

  return (
    <>
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">
        Add New Book
      </h1>
      {state && JSON.stringify(state)}
      <form
        className="bg-white p-6 rounded-md shadow-md w-full max-w-md"
        action={formAction}
      >
        <FormContent register={register} isValid={isValid} errors={errors} />
      </form>
    </>
  );
}

"use client";

import {
  FieldErrors,
  FieldPath,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { IGenre } from "@/lib/schemas";
import { useFormStatus } from "react-dom";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { genreFormSchema } from "../formValidators/addGenreValidation";
import { useActionState, useEffect } from "react";
import { State } from "../formValidators/formStates";
import { processAddGenre } from "../actions/addGenre";

const inputClasses =
  "px-4 py-2 block border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 border-gray-400 w-full";

function FormContent({
  register,
  isValid,
  errors,
}: {
  register: UseFormRegister<IGenre>;
  isValid: boolean;
  errors: FieldErrors<IGenre>;
}) {
  const { pending } = useFormStatus();

  return (
    <>
      <div className="mb-4">
        <label className="block text-gray-700">Genre Name</label>
        <input
          {...register("name")}
          type="text"
          name="name"
          placeholder="Genre Name"
          className="px-4 py-2 block border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 border-gray-400 w-full"
        />
        <span className="text-red-500 font-semibold text-sm">
          <ErrorMessage name="name" errors={errors} />
        </span>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Category</label>
        <input
          {...register("category")}
          placeholder="Category"
          type="text"
          name="category"
          className={inputClasses}
        />
        <span className="text-red-500 font-semibold text-sm">
          <ErrorMessage name="category" errors={errors} />
        </span>
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
        <span className="text-red-500 font-semibold text-sm">
          <ErrorMessage name="description" errors={errors} />
        </span>
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:bg-gray-400 disabled:text-gray-300 disabled:cursor-not-allowed"
        disabled={pending || !isValid}
      >
        Submit
      </button>
      {pending && <span>Loading...</span>}
    </>
  );
}

export function GenreForm() {
  const {
    register,
    formState: { isValid, errors },
    setError,
    reset,
  } = useForm<IGenre>({
    mode: "all",
    resolver: zodResolver(genreFormSchema),
  });
  const [state, formAction] = useActionState<State, FormData>(
    processAddGenre,
    null
  );

  useEffect(() => {
    if (!state) {
      return;
    }
    if (state.status === "error") {
      console.log(state.errors);
      state.errors?.forEach((error) => {
        setError(error.path as FieldPath<IGenre>, {
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
    <>
      <form
        className="bg-white p-6 rounded-md shadow-md w-full max-w-md"
        action={formAction}
      >
        <FormContent register={register} isValid={isValid} errors={errors} />
      </form>
    </>
  );
}

"use client";

import {
  FieldErrors,
  FieldPath,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { NewAuthor } from "../utils/schemas";
import { useFormStatus } from "react-dom";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { authorFormSchema } from "../formValidators/addAuthorValidation";
import { State } from "../formValidators/formStates";
import { processAddAuthor } from "../actions/addAuthor";
import { useEffect, useActionState } from "react";

const inputClasses =
  "px-4 py-2 block border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 border-gray-400 w-full";
const buttonClasses =
  "w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:bg-gray-400 disabled:text-gray-300 disabled:cursor-not-allowed";

export function FormContent({
  register,
  isValid,
  errors,
}: {
  register: UseFormRegister<NewAuthor>;
  isValid: boolean;
  errors: FieldErrors<NewAuthor>;
}) {
  const { pending } = useFormStatus();

  return (
    <>
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
        <span className="text-red-500 font-semibold text-sm">
          <ErrorMessage name="name" errors={errors} />
        </span>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Author Bio</label>
        <textarea
          {...register("bio")}
          name="bio"
          className="w-full px-4 py-2 border rounded-md"
          rows={5}
        />
        <span className="text-red-500 font-semibold text-sm">
          <ErrorMessage name="bio" errors={errors} />
        </span>
      </div>
      <button
        type="submit"
        // className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
        className={buttonClasses}
        disabled={pending || !isValid}
      >
        Submit
      </button>
      {pending && <span>Loading...</span>}
    </>
  );
}

export function AuthorForm() {
  const {
    register,
    formState: { isValid, errors },
    setError,
    reset,
  } = useForm<NewAuthor>({
    mode: "all",
    resolver: zodResolver(authorFormSchema),
  });
  const [state, formAction] = useActionState<State, FormData>(
    processAddAuthor,
    null
  );

  useEffect(() => {
    if (!state) {
      return;
    }
    if (state.status === "error") {
      console.log(state.errors);
      state.errors?.forEach((error) => {
        setError(error.path as FieldPath<NewAuthor>, {
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

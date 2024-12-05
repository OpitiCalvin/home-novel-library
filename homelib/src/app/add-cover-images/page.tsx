"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { bookImageFormSchema } from "../../formValidators/bookImageValidation";
import { useFormStatus } from "react-dom";
import { BookSelect } from "../../components/BookSelect";
import { z } from "zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

// const inputClasses =
//   "px-4 py-2 block border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 border-gray-400 w-full";
const buttonClasses =
  "w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:bg-gray-400 disabled:text-gray-300 disabled:cursor-not-allowed";

export type BookImageFormValues = z.infer<typeof bookImageFormSchema>;

const Page: React.FunctionComponent = () => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookImageFormValues>({
    mode: "all",
    resolver: zodResolver(bookImageFormSchema),
  });
  const { pending } = useFormStatus();

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    setSelectedFiles((prevFiles) => [...prevFiles, ...imageFiles]);
    setValue("coverImages", [...selectedFiles, ...imageFiles]); // Sync with react-hook-form
  };

  const removeSelectedFile = (fileToRemove: File) => {
    const updatedFiles = selectedFiles.filter((file) => file !== fileToRemove);

    setSelectedFiles(updatedFiles);
    setValue("coverImages", updatedFiles); // update the form state
  };

  const onSubmit: SubmitHandler<BookImageFormValues> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("bookId", data.bookId.toString());
      selectedFiles.forEach((file) => formData.append("files", file));

      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/book-images`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!resp.ok) {
        throw new Error("Upload failed!");
      }
      const { message } = await resp.json();
      if (message) {
        alert(message);
        reset();
        setSelectedFiles([]);
      }
    } catch (error) {
      console.log("Failed to submit form", error);
      alert(error);
    }
  };

  if (!session) {
    redirect("/auth/login");
  }

 return (
    <section className="grid place-items-center py-8 px-4">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">
        Add Book Cover Image(s)
      </h1>
      <form
        className="bg-white p-6 rounded-md shadow-md w-full max-w-md"
        // action={formAction}
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        {/* <FormContent register={register} isValid={isValid} errors={errors} /> */}
        <BookSelect register={register} errors={errors} />
        <div className="mb-4">
          <label
            htmlFor="coverImages"
            className="block text-sm font-medium text-gray-700"
          >
            Book Images
          </label>
          <div className="flex items-center mt-1">
            <input
              type="file"
              accept="image/*"
              multiple
              {...register("coverImages", { required: "File is required" })}
              id="fileInput"
              capture="environment"
              // className={inputClasses}
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="fileInput"
              className="px-4 py-2 text-white font-semibold w-full h-11 bg-indigo-400 rounded-md shadow-sm cursor-pointer hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
            >
              Choose Files
            </label>
          </div>
          {selectedFiles.length > 0 && (
            <div className="mt-2 space-y-2">
              <p className="text-sm text-gray-700">Selected Files:</p>
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center">
                  <p className="text-sm text-gray-700">
                    <span className="mx-4 block font-semibold">
                      {file.name}
                    </span>
                  </p>
                  <button
                    type="button"
                    onClick={() => removeSelectedFile(file)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <span className="text-red-500 font-semibold text-sm">
            <ErrorMessage name="coverImages" errors={errors} />
          </span>
        </div>
        <button
          type="submit"
          className={buttonClasses}
          // className="w-full px-4 py-2 text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          // disabled={pending || !isValid}
          // disabled={isSubmitting}
        >
          {/* Submit */}
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        {pending && <span>Loading...</span>}
      </form>
    </section>
  );
};

export default Page;

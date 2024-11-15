import { FieldErrors, UseFormRegister } from "react-hook-form";
import { IBookResponse } from "../utils/schemas";
import useSWR from "swr";
import { fetcher } from "@/api/apiFetcher";
import { ErrorMessage } from "@hookform/error-message";
import { BookImageFormValues } from "../app/add-cover-images/page";

export function BookSelect({
  register,
  errors,
}: {
  register: UseFormRegister<BookImageFormValues>;
  errors: FieldErrors<BookImageFormValues>;
}) {
  const { data, error, isLoading } = useSWR("books", fetcher);

  if (error) return <div>Failed to Load...</div>;
  if (isLoading) return <div>Loading books...</div>;

  if (data) {
    const books: IBookResponse[] = data["books"];

    return (
      <div className="mb-4">
        <label className="block text-gray-700"> Book</label>
        <select
          {...register("bookId")}
          name="bookId"
          className="px-4 py-2 block border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 border-gray-400 w-full"
        >
          <option value={0}>Select a book</option>
          {books.map((book, index) => (
            <option key={index} value={book.id}>
              {book.title}
            </option>
          ))}
        </select>
        <span className="text-red-500 font-semibold text-sm">
          <ErrorMessage name="bookId" errors={errors} />
        </span>
      </div>
    );
  }
}

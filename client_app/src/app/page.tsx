import Link from "next/link";
import BooksPreview from "./components/BooksPreview";

export default function Home() {
  return (
    <>
      <section className="text-center py-8 px-4">
        <h1 className="text-5xl font-bold text-gray-800">
          Welcome to My Library
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Easily Manage my Collection of Books.
        </p>

        <div className="mt-12 mb-10 space-x-4">
          {/* TODO: In smaller screens, change to column view */}
          <Link
            href="/books"
            className="bg-blue-600 text-white py-3 px-4 rounded-md shadow-md hover:bg-blue-700 transition"
          >
            Explore Library
          </Link>
          <Link
            href="/add-book"
            className="bg-gray-200 text-gray-800 py-3 px-4 rounded-md shadow-md hover:bg-gray-300 transition"
          >
            Add New Book
          </Link>
        </div>
      </section>

      <section className="text-center py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 col-span-2 max-w-2xl mx-auto">
          <BooksPreview />
        </div>
      </section>
    </>
  );
}

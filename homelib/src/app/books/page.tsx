import React from "react";
import BookPreview from "../../components/BooksPreview";
import Link from "next/link";

export const dynamic = "force-dynamic";

const Library: React.FC = async () => {
  return (
    <>
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">
        My Library
      </h1>
      <section className="text-center py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 col-span-2 max-w-2xl mx-auto">
          <BookPreview />
        </div>
        {/* Add book cover images */}
        <hr className="my-4" />
        <div>
          <Link
            href="/add-cover-images"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Book Cover Images
          </Link>
        </div>
      </section>
    </>
  );
};

export default Library;

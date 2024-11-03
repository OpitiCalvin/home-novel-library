import React from "react";
import BookPreview from "../components/BookPreview";

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
      </section>
    </>
  );
};

export default Library;

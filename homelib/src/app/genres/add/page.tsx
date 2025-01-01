import { GenreForm } from "@/components/genreForm";
import React from "react";

const AddGenre = async () => {
  return (
    <section className="grid place-items-center py-8 px-4">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">
        Add New Genre
      </h1>
      <GenreForm />
    </section>
  );
};

export default AddGenre;

import React from "react";
import { AuthorForm } from "@/components/authorForm";

const AddAuthor = () => {
  return (
    <section className="grid place-items-center py-8 px-4">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">
        Add New Author
      </h1>
      <AuthorForm />
    </section>
  );
};

export default AddAuthor;

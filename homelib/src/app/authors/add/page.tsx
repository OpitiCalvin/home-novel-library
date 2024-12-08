import React from "react";
import { AuthorForm } from "@/components/authorForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const AddAuthor = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/auth/login");
  }

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

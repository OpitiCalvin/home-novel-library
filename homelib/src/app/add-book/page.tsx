import React from "react";
import { BookForm } from "../../components/bookForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const AddBook: React.FC = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/auth/login");
  }
  return <BookForm />;
};

export default AddBook;

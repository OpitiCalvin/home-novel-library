import React from "react";
import { BookForm } from "../../components/bookForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/options";

// interface ExtUser extends User {
//   role?: string
// }

const AddBook: React.FC = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }
  // if (session.user){
  //   const sessUser: ExtUser = session?.user;
  //   console.log(sessUser)

  // }
  // if (sessUser?.role !== "admin") {
  //   return (
  //     <div className="bg-white shadow-md rounded-md p-4 text-center">
  //       <p className="text-lg font-semibold text-gray-600">
  //         ONLY admins allowed to add book entries.
  //       </p>
  //     </div>
  //   );
  // }
  return <BookForm />;
};

export default AddBook;

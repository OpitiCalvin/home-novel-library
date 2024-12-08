import React from "react";
import RegisterForm from "./form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Register: React.FC = async () => {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return <RegisterForm />;
};

export default Register;

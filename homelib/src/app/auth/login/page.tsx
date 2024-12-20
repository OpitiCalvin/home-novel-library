import { getServerSession } from "next-auth";
import LoginForm from "./form";
import { redirect } from "next/navigation";

const Login: React.FC = async () => {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return <LoginForm />;
};

export default Login;

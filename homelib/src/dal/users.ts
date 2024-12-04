import { User } from "@/database/models";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function getUsers(limited: boolean = true) {
  const session = await getServerSession();
  if (!session) {
    redirect("/auth/login");
  }

  try {
    const users = limited
      ? await User.findAll({
          attributes: {
            exclude: ["password", "createdAt", "updatedAt"],
          },
        })
      : await User.findAll({
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        });
    return users;
  } catch (error) {
    console.error("An error occurred attempting to retrieve users data", error);
    return null;
  }
}

export async function getUser(userEmail: string, limited: boolean = true) {
  const session = await getServerSession();
  if (!session) {
    redirect("/auth/login");
  }

  try {
    if (!userEmail) {
      return null;
    }
    const user = limited
      ? User.findOne({
          attributes: { exclude: ["password", "createdAt", "updatedAt"] },
          where: { email: userEmail },
        })
      : User.findOne({
          attributes: { exclude: ["createdAt", "updatedAt"] },
          where: { email: userEmail },
        });
    return user;
  } catch (error) {
    console.error("Error retrieving user", error);
    return null;
  }
}

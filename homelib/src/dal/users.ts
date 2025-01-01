import { User } from "@/database/models";
import bcrypt from "bcrypt";

export async function getUsers() {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });
    return users;
  } catch (error) {
    console.error("An error occurred attempting to retrieve users data", error);
    return null;
  }
}

export async function getUserWithEmail(userEmail: string) {
  try {
    if (!userEmail) {
      return null;
    }
    const user = User.findOne({
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      where: { email: userEmail },
    });
    return user;
  } catch (error) {
    console.error("Error retrieving user", error);
    return null;
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const user = await User.findOne({
      where: {
        email: email.toLowerCase(),
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (!user) {
      console.error("User not found!");
      return null;
    }
    const isPasswordMatch = await bcrypt.compare(password || "", user.password);
    if (!isPasswordMatch) {
      return null;
    }
    return { id: user.id, email: user.email, role: user.role };
  } catch (error) {
    console.error("Error signing in the user", error);
    return null;
  }
}

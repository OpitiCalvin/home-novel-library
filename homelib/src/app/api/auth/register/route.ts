import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { User } from "@/database/models";
import sequelize from "@/database/models/connection";

export const POST = async (req: Request) => {
  const { email, password } = await req.json();
  const lowerCaseEmail = email ? email.toLowerCase() : null;
  // console.log(`email: ${email} password: ${lowerCaseEmail}`);

  if (password && password.length < 8) {
    return NextResponse.json(
      { message: "Pasword should be at least 8 characters." },
      { status: 400 }
    );
  }
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await sequelize.transaction(async (t) => {
      return await User.create(
        {
          email: lowerCaseEmail,
          password: hash,
        },
        { transaction: t }
      );
    });
    return NextResponse.json(
      { message: `User (id=${user.id}) successfully registered.` },
      { status: 201 }
    );
  } catch (error) {
    console.error("User registration error", error);
    return NextResponse.json(
      { message: "User registration failed" },
      { status: 500 }
    );
  }
};

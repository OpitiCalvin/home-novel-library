// import Author from "@/sequelize/models/author";
import db from "@/sequelize/models";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const authors = await db.Author.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    return NextResponse.json(
      { message: "Authors retrieved successfully", authors: authors },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching authors:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

export const POST = async (req: any) => {
  try {
    const { name, bio } = await req.json();
    const author = await db.Author.create({
      name: name,
      bio: bio,
    });
    return NextResponse.json(
      { message: "Author created successfully.", author: author },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating authors:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

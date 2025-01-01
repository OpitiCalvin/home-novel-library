import { Author } from "@/database/models";
import sequelize from "@/database/models/connection";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";

// export const dynamic = "force-dynamic";

export const GET = async () => {
  try {
    const authors = await Author.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [["id", "ASC"]]
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

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });
  }

  try {
    const { name, bio } = await req.json();
    const author = await sequelize.transaction(async (t) => {
      return await Author.create(
        {
          name: name,
          bio: bio,
        },
        { transaction: t }
      );
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

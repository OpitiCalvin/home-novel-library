import { Author } from "@/database/models";
import sequelize from "@/database/models/connection";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";

// export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "6";

  const offset = (parseInt(page) - 1) * parseInt(limit);
  try {
    const { count, rows } = await Author.findAndCountAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      limit: parseInt(limit),
      offset: offset,
      order: [["id", "ASC"]],
    });
    return NextResponse.json(
      {
        message: "Authors retrieved successfully",
        totalItems: count,
        totalPages: Math.ceil(count / parseInt(limit)),
        currentPage: parseInt(page),
        authors: rows,
      },
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

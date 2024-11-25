import Author from "@/database/models/author";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  try {
    const author = await Author.findByPk(params.id, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (!author) {
      return NextResponse.json(
        { message: "Author not found!" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Query for a author is a success.", author: author },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching author: ", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

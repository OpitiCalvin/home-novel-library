import { Book, Author } from "@/database/models";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id: authorId } = await params;
  try {
    const author = await Author.findByPk(authorId, {
      include: {
        model: Book,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        order: [["id", "ASC"]],
      },
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
      {
        message: "Query for a author and associated books a success.",
        author: author,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching author and associated books:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

import Book from "@/database/models/book";
import BookImage from "@/database/models/bookImage";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  try {
    const book = await Book.findByPk(params.id);
    if (!book) {
      return NextResponse.json(
        { message: `Book not found with id ${params.id}` },
        { status: 404 }
      );
    }

    const bookImages = await BookImage.findAll({
      where: {
        bookId: params.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    return NextResponse.json(
      { message: "Book images successfully retrieved", images: bookImages },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching book and associated images:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

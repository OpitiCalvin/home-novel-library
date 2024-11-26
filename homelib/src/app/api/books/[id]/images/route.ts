import { Book, BookImage } from "@/database/models";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  const { id: bookId } = await params;
  try {
    const book = await Book.findByPk(bookId);
    if (!book) {
      return NextResponse.json(
        { message: `Book not found with id ${bookId}` },
        { status: 404 }
      );
    }

    const bookImages = await BookImage.findAll({
      where: {
        bookId: bookId,
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

import {Book, Author, Genre} from "@/database/models";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  const { id: bookId } = await params;
  try {
    const book = await Book.findByPk(bookId, {
      include: [
        {
          model: Author,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Genre,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          through: {
            attributes: [],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (!book) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Book retrieved successfully", book: book },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching book:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  const { id: bookId } = await params;
  try {
    const book = await Book.findByPk(bookId);
    if (!book) {
      return NextResponse.json({ message: "Book not found!" }, { status: 404 });
    }

    await book.destroy();

    return NextResponse.json({ message: "Book deleted." }, { status: 204 });
  } catch (error) {
    console.error("Error deleting book:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

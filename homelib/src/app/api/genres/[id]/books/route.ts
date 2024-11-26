import { Genre, Book } from "@/database/models";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  const { id: genreId } = await params;
  try {
    const genre = await Genre.findByPk(genreId, {
      include: {
        model: Book,
        attributes: {
          exclude: ["createdAt", "updatedAt", "book_genre"],
        },
        through: {
          attributes: [],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (!genre) {
      return NextResponse.json(
        { message: "Genre not found!" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "Query for a genre and associated books a success.",
        genre: genre,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching genre and associated books:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

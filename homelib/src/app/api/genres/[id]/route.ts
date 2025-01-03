import {Genre} from "@/database/models";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id: genreId } = await params;
  try {
    const genre = await Genre.findByPk(genreId, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (!genre) {
      return NextResponse.json({ message: "Genre not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Genre retrieved successfully", genre: genre },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching genre:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id: genreId } = await params;
  try {
    const genre = await Genre.findByPk(genreId);
    if (!genre) {
      return NextResponse.json(
        { message: "Genre not found!" },
        { status: 404 }
      );
    }

    await genre.destroy();

    return NextResponse.json({ message: "Genre deleted." }, { status: 204 });
  } catch (error) {
    console.error("Error deleting genre:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

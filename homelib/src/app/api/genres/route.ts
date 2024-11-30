import { Genre } from "@/database/models";
import sequelize from "@/database/models/connection";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const genres = await Genre.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    return NextResponse.json(
      { message: "Genres successfully retrieved.", genres: genres },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching genres:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const { name, category, description } = await req.json();

    const genre = await sequelize.transaction(async (t) => {
      return await Genre.create(
        {
          name: name,
          category: category,
          description: description,
        },
        { transaction: t }
      );
    });

    return NextResponse.json(
      { message: "Genre created successfully.", genre: genre },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating genre:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

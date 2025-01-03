import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import mime from "mime";
import { BookImage } from "@/database/models";
import sequelize from "@/database/models/connection";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export const GET = async () => {
  try {
    const bookImages = await BookImage.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    return NextResponse.json({
      message: "Query for bookImages is a success",
      bookImages: bookImages,
    });
  } catch (error) {
    console.error("Error querying for book covers:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const bookId = formData.get("bookId") as string;
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { message: "No image(s) uploaded. Please include at least an image" },
        { status: 400 }
      );
    }
    const bookImagesData = await Promise.all(
      files.map(async (file) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const filename = `${uniqueSuffix}.${mime.getExtension(file.type)}`;

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const path = join("uploads", filename);
        // Write file to public folder
        await writeFile(path, buffer);

        return {
          bookId: bookId,
          filename: filename,
          filepath: path,
          mimetype: file.type,
          size: file.size,
        };
      })
    );

    const bookImages = await sequelize.transaction(async (t) => {
      return await BookImage.bulkCreate(bookImagesData, { transaction: t });
    });

    return NextResponse.json(
      { message: "Book Images uploaded successfully.", bookImages: bookImages },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading book covers:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

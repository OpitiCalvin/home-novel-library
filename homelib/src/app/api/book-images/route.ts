import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import mime from "mime";
import { BookImage } from "@/database/models";

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
  try {
    const formData = await req.formData();
    const bookId: number = formData.get("bookId");
    const files: File[] = formData.getAll("files");

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
        await writeFile(path, buffer);
        // console.log(`open ${path} to see the uploaded image`);

        return {
          bookId: bookId,
          filename: filename,
          filepath: path,
          mimetype: file.type,
          size: file.size,
          encoding: "guess",
        };
      })
    );

    const bookImages = await BookImage.bulkCreate(bookImagesData);

    return NextResponse.json(
      { message: "Book Images uploaded successfully.", bookImages: bookImages },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading book covers:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

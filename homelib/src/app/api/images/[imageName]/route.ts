import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { BookImage } from "@/database/models";

export const GET = async (
  req: Request,
  { params }: { params: { imageName: string } }
) => {
  try {
    const { imageName } = await params;

    const imagePath = path.join(process.cwd(), "uploads", imageName);

    if (!fs.existsSync(imagePath)) {
      return NextResponse.json({ message: "Image not found" }, { status: 404 });
    }
    // retrieve image mimetype
    const bookImage = await BookImage.findOne({where: {filename: imageName}})
    const mimetype = bookImage?.get("mimetype") || "image/*"
    
    // read the image file
    const imageBuffer = fs.readFileSync(imagePath);

    return new NextResponse(imageBuffer, {
      headers: { "Content-Type": mimetype },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to load image: " },
      { status: 500 }
    );
  }
};

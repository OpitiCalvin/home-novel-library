import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

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
    // read the image file
    const imageBuffer = fs.readFileSync(imagePath);

    return new NextResponse(imageBuffer, {
      headers: { "Content-Type": "image/jpeg" },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to load image: " },
      { status: 500 }
    );
  }
};

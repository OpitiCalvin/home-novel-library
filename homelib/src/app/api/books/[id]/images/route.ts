// import Book from "@/lib/models/book"
// import BookImage from "@/lib/models/bookImage";
import db from "@/sequelize/models";
import { NextResponse } from "next/server";

export const GET = async (request: Request,
    { params }: { params: {id:number}}) => {
    try {
        const book = await db.Book.findByPk(params.id);
        if (!book) {
    return NextResponse.json({ message: `Book not found with id ${params.id}` },{status: 404});
  }

  const bookImages = await db.BookImage.findAll({
    where: {
      bookId: params.id,
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  return NextResponse.json({ message: "Book images successfully retrieved", images: bookImages },{status: 200});
    } catch (error) {
        console.error("Error fetching book and associated images:", error);
        return NextResponse.json({message: error}, {status: 500});
    }
}
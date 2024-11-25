// import Author from "@/lib/models/author";
// import Book from "@/lib/models/book";
import db from "@/sequelize/models";
import { NextResponse } from "next/server";


export const GET = async (request: Request,
    { params }: { params: {id:number}}
) => {
    try {
        const book = await db.Book.findByPk(params.id, {
            include: [
      {
        model: db.Author,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    ],
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  if (!book) {
    return NextResponse.json({message: "Book not found"}, {status: 404});
  }

  return NextResponse.json({message:"Book retrieved successfully",book: book}, {status: 200})
        
    } catch (error) {
        console.error("Error fetching book:", error)
        return NextResponse.json({message: error}, {status: 500});
        
    }
}

export const DELETE = async (request: Request, { params }: { params: {id:number}}) => {
    try {
        const book = await db.Book.findByPk(params.id);
        if (!book) {
            return NextResponse.json({message: "Book not found!"}, {status: 404});
        }

        await book.destroy();

        return NextResponse.json({message: "Book deleted."}, {status: 204});
    } catch (error) {
        console.error("Error deleting book:", error)
        return NextResponse.json({message: error}, {status: 500});
        
    }
}
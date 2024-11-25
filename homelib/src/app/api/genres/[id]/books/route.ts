// import Book from "@/lib/models/book"
// import Genre from "@/lib/models/genre"
import db from "@/sequelize/models";
import { NextResponse } from "next/server"

export const GET = async (request: Request,
    { params }: { params: {id:number}}) => {
    try {
        const genre = db.Genre.findByPk(params.id, {
    include: {
      model: db.Book,
      attributes: {
        exclude: ["createdAt", "updatedAt", "book_genre"],
      },
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  })
  if (!genre) {
    return NextResponse.json({message: "Genre not found!"}, {status: 404});
  }
  return NextResponse.json({message: "Query for a genre and associated books a success.", genre: genre}, {status: 200});
    } catch (error) {
        console.error("Error fetching genre and associated books:", error)
        return NextResponse.json({message: error}, {status: 500});
        
    }
}
import Book from "@/database/models/book";
import Author from "@/database/models/author";
import Genre from "@/database/models/genre";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const books = await Book.findAll({
      include: [
        {
          model: Author,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    return NextResponse.json(
      { message: "Books retrieved successfully", books: books },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

export const POST = async (req: any) => {
  try {
    const {
      title,
      publishedYear,
      isbn,
      availabilityStatus,
      readStatus,
      description,
      authorId,
      genres,
    } = await req.json();
    console.log(`title- ${title} author id - ${authorId} genres - ${genres}`);

    let bookGenres;
    const book = await Book.create({
      title: title,
      publishedYear: publishedYear,
      isbn: isbn,
      availabilityStatus: availabilityStatus,
      readStatus: readStatus,
      description: description,
      authorId: authorId,
    });

    if (genres !== undefined) {
      bookGenres = await Genre.findAll({ where: { id: genres } });
    }
    if (bookGenres?.length > 0) {
      bookGenres.addGenres(bookGenres).then(() => {
        NextResponse.json(
          {
            message: "Book created successfully.",
            book: book,
            genres: bookGenres,
          },
          { status: 201 }
        );
      });
    } else {
      return NextResponse.json(
        { message: "Book created successfully.", book: book },
        { status: 201 }
      );
    }
    // return NextResponse.json(
    //   { message: "Book created successfully." },
    //   { status: 201 }
    // );
  } catch (error) {
    console.error("Error creating books:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

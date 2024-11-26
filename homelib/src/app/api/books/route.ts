import { Book, Author, Genre } from "@/database/models";
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
        {
          model: Genre,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          through: {
            attributes: [],
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

    const author = await Author.findByPk(authorId);
    if (!author) {
      return NextResponse.json(
        { message: "author with given id not found" },
        { status: 400 }
      );
    }

    if (!genres) {
      return NextResponse.json(
        { message: "`genres` (number or number[] is required" },
        { status: 400 }
      );
    }

    const bookGenres = await Genre.findAll({ where: { id: genres } });

    if (!bookGenres || bookGenres.length === 0) {
      return NextResponse.json(
        {
          message: "Book not created as genre(s) don't exist in our database.",
        },
        { status: 400 }
      );
    }
    if (bookGenres && bookGenres?.length > 0) {
      const book = await Book.create({
        title: title,
        publishedYear: publishedYear,
        isbn: isbn,
        availabilityStatus: availabilityStatus,
        readStatus: readStatus,
        description: description,
        authorId: authorId,
      });

      await book.addGenres(bookGenres);
      return NextResponse.json(
        {
          message: "Book created successfully.",
          book: book,
          genres: bookGenres,
        },
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

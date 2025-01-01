import { Book, Author, Genre, BookGenre } from "@/database/models";
import sequelize from "@/database/models/connection";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";

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
      order: [["id", "ASC"]],
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

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });
  }

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

    const genreData = await Genre.findAll({ where: { id: genres } });

    if (!genreData || genreData.length === 0) {
      return NextResponse.json(
        {
          message: "Book not created as genre(s) don't exist in our database.",
        },
        { status: 400 }
      );
    }
    if (genreData && genreData?.length > 0) {
      const result = await sequelize.transaction(async (t) => {
        const book = await Book.create(
          {
            title: title,
            publishedYear: publishedYear,
            isbn: isbn,
            availabilityStatus: availabilityStatus,
            readStatus: readStatus,
            description: description,
            authorId: authorId,
          },
          { transaction: t }
        );

        const bookGenreInfo = genreData.map((bookGenre) => {
          const genreId = bookGenre.get("id");
          return { bookId: book.get("id"), genreId: genreId };
        });

        const book_genres = await BookGenre.bulkCreate(bookGenreInfo, {
          transaction: t,
        });

        return { book, book_genres };
      });

      const { book } = result;
      return NextResponse.json(
        {
          message: "Book created successfully.",
          book: book,
          genres: genreData,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error creating books:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

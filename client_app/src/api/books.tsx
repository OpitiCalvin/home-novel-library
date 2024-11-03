import { NewBook } from "@/app/utils/schemas";

export async function getAllBooks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
    next: { revalidate: 180 },
  });
  let apiBooks = await res.json();
  return apiBooks["books"];
}

export async function getOneBook(bookId: Number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}`,
    {
      next: { revalidate: 180 },
    }
  );

  const apiBook = await res.json();
  return apiBook["book"];
}

export async function getAllBooks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
    next: { revalidate: 180 },
  });
  const apiBooks = await res.json();
  return apiBooks["books"];
}

export async function getOneBook(bookId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}`,
    {
      next: { revalidate: 180 },
    }
  );

  const apiBook = await res.json();
  return apiBook["book"];
}

export async function getAllGenres() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/genres`, {
    next: { revalidate: 180 },
  });
  const apiGenres = await res.json();
  return apiGenres["genres"];
}

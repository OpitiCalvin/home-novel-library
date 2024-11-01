export async function getAllAuthors() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authors`, {
    next: { revalidate: 180 },
  });
  let apiAuthors = await res.json();
  return apiAuthors["authors"];
}

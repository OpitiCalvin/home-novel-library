export const fetcher = (args: string) => fetch(`${process.env.NEXT_PUBLIC_API_URL}/${args}`, {
    next: { revalidate: 180 },
  }).then((res) => res.json());
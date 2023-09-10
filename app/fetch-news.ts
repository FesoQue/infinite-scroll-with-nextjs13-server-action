"use server";
export async function fetchNews(pageParam: number) {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=10&page=${pageParam}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const { articles, totalResults } = await res.json();

  return { articles, totalResults };
}

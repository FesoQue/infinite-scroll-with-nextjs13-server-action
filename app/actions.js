"use server";

export async function fetchNews({ limit, offset }) {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=${limit}&page=${offset}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const { articles, totalResults } = await res.json();

  return { articles, totalResults };
}

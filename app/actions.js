"use server";

export async function fetchNews({ limit, offset }) {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=${limit}&page=${offset}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  if (!res.ok) {
    console.log(res);
  }
  const { articles, totalResults } = await res.json();

  return { articles, totalResults };
}

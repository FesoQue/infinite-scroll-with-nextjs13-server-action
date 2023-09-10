import LoadMoreArticles from "./LoadMoreArticles";
import { fetchNews } from "./fetch-news";
import Link from "next/link";

export default async function Home() {
  const { articles } = await fetchNews({
    limit: 10,
    offset: 1,
  });

  return (
    <section className="max-w-4xl mx-auto">
      <h1 className="text-3xl mb-10 text-center font-semibold">
        Technology News
      </h1>
      {articles?.map((article: { title: string; url: string }, i: number) => {
        return (
          <Link
            key={i}
            href={article.url}
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <article className="flex items-center bg-white p-4 mb-4 rounded shadow">
              <h2>{article.title}</h2>
            </article>
          </Link>
        );
      })}
      <LoadMoreArticles />
    </section>
  );
}

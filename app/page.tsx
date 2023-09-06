import Image from "next/image";
import { fetchLatestNews } from "./actions";
import Link from "next/link";
import Spinner from "./Spinner";

export default async function Home() {
  const { articles, totalResults } = await fetchLatestNews({
    limit: 10,
    offset: 1,
  });

  return (
    <section className="max-w-4xl mx-auto">
      <h1 className="text-3xl mb-6 text-center font-semibold">
        Technology News
      </h1>
      {articles?.map((news) => {
        return (
          <Link
            key={news.title}
            href={news.url}
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <article className="flex items-center bg-white p-4 mb-4 rounded shadow">
              <h2>{news.title}</h2>
            </article>
          </Link>
        );
      })}
      <Spinner />
    </section>
  );
}

"use client";
import LoadMore from "./LoadMore";

import LoadMoreArticles from "./LoadMoreArticles";
import { fetchNews } from "./fetch-news";
import Link from "next/link";
import useIQ from "./useIQ";

export default function Home() {
  // const { articles } = await fetchNews({
  //   limit: 10,
  //   offset: 1,
  // });

  const offset = 1;
  // const { articles } = fetchNews(offset);

  const { data, hasNextPage } = useIQ();

  return (
    <main className="min-h-screen p-10 bg-[#f1f1f1]">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-3xl mb-10 text-center font-semibold">
          Technology News
        </h1>
        {/* {articles?.map((article: { title: string; url: string }) => {
          return (
            <Link
              key={article.title}
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
        })} */}

        {data?.pages?.map((page) => {
          return page.articles.map((aa) => {
            return (
              <div>
                <h1 className="p-6">{aa.title}</h1>
              </div>
            );
          });
        })}

        <LoadMore />

        {/* <LoadMoreArticles /> */}
      </section>
    </main>
  );
}

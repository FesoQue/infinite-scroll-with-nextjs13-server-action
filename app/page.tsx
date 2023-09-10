"use client";

import LoadMoreArticles from "./LoadMoreArticles";
import Link from "next/link";
import useArticleData from "./useArticleData";

interface ArticleType {
  title: string;
  url: string;
}

export default function Home() {
  const { data } = useArticleData();

  return (
    <main className="min-h-screen p-10 bg-[#f1f1f1]">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-3xl mb-10 text-center font-semibold">
          Technology News
        </h1>
        {data?.pages?.map((page) => {
          return page.articles.map((article: ArticleType, i: number) => {
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
          });
        })}

        <LoadMoreArticles />
      </section>
    </main>
  );
}

"use client ";

import { useEffect, useRef } from "react";
import useArticleData from "./useArticleData";
import useInView from "./useInView";
import Link from "next/link";
import ClipLoader from "react-spinners/ClipLoader";
interface ArticleType {
  title: string;
  url: string;
}

const LoadMore = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const { isInView } = useInView(container);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useArticleData();

  useEffect(() => {
    if (isInView) {
      fetchNextPage();
    }
  }, [isInView, hasNextPage]);

  return (
    <div>
      {data?.pages?.map((page) => {
        return page.articles.map((article: ArticleType) => {
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
        });
      })}
      {hasNextPage ? (
        <div ref={container} className="flex justify-center">
          <ClipLoader
            color={"#444"}
            loading={true}
            size={40}
            aria-label="Loading Spinner"
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default LoadMore;

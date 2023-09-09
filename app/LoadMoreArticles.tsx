"use client";
import { useEffect, useRef, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import useInView from "./useInView";
import { fetchNews } from "./fetch-news";
import Link from "next/link";

interface Article {
  title: string;
  url: string;
}

interface DataType {
  total: number | null;
  articles: Article[] | [];
}
const LoadMoreArticles = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const { isInView } = useInView(container);
  const [articleData, setArticleData] = useState<DataType>({
    total: null,
    articles: [],
  });

  const offset = (articleData?.articles?.length + 20) / 10;
  const remainder = (articleData?.total as number) % 2;

  useEffect(() => {
    if (isInView) {
      fetchNews({
        limit: 10,
        offset: offset,
      }).then((res) => {
        setArticleData((prevData) => ({
          total: res?.totalResults,
          articles: [...prevData.articles, ...res?.articles],
        }));
      });
    }
  }, [isInView]);

  return (
    <div>
      {articleData.articles?.map((article) => {
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
      })}

      {articleData.articles?.length - remainder !==
      (articleData?.total as number) - 20 ? (
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

export default LoadMoreArticles;

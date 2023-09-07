"use client";
import { useEffect, useRef, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import useInView from "./useInView";
import { fetchNews } from "./actions";
import Link from "next/link";

interface Article {
  title: string;
  url: string;
}

interface Data {
  total: number | null;
  articles: Article[] | [];
}
const LoadMoreNews = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const { isInView } = useInView(container);
  const [data, setData] = useState<Data>({
    total: null,
    articles: [],
  });

  const offset = (data?.articles?.length + 20) / 10;
  const remainder = (data?.total as number) % 2;

  useEffect(() => {
    if (isInView) {
      fetchNews({
        limit: 10,
        offset: offset,
      }).then((res) => {
        setData((prevData) => ({
          total: res?.totalResults,
          articles: [...prevData.articles, ...res?.articles],
        }));
      });
    }
  }, [isInView]);

  return (
    <div>
      {data.articles?.map((news) => {
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

      {data.articles?.length - remainder !== (data?.total as number) - 20 ? (
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

export default LoadMoreNews;

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
  const [offset, setOffset] = useState(1);

  const totalResults = data?.total;
  const limit = 10;
  const totalOffset = Math.floor(totalResults / limit);

  // const lazyLoadContent = () => {
  //   const offsetValue = Math.min(offset + 1, totalOffset);
  //   setOffset((prev) => prev + 1);
  // };

  useEffect(() => {
    if (isInView) {
      fetchNews({
        limit: 10,
        offset: offset,
      }).then((res) => {
        setData((prevData) => ({
          total: res?.totalResults,
          articles: [...prevData.articles, ...res.articles],
        }));
      });
      setOffset((prev) => prev + 1);
      console.log(totalOffset);
    }
  }, [isInView, offset]);

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

      {offset < 6 && (
        <div ref={container} className="flex justify-center">
          <ClipLoader
            color={"#444"}
            loading={true}
            size={40}
            aria-label="Loading Spinner"
          />
        </div>
      )}
    </div>
  );
};

export default LoadMoreNews;

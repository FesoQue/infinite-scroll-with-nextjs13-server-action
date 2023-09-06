"use client";
import { useEffect, useRef, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import useInView from "./useInView";
import { fetchLatestNews } from "./actions";

const Spinner = () => {
  interface DataState {
    total: number | null;
    news: Array<string>;
  }
  const container = useRef<HTMLDivElement | null>(null);
  const { isInView } = useInView(container);
  const [data, setData] = useState<DataState>({
    total: null,
    news: [],
  });
  const [currentPage, setCurrentPage] = useState(1);

  const totalResults = data?.total;
  const pageSize = 10;
  const pages = Math.floor(totalResults / pageSize);

  const goToNext = () => {
    const nextPage = Math.min(currentPage + 1, pages);
    setCurrentPage(nextPage);
  };

  const canStillScroll = currentPage < pages;

  useEffect(() => {
    if (isInView) {
      fetchLatestNews({
        limit: 10,
        offset: canStillScroll && currentPage,
      }).then((res) => {
        setData((prevData) => ({
          total: res?.totalResults,
          news: [...prevData.news, ...res?.articles],
        }));
      });
    }
  }, [isInView]);

  return (
    <div ref={container} className="flex justify-center">
      {canStillScroll ? (
        <ClipLoader
          color={"#444"}
          loading={true}
          size={40}
          aria-label="Loading Spinner"
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Spinner;

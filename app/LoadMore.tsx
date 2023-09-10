"use client ";

import { useEffect, useRef } from "react";
import useIQ from "./useIQ";
import useInView from "./useInView";
import Link from "next/link";

const LoadMore = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const { isInView } = useInView(container);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useIQ();

  useEffect(() => {
    if (isInView) {
      fetchNextPage();
    }
  }, [isInView, hasNextPage]);

  return (
    <div>
      {data?.pages?.map((page) => {
        return page.articles.map((aa) => {
          return <h1 className="p-6">{aa.title}</h1>;
        });
      })}
      {hasNextPage ? <div ref={container}>Loading.....</div> : ""}
    </div>
  );
};

export default LoadMore;

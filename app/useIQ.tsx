import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchNews } from "./fetch-news";

const useIQ = () => {
  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["article"],
      async ({ pageParam = 1 }) => await fetchNews(pageParam),
      {
        getNextPageParam: (lastPage, allPages) => {
          const nextPage =
            lastPage?.articles?.length === 10 ? allPages.length + 1 : undefined;
          return nextPage;
        },
      }
    );
  return { data, fetchNextPage, hasNextPage, isFetchingNextPage };
};

export default useIQ;

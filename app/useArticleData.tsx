import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchNews } from "./fetch-news";

const useArticleData = () => {
  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["article"],
      async ({ pageParam: offset = 1 }) => await fetchNews(offset),
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

export default useArticleData;

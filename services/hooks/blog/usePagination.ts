import { endpoints } from "@/services/endpoints";
import rootApi from "@/services/rootApi";
import { useQuery } from "@tanstack/react-query";

const useBlogPagination = (variables: any) => {
  const { data, error, isError, isFetching, isRefetching, isLoading, refetch } =
    useQuery({
      queryKey: [endpoints.API.BLOG.PAGINATION, variables],
      queryFn: () =>
        rootApi.post(endpoints.API.BLOG.PAGINATION, { ...variables }),
    });

  const formatData = data?.data;

  return {
    isLoading,
    isError,
    data: formatData ? formatData[0] : [],
    total: formatData ? formatData[1] : 0,
    error,
    refetch,
    isFetching,
    isRefetching,
  };
};

export default useBlogPagination;

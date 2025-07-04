import { useQuery } from "@tanstack/react-query";

import { endpoints } from "../../../endpoints";
import rootApi from "../../../rootApi";

const useBlogDetail = (id: string) => {
  const url = endpoints.API.BLOG.DETAIL + "/" + id;
  const { isLoading, isError, data, error, refetch } = useQuery<any>({
    queryKey: [url],
    queryFn: () => rootApi.get(url),
  });

  return {
    isLoading,
    isError,
    data: data?.data || null,
    error,
    refetch,
  };
};

export default useBlogDetail;

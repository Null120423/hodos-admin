import { useQuery } from "@tanstack/react-query";

import { endpoints } from "../../../endpoints";
import rootApi from "../../../rootApi";

const useUserPostPagination = (variables: any) => {
  const { data, error, isError, isFetching, isRefetching, isLoading, refetch } =
    useQuery({
      queryKey: [endpoints.API.USER_POST.PAGINATION, variables],
      queryFn: () =>
        rootApi.post(endpoints.API.USER_POST.PAGINATION, { ...variables }),
    });

  const formatData = data?.data;

  return {
    isLoading,
    isError,
    data: formatData ? formatData?.data : [],
    total: formatData ? formatData?.total : 0,
    error,
    refetch,
    isFetching,
    isRefetching,
  };
};

export default useUserPostPagination;

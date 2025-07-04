import { useQuery } from "@tanstack/react-query";

import { endpoints } from "@/services/endpoints";
import rootApi from "@/services/rootApi";

const useLogErrorPagination = (variables: any) => {
  const { data, error, isError, isFetching, isRefetching, isLoading, refetch } =
    useQuery({
      queryKey: [endpoints.API.LOG.ERROR_LOG_PAG, variables],
      queryFn: () =>
        rootApi.post(endpoints.API.LOG.ERROR_LOG_PAG, { ...variables }),
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

export default useLogErrorPagination;

import { useQuery } from "@tanstack/react-query";

import { endpoints } from "@/services/endpoints";
import rootApi from "@/services/rootApi";

const useDashBoardData = () => {
  const { data, error, isError, isFetching, isRefetching, isLoading, refetch } =
    useQuery({
      queryKey: [endpoints.API.DASHBOARD.DATA],
      queryFn: () => rootApi.get(endpoints.API.DASHBOARD.DATA),
    });
  const formatData = data?.data;

  return {
    isLoading,
    isError,
    data: formatData,
    error,
    refetch,
    isFetching,
    isRefetching,
  };
};

export default useDashBoardData;

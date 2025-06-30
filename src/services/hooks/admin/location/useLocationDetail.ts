import { useQuery } from "@tanstack/react-query";

import { endpoints } from "@/services/endpoints";
import rootApi from "@/services/rootApi";

const useLocationDetail = (id: string) => {
  const route = endpoints.API.LOCATION.GET_BY_ID + `/${id}`;
  const { data, error, isError, isFetching, isRefetching, isLoading, refetch } =
    useQuery({
      queryKey: [route],
      queryFn: () => rootApi.get(route),
    });

  return {
    isLoading,
    isError,
    data: data?.data as any,
    error,
    refetch,
    isFetching,
    isRefetching,
  };
};

export default useLocationDetail;

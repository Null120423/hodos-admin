import { useQuery } from "@tanstack/react-query";

import { endpoints } from "@/services/endpoints";
import rootApi from "@/services/rootApi";

export const useGetReceivingBankById = (id: string) => {
  const route = endpoints.API.RECEIVING_BANK.BY_ID(id);
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

import { useQuery } from "@tanstack/react-query";

import { endpoints } from "@/services/endpoints";
import rootApi from "@/services/rootApi";

export const useGetPlanQuestionById = (id: string) => {
  const route = endpoints.API.PLAN_QUESTION.BY_ID(id);
  const { data, error, isError, isFetching, isRefetching, isLoading, refetch } =
    useQuery({
      queryKey: [endpoints.API.PLAN_QUESTION.BY_ID("")],
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

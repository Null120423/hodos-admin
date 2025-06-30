import { useQuery } from "@tanstack/react-query";

import { endpoints } from "@/services/endpoints";
import rootApi from "@/services/rootApi";

export const useGetPlanQuestions = () => {
  const route = endpoints.API.PLAN_QUESTION.ALL;
  const { data, error, isError, isFetching, isRefetching, isLoading, refetch } =
    useQuery({
      queryKey: [route],
      queryFn: () => rootApi.get(route),
    });

  return {
    isLoading,
    isError,
    data: (data?.data as any) || [],
    error,
    refetch,
    isFetching,
    isRefetching,
  };
};

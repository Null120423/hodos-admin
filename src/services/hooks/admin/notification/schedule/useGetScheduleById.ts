import { useQuery } from "@tanstack/react-query";

import { endpoints } from "@/services/endpoints";
import rootApi from "@/services/rootApi";

const useGetScheduleById = (id: string) => {
  const url = endpoints.API.NOTIFICATION.SCHEDULE_BY_ID(id);
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

export default useGetScheduleById;

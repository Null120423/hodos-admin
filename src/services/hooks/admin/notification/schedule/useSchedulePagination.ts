import { useQuery } from "@tanstack/react-query";

import { endpoints } from "@/services/endpoints";
import rootApi from "@/services/rootApi";

const useScheduleNotificationPagination = (variables: any) => {
  const { data, error, isError, isFetching, isRefetching, isLoading, refetch } =
    useQuery({
      queryKey: [endpoints.API.NOTIFICATION.SCHEDULE_PAGINATION, variables],
      queryFn: () =>
        rootApi.post(endpoints.API.NOTIFICATION.SCHEDULE_PAGINATION, {
          ...variables,
        }),
    });

  const formatData = data?.data;

  return {
    isLoading,
    isError,
    data: formatData ? formatData?.data : [],
    total: formatData ? formatData?.data : 0,
    error,
    refetch,
    isFetching,
    isRefetching,
  };
};

export default useScheduleNotificationPagination;

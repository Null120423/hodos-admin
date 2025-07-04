import { useQuery } from "@tanstack/react-query";

import { endpoints } from "../../../endpoints";
import rootApi from "../../../rootApi";

const useNotificationById = (id: string) => {
  const url = endpoints.API.NOTIFICATION.GET_BY_ID(id);
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

export default useNotificationById;

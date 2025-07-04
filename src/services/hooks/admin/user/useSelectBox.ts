import { useQuery } from "@tanstack/react-query";

import { endpoints } from "../../../endpoints";
import rootApi from "../../../rootApi";

const useUserSelectBox = () => {
  const url = endpoints.API.USER.SELECT_BOX;
  const { isLoading, isError, data, error, refetch } = useQuery<any>({
    queryKey: [url],
    queryFn: () => rootApi.get(url),
  });

  return {
    isLoading,
    isError,
    data: data?.data || [],
    error,
    refetch,
  };
};

export default useUserSelectBox;

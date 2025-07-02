import { useQuery } from "@tanstack/react-query";

import { endpoints } from "../../../endpoints";
import rootApi from "../../../rootApi";

const useUserPagination = (variables: any) => {
  const { data, error, isError, isFetching, isRefetching, isLoading, refetch } =
    useQuery({
      queryKey: [endpoints.API.USER.PAGINATION, variables],
      queryFn: () =>
        rootApi.post(endpoints.API.USER.PAGINATION, { ...variables }),
    });

  const formatData = data?.data;

  return {
    isLoading,
    isError,
    data: formatData ? formatData?.data : [],
    total: formatData ? formatData?.total : 0,
    totalActiveUser: formatData ? formatData?.totalActiveUser : 0,
    totalAdminUser: formatData ? formatData?.totalAdminUser : 0,
    totalUser: formatData ? formatData?.totalUser : 0,
    totalPremium: formatData ? formatData?.totalPremium : 0,
    error,
    refetch,
    isFetching,
    isRefetching,
  };
};

export default useUserPagination;

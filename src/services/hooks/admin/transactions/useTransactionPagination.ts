import { useQuery } from "@tanstack/react-query";

import { endpoints } from "../../../endpoints";
import rootApi from "../../../rootApi";

const useTransactionPagination = (variables: any) => {
  const { data, error, isError, isFetching, isRefetching, isLoading, refetch } =
    useQuery({
      queryKey: [endpoints.API.TRANSACTION.PAGINATION, variables],
      queryFn: () =>
        rootApi.post(endpoints.API.TRANSACTION.PAGINATION, { ...variables }),
    });

  const formatData = data?.data;

  return {
    isLoading,
    isError,
    data: formatData ? formatData?.data : [],
    total: formatData ? formatData?.total : 0,
    totalMoney: formatData ? formatData?.totalMoney : 0,
    totalSuccessful: formatData ? formatData?.totalSuccessful : 0,
    error,
    refetch,
    isFetching,
    isRefetching,
  };
};

export default useTransactionPagination;

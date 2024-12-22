import { useQuery } from '@tanstack/react-query';
import { useToast } from '../../../../contexts/toast.context';
import { endpoints } from '../../../endpoints';
import rootApi from '../../../rootApi';

const useErrorLogPagination = (variables) => {
  const { showToast } = useToast();
  const { data, error, isError, isFetching, isRefetching, isLoading, refetch } = useQuery({
    queryKey: [endpoints.API.LOG.ERROR_LOG_PAG, variables],
    queryFn: () => rootApi.post(endpoints.API.LOG.ERROR_LOG_PAG, { ...variables }),
    onError: (error) => {
      showToast(error.message, { type: 'error' });
    },
  });

  const formatData = data?.data;

  return {
    isLoading,
    isError,
    data: formatData ? formatData[0] : [],
    total: formatData ? formatData[1] : 0,
    error,
    refetch,
    isFetching,
    isRefetching,
  };
};

export default useErrorLogPagination;

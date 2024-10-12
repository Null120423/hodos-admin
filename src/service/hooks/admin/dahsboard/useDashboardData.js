import { useQuery } from '@tanstack/react-query';
import { useToast } from '../../../../contexts/toast.context';
import { endpoints } from '../../../endpoints';
import rootApi from '../../../rootApi';

const useDashBoardData = () => {
  const { showToast } = useToast();
  const { data, error, isError, isFetching, isRefetching, isLoading, refetch } = useQuery({
    queryKey: [endpoints.API.DASHBOARD.DATA],
    queryFn: () => rootApi.get(endpoints.API.DASHBOARD.DATA),
    onError: (error) => {
      showToast(error.message, { type: 'error' });
    },
  });
  const formatData = data?.data;

  return {
    isLoading,
    isError,
    data: formatData,
    error,
    refetch,
    isFetching,
    isRefetching,
  };
};

export default useDashBoardData;

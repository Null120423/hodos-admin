import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useModal } from '../../../../contexts/modal.context';
import { useToast } from '../../../../contexts/toast.context';
import { endpoints } from '../../../endpoints';
import rootApi from '../../../rootApi';

const useCreateMultiFood = () => {
  const query = useQueryClient();
  const { closeModal } = useModal();
  const { showToast } = useToast();
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables) => {
      return rootApi.post(endpoints.API.FOOD.CREATE_MULTI, variables);
    },
    onError: (e) => {
      showToast(e?.response?.data?.message || 'Đã có lỗi xảy ra', { type: 'error' });
    },
    onSuccess: (res) => {
      showToast(res?.data?.message || 'Create successfully!', { type: 'success' });
      closeModal();
      query.invalidateQueries([endpoints.API.FOOD.PAGINATION]);
      query.invalidateQueries([endpoints.API.DASHBOARD.DATA]);
    },
  });
  return {
    isLoading: isPending,
    isError,
    data,
    error,
    onCreate: mutateAsync,
  };
};

export default useCreateMultiFood;

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useModal } from '../../../../contexts/modal.context';
import { useToast } from '../../../../contexts/toast.context';
import { endpoints } from '../../../endpoints';
import rootApi from '../../../rootApi';
const useSoftRemoveLocation = () => {
  const query = useQueryClient();
  const { closeModal } = useModal();
  const { showToast } = useToast();
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables) => {
      return rootApi.delete(endpoints.API.LOCATION.REMOVE_SOFT + '/' + variables.id);
    },
    onError: (e) => {
      showToast(e?.response?.data?.message || 'Đã có lỗi xảy ra', { type: 'error' });
    },
    onSuccess: (res) => {
      showToast(res?.data?.message || 'Remove successfully!', { type: 'success' });
      closeModal();
      query.invalidateQueries([endpoints.API.LOCATION.PAGINATION]);
      query.invalidateQueries([endpoints.API.DASHBOARD.DATA]);
    },
  });
  return {
    isLoading: isPending,
    isError,
    data,
    error,
    onRemove: mutateAsync,
  };
};
export default useSoftRemoveLocation;

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useModal } from '../../../../contexts/modal.context';
import { useToast } from '../../../../contexts/toast.context';
import { endpoints } from '../../../endpoints';
import rootApi from '../../../rootApi';

const useForceDelete = () => {
  const query = useQueryClient();
  const { closeModal } = useModal();
  const { showToast } = useToast();
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (id) => {
      return rootApi.delete(endpoints.API.BLOG.FORCE_DELETE + '/' + id);
    },
    onError: (e) => {
      showToast(e?.response?.data?.message || 'Đã có lỗi xảy ra', { type: 'error' });
    },
    onSuccess: (res) => {
      showToast(res?.data?.message || 'Create successfully!', { type: 'success' });
      query.invalidateQueries([endpoints.API.BLOG.PAGINATION]);
      closeModal();
    },
  });
  return {
    isLoading: isPending,
    isError,
    data,
    error,
    onDelete: mutateAsync,
  };
};

export default useForceDelete;

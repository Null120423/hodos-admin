import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToast } from '../../../../contexts/toast.context';
import { ADMIN_ROUTES } from '../../../../routes/endpoint';
import { useRouter } from '../../../../routes/hooks/use-router';
import { endpoints } from '../../../endpoints';
import rootApi from '../../../rootApi';

const useCreateBlog = () => {
  const router = useRouter();
  const query = useQueryClient();
  const { showToast } = useToast();
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables) => {
      return rootApi.post(endpoints.API.BLOG.CREATE, variables);
    },
    onError: (e) => {
      showToast(e?.response?.data?.message || 'Đã có lỗi xảy ra', { type: 'error' });
    },
    onSuccess: (res) => {
      showToast(res?.data?.message || 'Create successfully!', { type: 'success' });
      router.replace(ADMIN_ROUTES.BLOG_MANAGER);
      query.invalidateQueries([endpoints.API.BLOG.PAGINATION]);
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

export default useCreateBlog;

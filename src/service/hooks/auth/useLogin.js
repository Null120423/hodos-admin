import { useMutation } from '@tanstack/react-query';
import { useToast } from '../../../contexts/toast.context';
import { endpoints } from '../../endpoints';
import rootApi from '../../rootApi';

const useLogin = () => {
  const { showToast } = useToast();
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables) => {
      return rootApi.post(endpoints.API.LOGIN, variables);
    },
    onError: (e) => {
      showToast(e?.response?.data?.message || 'Đã có lỗi xảy ra', { type: 'error' });
    },
    onSuccess: () => {
      showToast('Login successfully!', { type: 'success' });
    },
  });
  return {
    isLoading: isPending,
    isError,
    data,
    error,
    onLogin: mutateAsync,
  };
};

export default useLogin;

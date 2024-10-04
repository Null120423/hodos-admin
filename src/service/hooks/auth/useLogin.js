import { useMutation } from '@tanstack/react-query';
import { endpoints } from '../../endpoints';
import rootApi from '../../rootApi';

const useLogin = () => {
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables) => {
      return rootApi.post(endpoints.LOGIN, variables);
    },
    onError: (e) => {
      alert(e?.response?.data?.message || 'Đã có lỗi xảy ra');
    },
    onSuccess: async (data) => {
      alert(JSON.stringify(data));
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

import { useMutation } from 'react-query';
import axios from 'axios';

const useTestService = () => {
  const { isLoading, isError, data, error, mutate } = useMutation({
    mutationFn: async (url) => {
      return await axios.get(url);
    },
    // onError: (e) => {
    //     alert(e?.response?.data?.message || 'Đã có lỗi xảy ra');
    // },
    // onSuccess: (data) => {
    //     alert(JSON.stringify(data));
    // },
  });
  return {
    isLoading,
    isError,
    data,
    error,
    mutate,
  };
};

export default useTestService;

// http://localhost:3000/api/get-all-food?id=all

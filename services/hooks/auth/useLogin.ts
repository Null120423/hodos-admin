import { useMutation } from "@tanstack/react-query";
import { endpoints } from "../../endpoints";
import rootApi from "../../rootApi";

const useLogin = () => {
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables: any) => {
      return rootApi.post(endpoints.API.LOGIN, variables);
    },
    onSuccess: () => {},
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

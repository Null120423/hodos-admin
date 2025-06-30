import { useAuth } from "@/contexts/auth-context";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { endpoints } from "../endpoints";
import rootApi from "../rootApi";

const useSignIn = () => {
  const { login } = useAuth();
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables) => {
      return rootApi.post(endpoints.API.LOGIN, variables);
    },
    onSuccess: (res: any) => {
      login({
        user: res?.data?.user || null,
        accessToken: res?.data?.accessToken || "",
        refreshToken: res?.data?.refreshToken || "",
      });
      addToast({
        title: "Login Successful",
        description: res?.message || "Login successful",
        color: "success",
      });
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

export default useSignIn;

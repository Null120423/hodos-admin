import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { endpoints } from "@/services/endpoints";
import rootApi from "@/services/rootApi";

const useCreateReceivingBank = () => {
  const query = useQueryClient();
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables: any) => {
      return rootApi.post(endpoints.API.RECEIVING_BANK.CREATE, variables);
    },
    onSuccess: (res: any) => {
      addToast({
        title: "Success!",
        description: res?.message || "Bank created successfully",
        color: "success",
      });
      query.invalidateQueries({
        queryKey: [endpoints.API.RECEIVING_BANK.ALL],
      });
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

export default useCreateReceivingBank;

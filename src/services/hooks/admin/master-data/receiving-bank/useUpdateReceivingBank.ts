import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { endpoints } from "@/services/endpoints";
import rootApi from "@/services/rootApi";

const useUpdateReceivingBank = () => {
  const query = useQueryClient();
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables: any) => {
      return rootApi.patch(
        endpoints.API.RECEIVING_BANK.UPDATE(variables.id),
        variables,
      );
    },
    onSuccess: (res: any) => {
      addToast({
        title: "Success!",
        description: res?.message || "Bank updated successfully",
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
    onUpdate: mutateAsync,
  };
};

export default useUpdateReceivingBank;

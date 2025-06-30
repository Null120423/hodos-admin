import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { endpoints } from "@/services/endpoints";
import rootApi from "@/services/rootApi";

const useDeleteReceivingBank = () => {
  const query = useQueryClient();
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (id: string) => {
      return rootApi.delete(endpoints.API.RECEIVING_BANK.DELETE(id));
    },
    onSuccess: (res: any) => {
      addToast({
        title: "Success!",
        description: res?.message || "Bank deleted successfully",
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
    onDelete: mutateAsync,
  };
};

export default useDeleteReceivingBank;

import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { endpoints } from "@/services/endpoints";
import rootApi from "@/services/rootApi";

const useDeletePlanQuestion = () => {
  const query = useQueryClient();
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (id: string) => {
      return rootApi.delete(endpoints.API.PLAN_QUESTION.DELETE(id));
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [endpoints.API.PLAN_QUESTION.ALL],
      });
      addToast({
        title: "Question deleted successfully",
        color: "success",
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

export default useDeletePlanQuestion;

import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { endpoints } from "@/services/endpoints";
import rootApi from "@/services/rootApi";

const useDeletePlanQuestionOption = () => {
  const query = useQueryClient();
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (id: string) => {
      return rootApi.delete(endpoints.API.PLAN_QUESTION.DELETE_OPTION(id));
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [endpoints.API.PLAN_QUESTION.BY_ID("")],
      });
      query.invalidateQueries({
        queryKey: [endpoints.API.PLAN_QUESTION.ALL],
      });
      addToast({
        title: "Option deleted successfully",
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

export default useDeletePlanQuestionOption;

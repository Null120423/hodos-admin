import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { endpoints } from "@/services/endpoints";
import rootApi from "@/services/rootApi";

const useCreatePlanQuestion = () => {
  const query = useQueryClient();
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables: any) => {
      return rootApi.post(endpoints.API.PLAN_QUESTION.CREATE, variables);
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [endpoints.API.PLAN_QUESTION.ALL],
      });

      addToast({
        title: "Question created successfully",
        color: "success",
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

export default useCreatePlanQuestion;

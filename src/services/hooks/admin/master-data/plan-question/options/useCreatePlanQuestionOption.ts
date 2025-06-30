import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { endpoints } from "@/services/endpoints";
import rootApi from "@/services/rootApi";

const useCreatePlanQuestionOption = () => {
  const query = useQueryClient();
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables: any) => {
      return rootApi.post(endpoints.API.PLAN_QUESTION.CREATE_OPTION, variables);
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [endpoints.API.PLAN_QUESTION.BY_ID("")],
      });
      query.invalidateQueries({
        queryKey: [endpoints.API.PLAN_QUESTION.ALL],
      });

      addToast({
        title: "Option created successfully",
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

export default useCreatePlanQuestionOption;

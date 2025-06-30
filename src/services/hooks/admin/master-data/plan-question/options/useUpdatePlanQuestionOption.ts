import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { endpoints } from "@/services/endpoints";
import rootApi from "@/services/rootApi";

const useUpdatePlanQuestionsOption = () => {
  const query = useQueryClient();
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables: any) => {
      return rootApi.patch(
        endpoints.API.PLAN_QUESTION.UPDATE_OPTION(variables.id),
        variables,
      );
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [endpoints.API.PLAN_QUESTION.BY_ID("")],
      });
      query.invalidateQueries({
        queryKey: [endpoints.API.PLAN_QUESTION.ALL],
      });
      addToast({
        title: "Question update successfully",
        color: "success",
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

export default useUpdatePlanQuestionsOption;

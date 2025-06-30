import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { endpoints } from "@/services/endpoints";
import rootApi from "@/services/rootApi";

const useUpdatePricingPlan = () => {
  const query = useQueryClient();
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables: any) => {
      return rootApi.patch(
        endpoints.API.PRICING_PLAN.UPDATE(variables.id),
        variables,
      );
    },
    onSuccess: (res: any) => {
      query.invalidateQueries({
        queryKey: [endpoints.API.PRICING_PLAN.ALL],
      });
      addToast({
        title: res?.message || "Pricing plan update successfully",
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

export default useUpdatePricingPlan;

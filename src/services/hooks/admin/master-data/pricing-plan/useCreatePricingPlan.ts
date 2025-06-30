import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { endpoints } from "@/services/endpoints";
import rootApi from "@/services/rootApi";

const useCreatePricingPlan = () => {
  const query = useQueryClient();
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables: any) => {
      return rootApi.post(endpoints.API.PRICING_PLAN.CREATE, variables);
    },
    onSuccess: (res: any) => {
      query.invalidateQueries({
        queryKey: [endpoints.API.PRICING_PLAN.ALL],
      });
      addToast({
        title: res?.message || "Pricing plan created successfully",
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

export default useCreatePricingPlan;

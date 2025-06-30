import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { endpoints } from "@/services/endpoints";
import rootApi from "@/services/rootApi";

const useDeletePricingPlan = () => {
  const query = useQueryClient();
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (id: string) => {
      return rootApi.delete(endpoints.API.PRICING_PLAN.DELETE(id));
    },
    onSuccess: () => {
      addToast({
        title: "Pricing plan deleted successfully",
        color: "success",
      });
      query.invalidateQueries({
        queryKey: [endpoints.API.PRICING_PLAN.ALL],
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

export default useDeletePricingPlan;

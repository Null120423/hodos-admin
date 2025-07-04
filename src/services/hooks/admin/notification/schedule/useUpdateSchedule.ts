import { useMutation, useQueryClient } from "@tanstack/react-query";

import { endpoints } from "@/services/endpoints";
import rootApi from "@/services/rootApi";

const useBlogUpdate = () => {
  const query = useQueryClient();
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables: any) => {
      return rootApi.patch(
        endpoints.API.NOTIFICATION.SCHEDULE_UPDATE,
        variables
      );
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [endpoints.API.NOTIFICATION.SCHEDULE_PAGINATION],
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

export default useBlogUpdate;

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { endpoints } from "@/services/endpoints";
import rootApi from "@/services/rootApi";

const useCreateSchedule = () => {
  const query = useQueryClient();
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables: any) => {
      return rootApi.post(
        endpoints.API.NOTIFICATION.SCHEDULE_CREATE,
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
    onCreate: mutateAsync,
  };
};

export default useCreateSchedule;

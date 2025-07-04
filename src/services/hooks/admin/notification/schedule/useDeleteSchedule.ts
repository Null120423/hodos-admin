import { useMutation, useQueryClient } from "@tanstack/react-query";

import { endpoints } from "@/services/endpoints";
import rootApi from "@/services/rootApi";

const useDeleteSchedule = () => {
  const query = useQueryClient();
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (id: string) => {
      return rootApi.delete(endpoints.API.NOTIFICATION.SCHEDULE_DELETE(id));
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
    onDelete: mutateAsync,
  };
};

export default useDeleteSchedule;

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { endpoints } from "@/services/endpoints";
import rootApi from "@/services/rootApi";

const useSendScheduleNotification = () => {
  const query = useQueryClient();
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (id: string) => {
      return rootApi.patch(endpoints.API.NOTIFICATION.SCHEDULE_SEND(id), {});
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
    onSend: mutateAsync,
  };
};

export default useSendScheduleNotification;

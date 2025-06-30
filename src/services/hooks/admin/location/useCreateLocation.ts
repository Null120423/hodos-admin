import { useMutation, useQueryClient } from "@tanstack/react-query";

import { endpoints } from "../../../endpoints";
import rootApi from "../../../rootApi";

const useCreateLocation = () => {
  const query = useQueryClient();

  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables) => {
      return rootApi.post(endpoints.API.LOCATION.CREATE, variables);
    },
    onSuccess: (res) => {
      query.invalidateQueries({
        queryKey: [endpoints.API.LOCATION.PAGINATION],
      });
      query.invalidateQueries({
        queryKey: [endpoints.API.DASHBOARD.DATA],
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

export default useCreateLocation;

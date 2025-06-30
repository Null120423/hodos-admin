import { useMutation, useQueryClient } from "@tanstack/react-query";

import { endpoints } from "../../../endpoints";
import rootApi from "../../../rootApi";
const useSoftRemoveLocation = () => {
  const query = useQueryClient();
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables: any) => {
      return rootApi.delete(
        endpoints.API.LOCATION.REMOVE_SOFT + "/" + variables.id
      );
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
    onRemove: mutateAsync,
  };
};
export default useSoftRemoveLocation;

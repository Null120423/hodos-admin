import { useMutation, useQueryClient } from "@tanstack/react-query";

import { endpoints } from "../../../endpoints";
import rootApi from "../../../rootApi";

const useForceDelete = () => {
  const query = useQueryClient();
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (id) => {
      return rootApi.delete(endpoints.API.BLOG.FORCE_DELETE + "/" + id);
    },
    onSuccess: (res) => {
      query.invalidateQueries({
        queryKey: [endpoints.API.BLOG.PAGINATION],
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

export default useForceDelete;

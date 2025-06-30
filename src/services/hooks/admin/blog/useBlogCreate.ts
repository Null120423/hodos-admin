import { useMutation, useQueryClient } from "@tanstack/react-query";

import { endpoints } from "../../../endpoints";
import rootApi from "../../../rootApi";

const useBlogCreate = () => {
  const query = useQueryClient();
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables) => {
      return rootApi.post(endpoints.API.BLOG.CREATE, variables);
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
    onCreate: mutateAsync,
  };
};

export default useBlogCreate;

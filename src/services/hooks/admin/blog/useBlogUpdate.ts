import { useMutation, useQueryClient } from "@tanstack/react-query";

import { endpoints } from "../../../endpoints";
import rootApi from "../../../rootApi";

const useBlogUpdate = () => {
  const query = useQueryClient();
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables: any) => {
      return rootApi.patch(endpoints.API.BLOG.UPDATE, variables);
    },
    onSuccess: () => {
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
    onUpdate: mutateAsync,
  };
};

export default useBlogUpdate;

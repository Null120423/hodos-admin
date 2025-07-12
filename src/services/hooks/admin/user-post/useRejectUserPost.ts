import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { endpoints } from "@/services/endpoints";
import rootApi from "@/services/rootApi";

const useRejectUserPost = () => {
  const query = useQueryClient();
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables: any) => {
      const url = endpoints.API.USER_POST.REJECT(variables.id);

      return rootApi.patch(url, variables);
    },
    onSuccess: (res: any) => {
      addToast({
        title: "Success!",
        description: res?.message,
        color: "success",
      });
      query.invalidateQueries({
        queryKey: [endpoints.API.USER_POST.PAGINATION],
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

export default useRejectUserPost;

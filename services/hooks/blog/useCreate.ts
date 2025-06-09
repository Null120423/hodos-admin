import { endpoints } from "@/services/endpoints";
import rootApi from "@/services/rootApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useCreateBlog = () => {
  const router = useRouter();
  const query = useQueryClient();
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables) => {
      return rootApi.post(endpoints.API.BLOG.CREATE, variables);
    },

    onSuccess: (res) => {
      //   query.invalidateQueries([endpoints.API.BLOG.PAGINATION]);
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

export default useCreateBlog;

import { useMutation } from "react-query";
import { endpoints } from "../../endpoints";
import rootApi from "../../rootApi";

// import axios from "axios";
const useDataService = () => {
    const { isLoading, isError, data, error, mutate } = useMutation(
        () => {
            return rootApi.get(endpoints.API.LOCATION.GET_ALL, {
                params: {
                    id: 'all'
                }
            })
        }
    );
    return {
        isLoading,
        isError,
        data,
        error,
        mutate,
    };
};

export default useDataService;

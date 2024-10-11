import { useMutation } from "react-query";
import { endpoints } from "../../endpoints";
import rootApi from "../../rootApi";

const useDataService = () => {
    const mutation = useMutation(
        {
            mutationFn: (data) => {
                console.log('data from useDataService', data);
                return rootApi.post(endpoints.API.FOOD.CREATE_MORE, data);
            },

        }
    
    );
    return mutation;
};

export default useDataService;
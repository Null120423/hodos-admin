import { useMutation } from 'react-query';
import { endpoints } from '../../endpoints';
import rootApi from '../../rootApi';

const useDataService = () => {
  const mutation = useMutation((data) => {
    console.log('data from useDataService', data);
    return rootApi.post(endpoints.API.LOCATION.CREATE_MORE, data);
  });
  ``;
  return mutation;
};

export default useDataService;

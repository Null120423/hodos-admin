import React, { useEffect } from 'react';
import { Breadcrumb } from 'rsuite';
import { useDebounce } from 'use-debounce';
import PaginationCustom from '../../../components/pagination';
import useLocationPagination from '../../../service/hooks/admin/location/useLocationPagination';
import Filter from './components/filter';
import LocationTable from './components/table';

const LocationScreen = () => {
  const [where, setWhere] = React.useState({
    where: {
      name: '',
    },
    skip: 0,
    take: 5,
  });

  const { data, refetch, total, isLoading } = useLocationPagination(where);

  const [debouncedName] = useDebounce(where.name, 5000);

  useEffect(() => {
    refetch();
  }, [refetch, debouncedName]);

  useEffect(() => {
    refetch();
  }, [refetch, where.skip, where.take]);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href='/'>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href='/location-manager' active>
          Location-manager
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className='p-2 rounded-md bg-white shadow-md'>
        <Filter
          onChange={(txt) => {
            setWhere({
              ...where,
              where: {
                name: txt,
              },
            });
          }}
        />
        <LocationTable take={where.take} isLoading={isLoading} data={data} />
        <PaginationCustom
          onChangeLimit={(take) =>{
            setWhere({
              ...where,
              take: take,
            })
         }}
          total={total}
          onChangePage={(page) =>
            setWhere({
              ...where,
              skip: (page - 1) * where.take,
            })
          }
        />
      </div>
    </>
  );
};
export default LocationScreen;

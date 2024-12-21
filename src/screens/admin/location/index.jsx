import React, { useEffect } from 'react';
import { Breadcrumb, Loader } from 'rsuite';
import { useDebounce } from 'use-debounce';
import PaginationCustom from '../../../components/pagination';
import useLocationPagination from '../../../service/hooks/admin/location/useLocationPagination';
import Filter from './components/filter';
import LocationTable from './components/table';

const LocationScreen = () => {
  const [where, setWhere] = React.useState({
    where: {
      name: '',
      type: ''
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
        valueFilter={where?.where}
          onChange={(val) => {
            setWhere({
              ...where,
              where: {
               ...val
              },
            });
          }}
        />
        <LocationTable take={where.take} isLoading={isLoading} data={data} />
        {
          isLoading && <Loader/>
        }
       {
        !isLoading &&  <PaginationCustom
          onChangeLimit={(take) => {
            setWhere({
              ...where,
              take: take,
            });
          }}
          total={total}
          onChangePage={(page) =>
            setWhere({
              ...where,
              skip: (page - 1) * where.take,
            })
          }
        />
       }
      </div>
    </>
  );
};
export default LocationScreen;

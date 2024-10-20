import React, { useEffect } from 'react';
import { Breadcrumb } from 'rsuite';
import { useDebounce } from 'use-debounce';
import PaginationCustom from '../../../components/pagination';
import useFoodPagination from '../../../service/hooks/admin/food/useFoodPagination';
import Filter from './components/filter';
import FoodTable from './components/table';

const FoodScreen = () => {
  const [where, setWhere] = React.useState({
    where: {
      name: '',
    },
    skip: 0,
    take: 5,
  });
  const [name, setName] = React.useState('');
  const { data, refetch, total, isLoading } = useFoodPagination(where);
  const [debouncedName] = useDebounce(name, 200);

  useEffect(() => {
    setWhere({
      ...where,
      where: {
        name: name,
      },
    });
    refetch();
  }, [refetch, debouncedName]);

  useEffect(() => {
    refetch();
  }, [refetch, where.skip, where.take]);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href='/'>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href='/food-manager' active>
          Food-manager
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className='p-2 rounded-md bg-white shadow-md'>
        <Filter
          onChange={(txt) => {
            setName(txt);
          }}
        />
        <FoodTable take={where.take} isLoading={isLoading} data={data} />
        <PaginationCustom
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
      </div>
    </>
  );
};
export default FoodScreen;

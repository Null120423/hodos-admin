import moment from 'moment/moment';
import React, { useEffect } from 'react';
import { Breadcrumb } from 'rsuite';
import { useDebounce } from 'use-debounce';
import PaginationCustom from '../../../components/pagination';
import { ADMIN_ROUTES } from '../../../routes/endpoint';
import useErrorLogPagination from '../../../service/hooks/admin/log/useErrorLogPagination';
import Filter from './components/filter';
import LocationTable from './components/table';

const ErrorLogScreen = () => {
  const [where, setWhere] = React.useState({
    where: {
     buildDate: null
    },
    skip: 0,
    take: 5,
  });

  const { data, refetch, total, isLoading } = useErrorLogPagination(where);

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
        <Breadcrumb.Item href={ADMIN_ROUTES.ERROR_LOGS} active>
          Error log manager
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className='p-2 rounded-md bg-white shadow-md'>
        <Filter onChangeValue={val => {
             setWhere({
            ...where,
          where: {
            logDate:val ?  moment(val) : null
          }
          })
        }}/>
          <LocationTable take={where.take} isLoading={isLoading} data={data} />
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
export default ErrorLogScreen;

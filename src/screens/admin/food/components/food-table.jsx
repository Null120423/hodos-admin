import React, { useEffect } from 'react';
import useDataService from '../../../../service/hooks/admin/useFoodData';
import { Loader, Stack, Table, Pagination } from 'rsuite';
// import { endpoints } from '../../../../service/endpoints';
// import { set } from 'rsuite/esm/internals/utils/date';
// import { mockUsers } from './mock';

const { Column, HeaderCell, Cell } = Table;
// const data = mockUsers(10);

const columns = [
  {
    key: 'name',
    label: 'Name',
    flexGrow: 1
  },
  {
    key: 'image',
    label: 'Image',
    flexGrow: 1
  },
  {
    key: 'price',
    label: 'Price',
    flexGrow: 1
  },
  {
    key: 'address',
    label: 'Address',
    flexGrow: 1
  },
  {
    key: 'description',
    label: 'Description',
    flexGrow: 1
  }
];

// const loaderContainerStyle = {
//   position: 'absolute',
//   width: '100%',
//   height: '100%',
//   background: 'var(--rs-bg-card)',
//   padding: 20,
//   zIndex: 1
// };

const FoodTableManager = () => {
  const [loading, setLoading] = React.useState(true);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [foodData, setFoodData] = React.useState([]);
  const { isError, data, error, mutate } = useDataService();

  const handleChangeLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  };

  const paginationData = foodData.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  useEffect(() => {
    setLoading(true);
    mutate();
  }, [mutate]);

  useEffect(() => {
    const dataArray = data?.data?.data || [];
    const result = Array.isArray(dataArray) && dataArray.length > 0 ? dataArray.map((item) => ({
      name: item.name,
      image: item.lstImgs.length > 1 ? item.lstImgs.join(', ') : item.lstImgs,
      price: item.rangePrice.length > 1 ? item.rangePrice.join(', ') : item.rangePrice,
      address: item.address,
      description: item.description
    })) : [];
    setFoodData(result);
    if (data || isError) {
      setLoading(false);
    }
  }, [data, isError]);

  const renderLoading = () => {
    return <Loader center backdrop content="Loading..." />;
  };

  return (
    <div className='w-full'>
      <Stack>
        {isError && <div>{error?.response?.data?.message || 'Đã có lỗi xảy ra'}</div>}
      </Stack>

      <hr />

      <Table loading={loading} height={500} data={paginationData} renderLoading={renderLoading}>
        {columns.map(column => {
          const { key, label, ...rest } = column;
          return (
            <Column {...rest} key={key} fullText>
              <HeaderCell>{label}</HeaderCell>
              <Cell dataKey={key} />
            </Column>
          );
        })}
      </Table>
      <div style={{ padding: 20 }}>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="xs"
          layout={['total', '-', 'limit', '|', 'pager', 'skip']}
          total={foodData.length}
          limitOptions={[10, 30, 50]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </div>
    </div>
  );
};


export default FoodTableManager
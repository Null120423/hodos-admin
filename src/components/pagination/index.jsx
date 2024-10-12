import React, { useEffect } from 'react';
import { Pagination } from 'rsuite';

const limitOptions = [5, 10, 15];

const PaginationCustom = ({ total, onChangePage, onChangeLimit }) => {
  const [prev] = React.useState(true);
  const [next] = React.useState(true);
  const [first] = React.useState(true);
  const [last] = React.useState(true);
  const [ellipsis] = React.useState(true);
  const [boundaryLinks] = React.useState(true);
  const [activePage, setActivePage] = React.useState(1);
  const [size] = React.useState('md');
  const [maxButtons] = React.useState(5);
  const [layout] = React.useState(['total', '-', 'limit', '|', 'pager']);
  const [limit, setLimit] = React.useState(5);

  useEffect(() => {
    onChangePage(activePage);
  }, [activePage]);
  useEffect(() => {
    onChangeLimit(limit);
  }, [limit]);

  return (
    <Pagination
      className='bg-white rounded-b-md p-2 mt-2'
      layout={layout}
      size={size}
      prev={prev}
      next={next}
      first={first}
      last={last}
      ellipsis={ellipsis}
      boundaryLinks={boundaryLinks}
      total={total}
      limit={limit}
      limitOptions={limitOptions}
      maxButtons={maxButtons}
      activePage={activePage}
      onChangePage={setActivePage}
      onChangeLimit={setLimit}
    />
  );
};

export default PaginationCustom;

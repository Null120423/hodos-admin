import React, { useEffect } from 'react';
import { Breadcrumb } from 'rsuite';
import { useDebounce } from 'use-debounce';
import PaginationCustom from '../../../components/pagination';
import { ADMIN_ROUTES } from '../../../routes/endpoint';
import { useRouter } from '../../../routes/hooks/use-router';
import useBlogPagination from '../../../service/hooks/admin/blog/useBlogPagination';
import BlogView from './child/components/blog-view';
import HeaderBlogManager from './child/components/header';

function BlogManagerScreen() {
  const [where, setWhere] = React.useState({
    where: {
      searchKey: '',
    },
    skip: 0,
    take: 9,
  });
  const [searchKey, setSearchKey] = React.useState('');
  const router = useRouter();
  const { total, data, isLoading } = useBlogPagination(where);
  const [debouncedName] = useDebounce(searchKey, 5000);

  useEffect(() => {
    setWhere({
      ...where,
      where: {
        searchKey: searchKey,
      },
    });
  }, [debouncedName]);
  return (
    <>
      {' '}
      <Breadcrumb>
        <Breadcrumb.Item
          onClick={() => {
            router.replace(ADMIN_ROUTES.DASHBOARD);
          }}
        >
          DashBoard
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Blog</Breadcrumb.Item>
      </Breadcrumb>
      <div className='bg-white'>
        <HeaderBlogManager
          onChangeSearch={(val) => {
            setSearchKey(val);
          }}
        />

        <BlogView data={data} isLoading={isLoading} />
        <PaginationCustom
          limitOptions={[3, 9]}
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
}

export default BlogManagerScreen;

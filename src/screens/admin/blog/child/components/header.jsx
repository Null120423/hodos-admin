import PlusIcon from '@rsuite/icons/Plus';
import { Button, Input } from 'rsuite';
import { ADMIN_ROUTES } from '../../../../../routes/endpoint';
import { useRouter } from '../../../../../routes/hooks/use-router';
function HeaderBlogManager({ onChangeSearch = () => {} }) {
    const router = useRouter()
  return (
    <div className='flex p-4 rounded-lg gap-4 bg-white justify-between items-center'>
      <Input onChange={onChangeSearch} placeholder='Search by title, tags, content, ...' />
      <Button onClick={() => router.push(ADMIN_ROUTES.BLOG_MANAGER_CREATE)} appearance='primary' startIcon={<PlusIcon />}>
        Create new
      </Button>
    </div>
  );
}

export default HeaderBlogManager;

import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine';
import { Breadcrumb, Button } from 'rsuite';
function PreviewScreen({ data, onReturn }) {
  return (
    <div className='w-full overflow-hidden'>
      <Breadcrumb>
        <Breadcrumb.Item>Blog</Breadcrumb.Item>
        <Breadcrumb.Item onClick={onReturn}>Create</Breadcrumb.Item>
        <Breadcrumb.Item active>Preview</Breadcrumb.Item>
      </Breadcrumb>
        <Button appearance='primary' startIcon={<ArrowLeftLineIcon/>}onClick={onReturn}>Return</Button>

      <h1 className='text-3xl'>{data.title}</h1>

      <div className='flex'>
        {data.tags.map((tag, index) => (
          <span key={index} className='bg-gray-200 p-2 rounded-md mr-2'>
            {tag}
          </span>
        ))}
      </div>
      <div className='mt-4' dangerouslySetInnerHTML={{ __html: data.content }}></div>
    </div>
  );
}

export default PreviewScreen;

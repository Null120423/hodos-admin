import PcIcon from '@rsuite/icons/Pc';
import PlusIcon from '@rsuite/icons/Plus';
import { memo, useRef, useState } from 'react';
import { Breadcrumb, Button, Input, Loader, Uploader } from 'rsuite';
import Editor from '../../../../../components/RichtextEditor';
import TagInput from '../../../../../components/tag-input';
import { useToast } from '../../../../../contexts/toast.context';
import { ADMIN_ROUTES } from '../../../../../routes/endpoint';
import { useRouter } from '../../../../../routes/hooks/use-router';
import useCreateBlog from '../../../../../service/hooks/admin/blog/useCreate';
import PreviewScreen from '../preview';
function Create() {
  const { onCreate, isLoading } = useCreateBlog();
  const { showToast } = useToast();
  const [isPreview, setIsPreview] = useState(false);
  const editorRef = useRef(null);
  const [state, setState] = useState({
    title: '',
    tags: [],
    thumbnail: '',
  });
  const router = useRouter();

  const handleCreate = () => {
    const content = editorRef.current.getContent();
    console.log({
        content
    })
    const messageErr = [];
    if (state.title === '') {
      messageErr.push('title ');
    }
    if (content === '') {
      messageErr.push('content');
    }
    if (state.thumbnail === '') {
      messageErr.push('thumbnail');
    }
    if (messageErr.length > 0) {
      showToast(
        messageErr.join('\n').substring(0, 1).toUpperCase() +
          messageErr.join('\n').substring(1).toLowerCase() +
          ' is required',
        { type: 'error' },
      );
      return;
    }
    const body = {
      title: state.title,
      tags: state.tags.join(','),
      content: content,
      thumbnail: state.thumbnail,
    };
    onCreate(body);
  };


  return (
    <>
      {isPreview && (
        <PreviewScreen
          data={state}
          onReturn={() => {
            setIsPreview(!isPreview);
          }}
        />
      )}
      <div className={isPreview ? 'hidden' : 'block'}>
        <Breadcrumb>
          <Breadcrumb.Item
            onClick={() => {
              router.replace(ADMIN_ROUTES.BLOG_MANAGER);
            }}
          >
            Blog
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Create</Breadcrumb.Item>
        </Breadcrumb>
        <Button
          onClick={() => {
            setIsPreview(!isPreview);
          }}
          startIcon={<PcIcon />}
          appearance='primary'
          className='mb-2'
        >
          Preview
        </Button>
        <div className='flex flex-col gap-2'>
          <Input
            value={state.title}
            onChange={(val) => {
              setState({ ...state, title: val });
            }}
            placeholder='enter title'
          />
          <TagInput
            initValue={state.tags}
            onChangeValue={(val) => {
              setState({ ...state, tags: val });
            }}
          />
        <div>
            <Uploader
            multiple={false}
            listType='picture-text'
            onSuccess={(res) => {
                setState({ ...state, thumbnail: res.url });
            }}
            action='https://hodos-api.genny.id.vn/common/upload-image'
            >
                <Button appearance='ghost' icon={<PlusIcon/>}>Choose thumbnail</Button>
            </Uploader>
            <label>or</label>
            <Input
            placeholder='Enter thumbnail URL'
            value={state.thumbnail}
            onChange={val => {
                setState({ ...state, thumbnail: val });
            }}
            />
        </div>

          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-2'>
        <Editor ref={editorRef} onChangeValue={(content) => setState({ ...state, content })} />
      </div>
          </div>

          <div className='flex w-full justify-start items-center gap-2'>
            <Button
              appearance='ghost'
              onClick={() => {
                router.back();
              }}
            >
              Return
            </Button>
            <Button onClick={handleCreate} startIcon={<PlusIcon />} appearance='primary' disabled={isLoading}>
              {isLoading && <Loader className='mr-2' />}
              {!isLoading ? 'Create' : 'Creating...'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Create);

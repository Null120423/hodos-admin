import EditIcon from '@rsuite/icons/Edit';
import TrashIcon from '@rsuite/icons/Trash';
import { useEffect } from 'react';
import { IconButton } from 'rsuite';
import ModalConfirm from '../../../../../components/modal-confirm';
import { useLoading } from '../../../../../contexts/loading-global';
import { useModal } from '../../../../../contexts/modal.context';
import useForceDelete from '../../../../../service/hooks/admin/blog/useForceDelete';
import DetailView from './detail-view';
function Skeletion() {
  return (
    <div className='grid grid-cols-3 gap-5 p-4'>
      <div className='bg-gray-200 h-[10rem] animate-pulse rounded-md'></div>
      <div className='bg-gray-200 h-[10rem] animate-pulse rounded-md'></div>
      <div className='bg-gray-200 h-[10rem] animate-pulse rounded-md'></div>
      <div className='bg-gray-200 h-[10rem] animate-pulse rounded-md'></div>
      <div className='bg-gray-200 h-[10rem] animate-pulse rounded-md'></div>
      <div className='bg-gray-200 h-[10rem] animate-pulse rounded-md'></div>
      <div className='bg-gray-200 h-[10rem] animate-pulse rounded-md'></div>
      <div className='bg-gray-200 h-[10rem] animate-pulse rounded-md'></div>
      <div className='bg-gray-200 h-[10rem] animate-pulse rounded-md'></div>
    </div>
  );
}

const Item = ({ data }) => {
    const {startLoading,stopLoading} = useLoading()
    const {openModal} = useModal()
    const {onDelete, isLoading} = useForceDelete()
    const handleConfirmDelete = (e) => {
        e.stopPropagation()
        openModal(<ModalConfirm onConfirm={() => onDelete(data.id)} isLoading={isLoading} />, 'Confirm before remove?')
    }

    useEffect(() => {
        if(isLoading){
            startLoading()
        }else {
            stopLoading()
        }
    }, [isLoading])
  return (
    <div onClick={()=> {
        openModal(<DetailView data={data} />, data.title)
    }} className=' cursor-pointer group relative transition-all h-fit min-h-[10rem] hover:shadow-md bg-white rounded-md border-black/10 border-solid border-[1px] p-4'>
      <div className='flex justify-between'>
        <div className='flex gap-2 w-full'>
          <h1 className='text-xl font-semibold w-1/3'>{data.title}</h1>
          <img src={data.thumbnail} alt='thumbnail' className='h-[8rem] object-cover rounded-md mt-2' />
          <div className='flex'>
            {data.tags?.split(',').map((tag, index) => (
              <span key={index} className='bg-gray-200 p-2 rounded-md mr-2'>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
        <div className='hidden absolute right-2 top-2 group-hover:flex gap-2 justify-end w-full'>
          <IconButton color="blue" appearance="primary"  icon={<EditIcon />}/>
          <IconButton onClick={handleConfirmDelete}  color="red" appearance="primary" icon={<TrashIcon />}/>
        </div>
    </div>
  );
};
function BlogView({ data, isLoading }) {
  if (isLoading) {
    return <Skeletion />;
  }
  return (
    <>
      <div className='grid grid-cols-3 gap-5 p-4 min-h-[30rem]'>
        {data?.map((item, index) => (
          <Item key={index} data={item} />
        ))}
      </div>
    </>
  );
}

export default BlogView;

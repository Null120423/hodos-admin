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
    }} className='h-[14rem] cursor-pointer overflow-hidden group relative transition-all min-h-[5rem] hover:shadow-md bg-white rounded-xl'>
      <img src={data.thumbnail} alt='thumbnail' className='rounded-xl object-cover ' />
      <div className='flex justify-between  absolute right-0 rounded-tl-xl p-4 rounded-xl bottom-0 left-0 bg-black/5 backdrop-blur-md'>
        <div className='flex flex-col gap-2 w-full'>
          <h1 className='text-2xl font-semibold text-white'>{data.title}</h1>
          <div className='flex'>
            {data.tags?.split(',').map((tag, index) => (
              <span key={index} className='bg-gray-200 p-2 rounded-md mr-2'>
                {tag}
              </span>
            ))}
          </div>

              <div className=' h-10 flex gap-2 justify-start w-full'>
          <IconButton color="blue" appearance="primary"  icon={<EditIcon />}/>
          <IconButton onClick={handleConfirmDelete}  color="red" appearance="primary" icon={<TrashIcon />}/>
        </div>
        </div>
        
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
      <div className='grid grid-cols-5 gap-5 p-4 min-h-[30rem]'>
        {data?.map((item, index) => (
          <Item key={index} data={item} />
        ))}
      </div>
    </>
  );
}

export default BlogView;

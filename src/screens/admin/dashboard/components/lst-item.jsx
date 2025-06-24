import { Button, Carousel } from 'rsuite';
import { useModal } from '../../../../contexts/modal.context';
function LstItem({ data }) {
  const { openModal } = useModal();
  return (
    <div className='recommend-food grid grid-cols-3 gap-10'>
      {data &&
        data.map((item, index) => {
          return (
            <Item
              onClick={() => {
                openModal(<DetailItem item={item} />, 'Food Detail [' + item?.name + ']');
              }}
              key={index}
              item={item}
            />
          );
        })}
    </div>
  );
}

const Item = ({ item, ...props }) => {
  return (
    <div className='relative mt-32' {...props}>
      <div className='w-[10rem] absolute left-1/2 -top-1/3 -translate-x-1/2  h-32 rounded-full border-[10px] border-blue-600'>
        <img className='w-full h-full object-cover rounded-full' src={item?.lstImgs[0]} alt='loading...' />
      </div>
      <div className={`bg-white rounded-3xl p-4 pt-20 hover:shadow-2xl`}>
        <h3 className='text-2xl font-bold'>{item?.name}</h3>
        <p>{item?.description?.slice(0, 100) + '...'}</p>
        <Button appearance='primary' size='lg' className='w-full mt-2'>
          Watch detail
        </Button>
      </div>
    </div>
  );
};

export const DetailItem = ({ item, ...props }) => {
  return (
    <div {...props} className='max-w-[40rem]'>
      <Carousel autoplay className='custom-slider'>
        {item?.lstImgs[0].map((img, index) => {
          return <img className='rounded-lg shadow-md ' key={index} src={img} height='250' />;
        })}
      </Carousel>
      <div className={`bg-white rounded-3xl p-4`}>
        <h3 className='text-2xl font-bold'>{item?.name}</h3>
        <p>{item?.description}</p>
      </div>
    </div>
  );
};

export default LstItem;

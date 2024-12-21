import { Loader } from 'rsuite';

function LoadingView() {
  return (
    <div className='flex flex-col gap-2 w-full h-full justify-center items-center'>
      <Loader/>
      <h1>Loading ...</h1>
    </div>
  );
}

export default LoadingView;

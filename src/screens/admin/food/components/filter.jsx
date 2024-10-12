import { Button } from 'rsuite';
import SearchInput from '../../../../components/search-input';

function Filter({ onChange = () => {} }) {
  return (
    <div className='w-full flex justify-start items-center p-2 gap-2'>
      <div className='p-2 w-full flex justify-center items-center mt-[10px]'>
        <SearchInput onChange={(txt) => onChange(txt)} placeholder='Search by name, label, address, description, ...' />
      </div>
      <div className='flex justify-end items-center gap-2'>
        <Button appearance='primary'>Add</Button>
      </div>
    </div>
  );
}

export default Filter;

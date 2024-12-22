import { DatePicker } from 'rsuite';
function Filter({onChangeValue}) {
  return (
    <div className='w-full flex justify-start items-center p-2 gap-2'>
      <DatePicker onChange={onChangeValue} placeholder="Select error log date" style={{
        width: '20rem'
      }}/>
    </div>
  );
}

export default Filter;

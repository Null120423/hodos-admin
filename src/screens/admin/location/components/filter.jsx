import PlusIcon from '@rsuite/icons/Plus';
import { useRef } from 'react';
import { Button, Loader } from 'rsuite';
import UploadIcon from '../../../../assets/svg/upload-icon';
import SearchInput from '../../../../components/search-input';
import { useModal } from '../../../../contexts/modal.context';
import useCreateLocation from '../../../../service/hooks/admin/location/useCreate';
import FormCreateLocation from './form-create';

function Filter({ onChange = () => {} }) {
  const { openModal } = useModal();
  const inputRef = useRef();
  const { onCreate, isLoading } = useCreateLocation();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      const body = {
        locations: JSON.parse(text),
      };
      onCreate(body);
      inputRef.current.value = '';
    };
    reader.readAsText(file);
  };
  return (
    <div className='w-full flex justify-start items-center p-2 gap-2'>
      <div className='p-2 w-full flex justify-center items-center mt-[10px]'>
        <SearchInput onChange={(txt) => onChange(txt)} placeholder='Search by name, label, address, description, ...' />
      </div>
      <div className='flex justify-end items-center gap-2'>
        <input className='hidden' type='file' ref={inputRef} onChange={handleUpload} accept='.json' />
        <Button onClick={() => {
          inputRef.current.click();
        }} startIcon={<UploadIcon />}>
          {isLoading && <Loader className='mr-2' />}
          Upload by json
        </Button>
        <Button startIcon={<UploadIcon />}>Upload by excel</Button>
        <Button
          startIcon={<PlusIcon />}
          onClick={() => {
            openModal(<FormCreateLocation />, 'Create new location');
          }}
          appearance='primary'
        >
          Create new
        </Button>
      </div>
    </div>
  );
}

export default Filter;

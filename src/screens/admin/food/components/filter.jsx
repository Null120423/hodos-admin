import PlusIcon from '@rsuite/icons/Plus';
import { useEffect, useRef } from 'react';
import { Button } from 'rsuite';
import UploadIcon from '../../../../assets/svg/upload-icon';
import DownloadTemplateBtn from '../../../../components/download-template-btn';
import ReadFileExcelBtn from '../../../../components/read-file-excel';
import SearchInput from '../../../../components/search-input';
import { useLoading } from '../../../../contexts/loading-global';
import { useModal } from '../../../../contexts/modal.context';
import { useToast } from '../../../../contexts/toast.context';
import useCreateMultiFood from '../../../../service/hooks/admin/food/useCreateMulti';
import FormCreateFood from './form-create';
function Filter({ onChange = () => {} }) {
  const { startLoading, stopLoading } = useLoading();
  const { openModal } = useModal();
  const inputRef = useRef();
  const { onCreate, isLoading } = useCreateMultiFood();
  const { showToast } = useToast();

  const handleUpload = (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const text = event.target?.result;
          const body = {
            foods: JSON.parse(text),
          };
          onCreate(body);
          inputRef.current.value = ''; // Clear the input value
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError);
          showToast('Error parsing JSON', { type: 'error' });
        }
      };
      reader.readAsText(file);
    } catch (error) {
      console.error('Error reading file:', error);
      showToast('Error reading file', { type: 'error' });
    }
  };

  useEffect(() => {
    if (isLoading) {
      startLoading();
    } else {
      stopLoading();
    }
  }, [isLoading]);

  return (
    <div className='w-full flex justify-start items-center p-2 gap-2'>
      <div className='p-2 w-full flex justify-center items-center mt-[10px]'>
        <SearchInput onChange={(txt) => onChange(txt)} placeholder='Search by name, label, address, description, ...' />
      </div>
      <input className='hidden' type='file' ref={inputRef} onChange={handleUpload} accept='.json' />
      <div className='flex justify-end items-center gap-2'>
        <Button
          disabled={isLoading}
          onClick={() => {
            inputRef.current.value = '';
            inputRef.current.click();
          }}
          startIcon={<UploadIcon />}
        >
          Upload by json
        </Button>
        <DownloadTemplateBtn
          keys={['name', 'label', 'longitude', 'latitude', 'lstImgs', 'address', 'description', 'MinPrice', 'MaxPrice']}
        />
        <ReadFileExcelBtn
          onResult={(data) => {
            onCreate({ foods: data });
          }}
        />
        <Button
          disabled={isLoading}
          startIcon={<PlusIcon />}
          appearance='primary'
          onClick={() => {
            openModal(<FormCreateFood />, 'Create new food');
          }}
        >
          Create new{' '}
        </Button>
      </div>
    </div>
  );
}

export default Filter;

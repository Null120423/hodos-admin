import PlusIcon from '@rsuite/icons/Plus';
import { useRef } from 'react';
import { Button, Loader, SelectPicker } from 'rsuite';
import UploadIcon from '../../../../assets/svg/upload-icon';
import DownloadTemplateBtn from '../../../../components/download-template-btn';
import ReadFileExcelBtn from '../../../../components/read-file-excel';
import SearchInput from '../../../../components/search-input';
import { useModal } from '../../../../contexts/modal.context';
import { useToast } from '../../../../contexts/toast.context';
import useCreateLocation from '../../../../service/hooks/admin/location/useCreate';
import FormCreateLocation from './form-create';
const typesLocation = [{
  label: 'Location',
  value: 'LOCATION',
}, {
    label: 'Food',
  value: 'FOOD',
}].map(
  item => ({ label: item?.label, value: item?.value })
);
function Filter({ onChange = () => {} ,valueFilter }) {
  const { openModal } = useModal();
  const inputRef = useRef();
  const { onCreate, isLoading } = useCreateLocation();
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
  return (
    <div className='w-full flex justify-start items-center p-2 gap-2'>
      <div className='p-2 w-full flex justify-center items-center mt-[10px]'>
        <SearchInput onChange={(val) => onChange({ ...valueFilter, name: val })} placeholder='Search by name, label, address, description, ...' />
      </div>
      <div className='flex justify-end items-center gap-2'>
        <input className='hidden' type='file' ref={inputRef} onChange={handleUpload} accept='.json' />
        <SelectPicker value={valueFilter.type} onChange={val => {
          onChange({ ...valueFilter, type: val });
        }} placeholder='Select type of location' data={typesLocation} style={{ width: 224 }} />
        <Button
          onClick={() => {
            inputRef.current.value = '';
            inputRef.current.click();
          }}
          startIcon={<UploadIcon />}
        >
          {isLoading && <Loader className='mr-2' />}
          Upload by json
        </Button>
        <DownloadTemplateBtn keys={['name', 'label', 'longitude', 'latitude', 'lstImgs', 'address', 'description', 'type']} />
        <ReadFileExcelBtn
        isLoading={isLoading}
          onResult={(data) => {
            onCreate({ locations: data });
          }}
        />
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

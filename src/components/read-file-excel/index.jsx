import { useRef } from 'react';
import { Button } from 'rsuite';
import * as XLSX from 'xlsx';
import UploadIcon from '../../assets/svg/upload-icon';

export const readExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      resolve(json);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsArrayBuffer(file);
  });
};

function ReadFileExcelBtn({ onResult , isLoading}) {
  const file = useRef(null);
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const jsonData = await readExcelFile(file);
        onResult(jsonData);
      } catch (error) {
        console.error('Error reading Excel file:', error);
      }
    }
    file.current.value = '';
  };
  return (
    <>
      <input className='hidden' type='file' ref={file} accept='.xlsx, .xls' onChange={handleFileChange} />
      <Button
      isLoading={isLoading}
        onClick={() => {
          if (file) {
            file.current.value = '';
          }
          file?.current?.click();
        }}
        startIcon={<UploadIcon />}
      >
        Upload by excel
      </Button>
    </>
  );
}

export default ReadFileExcelBtn;

import React from 'react';
import { Button } from '@mui/material';
import { Button as RsuiteButton, ButtonToolbar } from 'rsuite';
import useFoodCreateFile from '../../../../service/hooks/admin/useFoodCreateFile';

function FoodCreate() {
  const [foodDataFile, setFoodDataFile] = React.useState('');
  const [filePath, setFilePath] = React.useState('');
  const mutation = useFoodCreateFile();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setFilePath(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === 'string') {
        setFoodDataFile(text);
      }
    };
    reader.readAsText(file);
  };

  const handleCreate = () => {
    if (foodDataFile.length !== 0) {
      console.log('test', mutation);
      mutation.mutate({ foodDataFile });
      setFoodDataFile('');
      setFilePath('');
    }
  };

  return (
    <div className='mb-3'>
      <Button variant='contained' component='label'>
        Upload File
        <input type='file' hidden onChange={(e) => handleUpload(e)} />
      </Button>
      <div className='show-file mt-3'>
        {filePath ? (
          <ButtonToolbar className='border p-3 rounded-md'>
            {filePath}
            <RsuiteButton appearance='primary' onClick={() => handleCreate()}>
              Create
            </RsuiteButton>
          </ButtonToolbar>
        ) : (
          'No file selected'
        )}
      </div>
    </div>
  );
}

export default FoodCreate;

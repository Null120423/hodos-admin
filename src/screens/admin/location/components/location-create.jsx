import React from 'react';
import { Button } from '@mui/material';
import { Button as RsuiteButton, ButtonToolbar } from 'rsuite';
import useFoodCreateFile from '../../../../service/hooks/admin/useFoodCreateFile';

function LocationCreate() {
  const [locationDataFile, setLocationDataFile] = React.useState('');
  const [filePath, setFilePath] = React.useState('');
  const [fileKey, setFileKey] = React.useState(Date.now());
  const mutation = useFoodCreateFile();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFilePath(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        setLocationDataFile(text);
      }
    };
    reader.readAsText(file);
  };

  const handleCreate = () => {
    if (locationDataFile.length !== 0) {
      mutation.mutate(locationDataFile);
      setLocationDataFile('');
      setFilePath('');
      setFileKey(Date.now());
    }
  };

  return (
    <div className='mb-3'>
      <Button variant='contained' component='label'>
        Upload File
        <input key={fileKey} type='file' hidden onChange={handleUpload} />
      </Button>
      <div className='show-file mt-3'>
        {filePath ? (
          <ButtonToolbar className='border p-3 rounded-md'>
            {filePath}
            <RsuiteButton appearance='primary' onClick={handleCreate}>
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

export default LocationCreate;

import React, { useState } from 'react';
import { Button, ButtonToolbar, Form, Input, Loader, Schema, Uploader } from 'rsuite';
import { useModal } from '../../../../contexts/modal.context';
import useCreateLocation from '../../../../service/hooks/admin/location/useCreate';

const Textarea = React.forwardRef((props, ref) => <Input {...props} as='textarea' ref={ref} />);

const model = Schema.Model({
  name: Schema.Types.StringType().isRequired('Name is required'),
  label: Schema.Types.StringType().isRequired('Label is required'),
  address: Schema.Types.StringType().isRequired('Address is required'),
  description: Schema.Types.StringType().isRequired('Description is required'),
  lstImgs: Schema.Types.StringType().isRequired('Images are required'),
  longitude: Schema.Types.NumberType().isRequired('Longitude is required'),
  latitude: Schema.Types.NumberType().isRequired('Latitude is required'),
});

const FormCreateLocation = () => {
  const { closeModal } = useModal();
  const [imgUrl, setImgUrl] = useState('');
  const [fileList, setFileList] = useState([]);
  const [lstImgs, setLstImgs] = useState([]);
  const { onCreate, isLoading } = useCreateLocation();

  const handleSubmit = async () => {
    const newFood = {
      ...model.data,
      lstImgs: [...lstImgs, imgUrl],
      rangePrice: [model.data.rangePriceFrom, model.data.rangePriceTo],
      coordinates: [model.data.longitude, model.data.latitude],
    };
    await onCreate(newFood);
  };

  const renderLabel = (label) => (
    <span>
      {label} <span style={{ color: 'red' }}>*</span>
    </span>
  );

  return (
    <Form className='min-w-[30rem] w-[40vw]' model={model}>
      <Form.Group controlId='name' className='w-full'>
        <Form.ControlLabel>{renderLabel('Name')}</Form.ControlLabel>
        <Form.Control name='name' className='w-full' style={{ width: '40vw' }} />
      </Form.Group>
      <Form.Group controlId='label'>
        <Form.ControlLabel>{renderLabel('Label')}</Form.ControlLabel>
        <Form.Control name='label' style={{ width: '40vw' }} />
      </Form.Group>
      <Form.Group controlId='address'>
        <Form.ControlLabel>{renderLabel('Address')}</Form.ControlLabel>
        <Form.Control name='address' style={{ width: '40vw' }} />
      </Form.Group>

      <div className='flex justify-start items-center gap-10'>
        <Form.Group controlId='longitude'>
          <Form.ControlLabel>{renderLabel('Longitude')}</Form.ControlLabel>
          <Form.Control type='number' name='longitude' style={{ width: '18vw' }} />
        </Form.Group>
        <Form.Group controlId='latitude' className='mb-5'>
          <Form.ControlLabel>{renderLabel('Latitude')}</Form.ControlLabel>
          <Form.Control type='number' name='latitude' style={{ width: '18vw' }} />
        </Form.Group>
      </div>

      <Form.Group controlId='lstImgs'>
        <Form.ControlLabel>{renderLabel('Image')}</Form.ControlLabel>
        <Uploader
          listType='picture-text'
          fileList={fileList}
          onSuccess={(res) => {
            setLstImgs([...lstImgs, res.url]);
          }}
          onChange={setFileList}
          action='https://hodos-hackathon.genny.id.vn/common/upload-image'
        >
          <Button>Select files...</Button>
        </Uploader>
        <Form.ControlLabel>or</Form.ControlLabel>
        <Form.Control
          name='imgUrl'
          placeholder='Enter image URL'
          value={imgUrl}
          onChange={setImgUrl}
          style={{ width: '40vw' }}
        />
      </Form.Group>
      <Form.Group controlId='description' className='w-full'>
        <Form.ControlLabel>{renderLabel('Description')}</Form.ControlLabel>
        <Form.Control rows={5} name='description' accepter={Textarea} style={{ width: '40vw' }} />
      </Form.Group>
      <ButtonToolbar>
        <Button disabled={isLoading} onClick={handleSubmit} appearance='primary' type='submit'>
          {isLoading && <Loader className='mr-2' />}
          Create
        </Button>
        <Button appearance='default' onClick={() => closeModal()}>
          Cancel
        </Button>
      </ButtonToolbar>
    </Form>
  );
};

export default FormCreateLocation;

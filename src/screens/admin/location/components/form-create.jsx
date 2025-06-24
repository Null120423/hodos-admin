import React, { useState } from 'react';
import { Button, ButtonToolbar, Form, Input, Loader, Schema, Uploader } from 'rsuite';
import { useModal } from '../../../../contexts/modal.context';
import useCreateLocation from '../../../../service/hooks/admin/location/useCreate';
import useUpdateLocation from '../../../../service/hooks/admin/location/useUpdate';

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

const FormCreateLocation = ({data}) => {
  const { closeModal } = useModal();
  const [imgUrl, setImgUrl] = useState('');
  const [fileList, setFileList] = useState(data?.lstImgs ? data?.lstImgs?.split(",")?.map( (img, index) => {
    return {
    name: img,
    fileKey:index+1,
    url: img
  } }) : []);
  const [lstImgs, setLstImgs] = useState(data?.lstImgs ? data?.lstImgs?.split(',') : []);
  const { onCreate, isLoading } = useCreateLocation();
  const { onUpdate, isLoading: isLoadingUpdate } = useUpdateLocation();

  const handleSubmit = async () => {
    const newLocation = {
      ...model.data,
      lstImgs: [...lstImgs, imgUrl],
      rangePrice: [model.data.rangePriceFrom, model.data.rangePriceTo],
      coordinates: [model.data.longitude, model.data.latitude],
      longitude: model.data.longitude?.toString(),
      latitude: model.data.latitude?.toString(),  
    };

    if(data) {
      await onUpdate({ ...newLocation, id: data.id });
    }else {
    await onCreate(newLocation);
    }
  };

  const renderLabel = (label) => (
    <span>
      {label} <span style={{ color: 'red' }}>*</span>
    </span>
  );
  return (
    <Form className='min-w-[30rem] w-[40vw]' model={model} formDefaultValue={{
      ...data,
      longitude: +data?.coordinates?.split(',')?.[0],
      latitude: +data?.coordinates?.split(',')?.[1],
    }}>
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
          multiple
          onChange={setFileList}
          action='https://hodos-api.genny.id.vn/common/upload-image'
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
        <Button disabled={isLoading || isLoadingUpdate} onClick={handleSubmit} appearance='primary' type='submit'>
          {(isLoading||isLoadingUpdate) && <Loader className='mr-2' />}
        {data ? 'Update' :   'Create'}
        </Button>
        <Button appearance='default' onClick={() => closeModal()}>
          Cancel
        </Button>
      </ButtonToolbar>
    </Form>
  );
};

export default FormCreateLocation;

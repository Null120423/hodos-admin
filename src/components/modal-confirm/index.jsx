import { Button, ButtonToolbar, Notification, useToaster } from 'rsuite';

function ModalConfirm({  subTitle, onConfirm }) {
  const toaster = useToaster();
  return (
    <div>
        <Notification type={'info'} header={`${'Confirm remove this record!'}!`} >
      <p> {subTitle || 'Are you sure you want to delete this item?'}</p>
      <hr />

      <div className='mt-2'></div>
      <ButtonToolbar>
        <Button appearance="primary" onClick={async ()=> {
          await onConfirm();
          toaster.clear();
        }}>Ok</Button>
        <Button appearance="default" onClick={()=> {
          toaster.clear();
        }}>Cancel</Button>
      </ButtonToolbar>
    </Notification>
    </div>
  );
}

export default ModalConfirm;

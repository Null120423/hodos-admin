import { Button, ButtonToolbar, Message } from "rsuite";
import { useModal } from "../../contexts/modal.context";

function ModalConfirm({ title, subTitle, onConfirm, onCancel }) {
    const {closeModal} = useModal()
  return (
   <div>
    <Message showIcon type="warning" header={title}>
      {subTitle}
      <hr />
    </Message>
    <ButtonToolbar className="mt-10 flex justify-end items-center">
        <Button size="lg" appearance="primary" onClick={onConfirm}>Confirm</Button>
        <Button size="lg" color="red" appearance="ghost" onClick={()=> {closeModal()
        onCancel()}}>Cancel</Button>
      </ButtonToolbar></div>
  );
}

export default ModalConfirm;
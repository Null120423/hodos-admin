import TrashIcon from '@rsuite/icons/Trash';
import { useEffect } from 'react';
import { IconButton, Placeholder, Table, Tooltip, Whisper } from 'rsuite';
import ModalConfirm from '../../../../components/modal-confirm';
import { useLoading } from '../../../../contexts/loading-global';
import { useModal } from '../../../../contexts/modal.context';
import useSoftRemoveFood from '../../../../service/hooks/admin/food/useSoftRemove';
import { DetailItem } from '../../dashboard/components/lst-item';
const { Column, HeaderCell, Cell } = Table;

const ImageCell = ({ rowData, ...props }) => (
  <Cell {...props} style={{ padding: 10, display: 'flex', justifyItems: 'center', alignItems: 'center' }}>
    <img src={rowData.img} width='80' className='rounded-md' />
  </Cell>
);

const ActionCell = ({ ...props }) => {
  const { openModal } = useModal();
  const { startLoading, stopLoading } = useLoading();
  const { onRemove, isLoading } = useSoftRemoveFood();
  const handleRemove = (id) => {
    openModal(
      <ModalConfirm
        title={''}
        subTitle={'Do you confirm remove this record!'}
        onConfirm={async () => {
          await onRemove({
            id,
          });
        }}
      />,
      'Confirm',
    );
  };

  useEffect(() => {
    if (isLoading) {
      startLoading();
    } else {
      stopLoading();
    }
  }, [isLoading]);
  return (
    <Cell
      {...props}
      className='link-group'
      style={{
        display: 'flex',
        justifyItems: 'center',
        alignItems: 'center',
      }}
    >
      <div className='flex gap-2 flex-wrap'>
        <Whisper placement='top' trigger='hover' speaker={<Tooltip>Remove this food</Tooltip>}>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleRemove(props.rowData.id);
            }}
            color='red'
            appearance='primary'
            icon={<TrashIcon />}
          />
        </Whisper>
      </div>
    </Cell>
  );
};

const loaderContainerStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  background: 'var(--rs-bg-card)',
  padding: 20,
  zIndex: 1,
};
const FoodTable = ({ isLoading, data, take = 5 }) => {
  const { openModal } = useModal();

  const renderLoading = () => {
    return (
      <div style={loaderContainerStyle}>
        <Placeholder.Grid rows={9} columns={4} active />
      </div>
    );
  };

  return (
    <Table
      onRowClick={(data) => {
        openModal(<DetailItem item={data} />, 'Food Detail [' + data?.name + ']');
      }}
      height={100 * take}
      autoHeight={true}
      data={data}
      rowHeight={100}
      renderLoading={renderLoading}
      loading={isLoading}
    >
      <Column align='center'>
        <HeaderCell>Thumbnail</HeaderCell>
        <ImageCell dataKey='img' />
      </Column>
      <Column>
        <HeaderCell>Name</HeaderCell>
        <Cell
          style={{
            display: 'flex',
            justifyItems: 'center',
            alignItems: 'center',
          }}
          dataKey='name'
        />
      </Column>

      <Column flexGrow={2}>
        <HeaderCell>Description</HeaderCell>
        <Cell
          style={{
            display: 'flex',
            justifyItems: 'center',
            alignItems: 'center',
          }}
          dataKey='description'
        />
      </Column>
      <Column flexGrow={2}>
        <HeaderCell>Address</HeaderCell>
        <Cell
          style={{
            display: 'flex',
            justifyItems: 'center',
            alignItems: 'center',
          }}
          dataKey='address'
        />
      </Column>
      <Column width={100}>
        <HeaderCell>Action</HeaderCell>
        <ActionCell dataKey='id' />
      </Column>
    </Table>
  );
};

export default FoodTable;

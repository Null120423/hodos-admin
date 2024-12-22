import { Placeholder, Table, Tag } from 'rsuite';
import { useModal } from '../../../../contexts/modal.context';
import ErrorLogViewDetail from './error-log-detail';

const { Column, HeaderCell, Cell } = Table;

const TagStatus = ({ rowData, ...props }) => {
  return  <Cell {...props} style={{ padding: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {
      rowData?.isFixed ? (
        <Tag color='green'>Fixed</Tag>
      ) : (
        <Tag color='orange'>Un Fixed</Tag>
      )
    }
  </Cell>
}
const loaderContainerStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  background: 'var(--rs-bg-card)',
  padding: 20,
  zIndex: 1,
};
const LocationTable = ({ isLoading, data, take = 5 }) => {
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
        openModal(<ErrorLogViewDetail data={data}/>, data?.name);
      }}
      height={100 * take}
      autoHeight={true}
      data={data}
      rowHeight={100}
      renderLoading={renderLoading}
      loading={isLoading}
    >
      <Column  flexGrow={1}>
        <HeaderCell>Name</HeaderCell>
      <Cell
       style={{
            display: 'flex',
            alignItems: 'center',
          }}
          dataKey='name'
        />
      </Column>
         <Column  flexGrow={1}>
        <HeaderCell>Project</HeaderCell>
      <Cell
       style={{
            display: 'flex',
            alignItems: 'center',
          }}
          dataKey='project'
        />
      </Column>
      <Column flexGrow={2}>
        <HeaderCell>Message</HeaderCell>
        <Cell
         style={{
            display: 'flex',
            alignItems: 'center',
          }}
          dataKey='message'
        />
      </Column>

      <Column flexGrow={2}>
        <HeaderCell>Source</HeaderCell>
        <Cell
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
          dataKey='source'
        />
      </Column>
          <Column>
        <HeaderCell>Status</HeaderCell>
        <TagStatus dataKey='isFixed' />
      </Column>
    </Table>
  );
};

export default LocationTable;

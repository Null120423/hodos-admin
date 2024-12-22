import { Placeholder, Table, Tag } from 'rsuite';
import { useModal } from '../../../../contexts/modal.context';
import BuildLogDetailView from './build-log-detail';

const { Column, HeaderCell, Cell } = Table;

const TagStatus = ({ rowData, ...props }) => {
  return  <Cell {...props} style={{ padding: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {
      rowData?.message?.includes('completed') ? (
        <Tag color='green'>Completed</Tag>
      ) : (
        <Tag color='orange'>In Progress</Tag>
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
        openModal(<BuildLogDetailView data={data}/>, data?.title);
      }}
      height={100 * take}
      autoHeight={true}
      data={data}
      rowHeight={100}
      renderLoading={renderLoading}
      loading={isLoading}
    >
      <Column  flexGrow={1}>
        <HeaderCell>Title</HeaderCell>
      <Cell
       style={{
            display: 'flex',
            alignItems: 'center',
          }}
          dataKey='title'
        />
      </Column>
      <Column flexGrow={3}>
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
        <HeaderCell>Github build link</HeaderCell>
        <Cell
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
          dataKey='githubBuildLink'
        />
      </Column>
          <Column>
        <HeaderCell>Status</HeaderCell>
        <TagStatus dataKey='message' />
      </Column>
    </Table>
  );
};

export default LocationTable;

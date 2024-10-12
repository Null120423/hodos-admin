import MoreIcon from '@rsuite/icons/legacy/More';
import React from 'react';
import { Checkbox, IconButton, Placeholder, Table } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

const ImageCell = ({ rowData, ...props }) => (
  <Cell {...props} style={{ padding: 10, display: 'flex', justifyItems: 'center', alignItems: 'center' }}>
    <img src={rowData.img} width='80' className='rounded-md' />
  </Cell>
);

const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 0, display: 'flex', justifyItems: 'center', alignItems: 'center' }}>
    <Checkbox
      value={rowData[dataKey]}
      inline
      onChange={onChange}
      checked={checkedKeys.some((item) => item === rowData[dataKey])}
    />
  </Cell>
);

const ActionCell = ({ ...props }) => {
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
        <IconButton appearance='subtle' icon={<MoreIcon />} />
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
  const [checkedKeys, setCheckedKeys] = React.useState([]);
  let checked = false;
  let indeterminate = false;

  if (checkedKeys.length === data.length) {
    checked = true;
  } else if (checkedKeys.length === 0) {
    checked = false;
  } else if (checkedKeys.length > 0 && checkedKeys.length < data.length) {
    indeterminate = true;
  }

  const handleCheckAll = (value, checked) => {
    const keys = checked ? data.map((item) => item.id) : [];
    setCheckedKeys(keys);
  };
  const handleCheck = (value, checked) => {
    const keys = checked ? [...checkedKeys, value] : checkedKeys.filter((item) => item !== value);
    setCheckedKeys(keys);
  };

  const renderLoading = () => {
    return (
      <div style={loaderContainerStyle}>
        <Placeholder.Grid rows={9} columns={4} active />
      </div>
    );
  };

  return (
    <Table height={100 * take} autoHeight={true} data={data} rowHeight={100} renderLoading={renderLoading} loading={isLoading}>
      <Column align='center'>
        <HeaderCell style={{ padding: 0 }}>
          <div style={{ lineHeight: '40px' }}>
            <Checkbox inline checked={checked} indeterminate={indeterminate} onChange={handleCheckAll} />
          </div>
        </HeaderCell>
        <CheckCell dataKey='id' checkedKeys={checkedKeys} onChange={handleCheck} />
      </Column>
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

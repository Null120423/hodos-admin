
import React from 'react';
import { Loader, Placeholder, Table, Toggle } from 'rsuite';
import './foods.scss';

const { Column, HeaderCell, Cell } = Table;

const columns = [
    { key: 'id', label: 'ID', flexGrow: 1 },
    { key: 'name', label: 'Name', flexGrow: 2 },
    { key: 'lstImgs', label: 'Image', flexGrow: 2 },
    { key: 'rangePrice', label: 'Price', flexGrow: 1 },
    { key: 'address', label: 'Address', flexGrow: 1 },
    { key: 'description', label: 'Description', flexGrow: 2 },
];

const rows = [
    {
        id: 1,
        name: 'Spaghetti Carbonara',
        lstImgs: 'carbonara.jpg',
        rangePrice: '500000',
        address: '123 Pasta St.',
        description: 'Classic Italian pasta with creamy sauce and pancetta.'
    },
    {
        id: 2,
        name: 'Margherita Pizza',
        lstImgs: 'margherita.jpg',
        rangePrice: '300000',
        address: '456 Pizza Ave.',
        description: 'Traditional pizza with fresh tomatoes, mozzarella, and basil.'
    },
    {
        id: 3,
        name: 'Caesar Salad',
        lstImgs: 'caesar.jpg',
        rangePrice: '1000000',
        address: '789 Salad Blvd.',
        description: 'Crisp romaine lettuce with Caesar dressing, croutons, and parmesan.'
    },
    {
        id: 4,
        name: 'Beef Tacos',
        lstImgs: 'tacos.jpg',
        rangePrice: '900000',
        address: '101 Taco Lane',
        description: 'Soft corn tortillas filled with seasoned beef, lettuce, and cheese.'
    },
];

const loaderContainerStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'var(--rs-bg-card)',
    padding: 20,
    zIndex: 1
};

export default function Foods() {
    const [loading, setLoading] = React.useState(true);
    const [withPlaceholder, setWithPlaceholder] = React.useState(false);

    const renderLoading = () => {
        if (withPlaceholder) {
            return (
                <div style={loaderContainerStyle}>
                    <Placeholder.Grid rows={9} columns={4} active />
                </div>
            );
        }

        return <Loader center backdrop content="Loading..." />;
    };

    return (
        <div className='food-container'>
            <div className="header">
                <h1>Food</h1>
                <div className="action-list">
                    <div className="upload">
                        <span>Upload</span>
                        {/* <DescriptionIcon /> */}
                    </div>
                    <div className="export">
                        <span>Export</span>
                        {/* <UploadIcon /> */}
                    </div>
                    <div className="create">
                        <span>Create</span>
                        {/* <AddIcon /> */}
                    </div>
                </div>
            </div>
            <div className="content">
                <Toggle checked={loading} onChange={setLoading}>
                    Loading
                </Toggle>
                <Toggle checked={withPlaceholder} onChange={setWithPlaceholder}>
                    With Placeholder
                </Toggle>
                <hr />
                <Table loading={loading} height={400} data={rows} renderLoading={renderLoading}>
                    {columns.map(column => (
                        <Column {...column} key={column.key}>
                            <HeaderCell>{column.label}</HeaderCell>
                            <Cell dataKey={column.key} />
                        </Column>
                    ))}
                </Table>
            </div>
        </div>
    );
}
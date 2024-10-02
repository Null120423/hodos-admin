import React from 'react'
import UploadIcon from '@mui/icons-material/Upload';
import DescriptionIcon from '@mui/icons-material/Description';
import AddIcon from '@mui/icons-material/Add';
import './foods.scss';
import Table from '../table/table';
const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'lstImgs', headerName: 'Image', width: 130 },
    { field: 'rangePrice', headerName: 'Price', width: 80 },
    { field: 'address', headerName: 'Adress', width: 90 },
    { field: 'description', headerName: 'Description', width: 130 },
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

const paginationModel = { page: 0, pageSize: 5 };

export default function Foods() {
    return (
        <div className='food-container'>
            <div className="header">
                <h1>Food</h1>
                <div className="action-list">
                    <div className="upload">
                        <span>Upload</span>
                        <DescriptionIcon />
                    </div>
                    <div className="export">
                        <span>Export</span>
                        <UploadIcon />
                    </div>
                    <div className="create">
                        <span>Create</span>
                        <AddIcon />
                    </div>
                </div>
            </div>
            <div className="content">
                <Table rows={rows} columns={columns} paginationModel={paginationModel} />
            </div>

        </div>
    )
}

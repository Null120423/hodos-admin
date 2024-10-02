import React, { useEffect } from 'react'
import UploadIcon from '@mui/icons-material/Upload';
import DescriptionIcon from '@mui/icons-material/Description';
import AddIcon from '@mui/icons-material/Add';
import './foods.scss';
import Table from '../table/table';
import Dialog from '../dialog/dialogAddFood';
import DialogAction from '../dialog/dialogConfirmAction';
import DialogFile from '../dialog/dialogSelectFile';
import adminService from '../../service/adminService';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ActionButtons = ({ onEdit, onDelete }) => {
    return (
        <div>
            <IconButton onClick={onDelete}><DeleteIcon style={{ color: '#FF3334' }} /></IconButton>
            <IconButton onClick={onEdit}><EditIcon style={{ color: '#F7C836' }} /></IconButton>
        </div>
    );
};

const paginationModel = { page: 0, pageSize: 5 };
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
export default function Foods() {
    const [open, setOpen] = React.useState(false);
    const [openConfirm, setOpenConfirm] = React.useState(false);
    const [openSelectFile, setOpenSelectFile] = React.useState(false);
    const [foodDataTable, setFoodDataTable] = React.useState([]);
    const [foodId, setFoodId] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleClickOpenConfirm = (id) => {
        setFoodId(id);
        setOpenConfirm(true);
    }

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    }

    const handleClickOpenSelectFile = () => {
        setOpenSelectFile(true);
    }

    const handleCloseSelectFile = () => {
        setOpenSelectFile(false);
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 170 },
        { field: 'lstImgs', headerName: 'Image', flex: 1 },
        { field: 'rangePrice', headerName: 'Price', typeof: Number, width: 80 },
        { field: 'address', headerName: 'Address', flex: 2 },
        { field: 'description', headerName: 'Description', flex: 3 },
        {
            field: 'action', headerName: 'Action', width: 150, renderCell: (params) => (
                <ActionButtons
                    onEdit={() => console.log('edit')}
                    onDelete={() => handleClickOpenConfirm(params.row.id)}
                />
            )
        },
    ];

    const getAllFoods = async () => {
        try {
            let response = await adminService.getAllFood('all');
            if (response && response.errCode === 0) {
                processFoodData(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const processFoodData = (data) => {
        let result = data.map((item, key) => {
            return (
                {
                    id: item._id,
                    name: item.name,
                    lstImgs: item.lstImgs,
                    rangePrice: item.rangePrice,
                    address: item.address,
                    description: item.description,
                }
            )
        })
        setFoodDataTable(result);
    }

    const reloadData = async () => {
        getAllFoods();
    }

    useEffect(() => {
        getAllFoods();
    }, []);

    return (
        <div className='food-container'>
            <DialogFile open={openSelectFile} handleCloseSelectFile={handleCloseSelectFile} handleClickOpenSelectFile={handleClickOpenSelectFile} VisuallyHiddenInput={VisuallyHiddenInput} />
            <DialogAction open={openConfirm} handleCloseConfirm={handleCloseConfirm} handleClickOpenConfirm={handleClickOpenConfirm} foodId={foodId} reloadData={reloadData} />
            <Dialog open={open} handleClose={handleClose} handleClickOpen={handleClickOpen} reloadData={reloadData} />
            <div className="header">
                <h1>Food</h1>
                <div className="action-list">
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        style={{ backgroundColor: '#fff', color: '#000' }}
                        onClick={() => handleClickOpenSelectFile()}
                    >
                        Upload
                    </Button>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<DescriptionIcon />}
                        style={{ backgroundColor: '#fff', color: '#000' }}
                    >
                        Export
                        <VisuallyHiddenInput
                            type="file"
                            onChange={(event) => console.log(event.target.files)}
                        />
                    </Button>
                    <div className="create" onClick={() => handleClickOpen()}>
                        <AddIcon />
                        <span>Create</span>
                    </div>
                </div>
            </div>
            <div className="content">
                <Table rows={foodDataTable} columns={columns} paginationModel={paginationModel} />
            </div>

        </div>
    )
}

import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import adminService from '../../service/adminService';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function CustomizedDialogs({ open, handleClickOpen, handleClose, handleCreateFood, reloadData }) {
    const [Price, setPrice] = React.useState([]);
    const [pathImage, setPathImage] = React.useState([]);
    const [name, setName] = React.useState('');
    const [label, setLabel] = React.useState('');
    const [longitude, setLongitude] = React.useState('');
    const [latitude, setLatitude] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [description, setDescription] = React.useState('');


    //Get path image
    const handleGetPathImage = (e) => {
        const files = e.target.files;
        let arr = [];
        for (let i = 0; i < files.length; i++) {
            const path = URL.createObjectURL(files[i]);
            arr.push(path);

        }
        setPathImage(arr);
    }

    //Handle price
    const handleFieldChange = (event) => {
        const {
            target: { value },
        } = event;

        setPrice(typeof value === 'string' ? value.split(',') : value);
    };

    const handleSubmitCreateFood = async () => {
        const newFood = {
            name: name,
            label: label,
            coordinates: {
                type: 'Point',
                coordinates: [longitude, latitude]
            },
            lstImgs: pathImage,
            address: address,
            description: description,
            rangePrice: Price,
        }
        setName('');
        setLabel('');
        setLongitude('');
        setLatitude('');
        setAddress('');
        setDescription('');
        setPrice([]);
        setPathImage([]);
        handleClose();
        try {
            if (newFood && Object.keys(newFood).length > 0) {
                const response = await adminService.createFood(newFood);
                if (response && response.errCode === 0) {
                    reloadData();
                }
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Create food
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Box
                        component="form"
                        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
                        <TextField id="outlined-basic" label="Label" variant="outlined" value={label} onChange={(e) => setLabel(e.target.value)} />
                        <TextField id="outlined-basic" label="Longitude" variant="outlined" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
                        <TextField id="outlined-basic" label="Latitude" variant="outlined" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                        <input type="file" multiple onChange={(e) => handleGetPathImage(e)} />
                        <TextField id="outlined-basic" label="Address" variant="outlined" value={address} onChange={(e) => setAddress(e.target.value)} />
                        <TextField id="outlined-basic" label="Description" variant="outlined" value={description} onChange={(e) => setDescription(e.target.value)} />
                        <TextField
                            select
                            name="Price"
                            id="userRoles"
                            variant="outlined"
                            label="Price"
                            value={Price}
                            onChange={handleFieldChange}
                            fullWidth
                            slotProps={{
                                select: {
                                    multiple: true,
                                },
                            }}
                        >
                            <MenuItem value="30000">30000</MenuItem>
                            <MenuItem value="50000">50000</MenuItem>
                            <MenuItem value="70000">70000</MenuItem>
                        </TextField>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleSubmitCreateFood}>
                        Create
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}

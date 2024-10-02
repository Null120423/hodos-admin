import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import jsonImage from '../../assets/json-file.png';
import csvImage from '../../assets/csv.png';
import { Avatar } from '@mui/material';
import adminService from '../../service/adminService';
import DialogContent from '@mui/material/DialogContent';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function CustomizedDialogs({ open, handleCloseSelectFile, handleClickOpenSelectFile, VisuallyHiddenInput, reloadData }) {
    const [foodDataFile, setFoodDataFile] = React.useState([]);
    const [fileShow, setFileShow] = React.useState('');

    const handleSelectFile = (event) => {
        const file = event.target.files[0];
        if (file.type === 'application/json') {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = (e.target.result);
                const json = JSON.parse(text);
                setFoodDataFile(json);
                setFileShow(file.name);
            };
            reader.readAsText(file);

        }
        setFileShow('File is not supported');
    }

    const handleCreateFoodFromFile = async() => {
        try {
            if (foodDataFile.length !== 0) {
                let response = await adminService.createFoodFromFile(foodDataFile);
                console.log('Create food from file successfully', response);
                if (response && response.errCode === 0) {
                    reloadData();
                }
            }
            setFoodDataFile([]);
            setFileShow('');
            handleCloseSelectFile();
        } catch (error) {
            throw new Error(error);
        }
    }
    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={handleCloseSelectFile}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth='xs'
                fullWidth
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Select format
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseSelectFile}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<img src={jsonImage} style={{ width: '25px', height: '25px', objectFit: 'contain' }} alt='is loading...' />}
                        style={{ backgroundColor: '#fff', color: '#000' }}
                        autoFocus
                    >
                        Json
                        <VisuallyHiddenInput
                            type="file"
                            onChange={(event) => handleSelectFile(event)}
                        />
                    </Button>
                    <div className="show-file">
                        {fileShow ? fileShow : 'No file selected'}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="warning" autoFocus onClick={handleCloseSelectFile}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" autoFocus onClick={handleCreateFoodFromFile}>
                        Create
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}

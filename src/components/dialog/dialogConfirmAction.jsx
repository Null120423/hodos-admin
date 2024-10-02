import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import adminService from '../../service/adminService';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function CustomizedDialogs({ open, handleClickOpenConfirm, handleCloseConfirm, foodId, reloadData }) {
    const handleDeleteFood = async () => {
        try {
            let response = await adminService.deleteFood(foodId);
            if (response && response.errCode === 0) {
                reloadData();
            }
            handleCloseConfirm();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={handleCloseConfirm}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Delete food
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseConfirm}
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
                    Are you sure you want to delete this food? <br />
                    This action cannot be undone.
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="warning" autoFocus onClick={handleDeleteFood}>
                        Delete
                    </Button>
                    <Button variant="contained" color="primary" autoFocus onClick={handleCloseConfirm}>
                        Cancel
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}

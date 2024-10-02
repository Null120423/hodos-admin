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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function CustomizedDialogs({ open, handleCloseSelectFile, handleClickOpenSelectFile, VisuallyHiddenInput }) {
    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={handleCloseSelectFile}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth='lg'
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
                <DialogActions>
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
                            onChange={(event) => console.log(event.target.files)}
                        />
                    </Button>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<img src={csvImage} style={{ width: '25px', height: '25px', objectFit: 'contain' }} alt='is loading...' />}
                        style={{ backgroundColor: '#fff', color: '#000' }}
                        autoFocus
                    >
                        CSV
                        <VisuallyHiddenInput
                            type="file"
                            onChange={(event) => console.log(event.target.files)}
                        />
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}

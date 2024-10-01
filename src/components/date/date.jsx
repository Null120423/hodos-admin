import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import './date.scss'
import { TextField } from '@mui/material';
import { size } from 'lodash';

export default function BasicDateCalendar() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} className='dateCalendar'>
            <DateCalendar
                sx={{ backgroundColor: '#fff', borderRadius: '20px'}}
                slotProps={{ textField: { size: 'small' } }}
            />
        </LocalizationProvider>
    );
}
import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
export default function table({ rows, columns, paginationModel }) {
    return (
        <div>
            <Paper sx={{ height: 450, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                    disableColumnResize={true}
                />
            </Paper>
        </div>
    )
}

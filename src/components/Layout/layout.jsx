import React from 'react'
import Sidebar from '../sidebar/sidebar'
import Topbar from '../topbar/topbar'
import { Padding } from '@mui/icons-material'
import { layouts } from 'chart.js'
const Layout = ({ children }) => {
    return (
        <div style={style.layout}>
            <Sidebar />
            <Topbar />
            <div style={style.mainContent}>
                {children}
            </div>
        </div>
    )
}

const style = {
    mainContent: {
        padding: '0 35px',
        width: 'calc(100% - 300px)',
        marginLeft: '300px',
    },
    layout: {
        backgroundColor: '#F1F5FF',
    }
}

export default Layout
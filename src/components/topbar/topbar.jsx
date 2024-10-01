import React from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import Avatar from '../../assets/avatar.png';
import './topbar.scss';
function Topbar() {
    return (
        <div className='topbar-container'>
            <div className="search-input">
                <SearchOutlinedIcon />
                <input type="text" placeholder="Search" />
            </div>
            <div className="avatar-notification">
                <div className="notification">
                    <div className="number-notification"></div>
                    <NotificationsNoneOutlinedIcon className='bell-icon'/>
                </div>
                <div className="avatar">
                    <img src={Avatar} alt="" />
                    <p><b>Daniel Hodos</b></p>
                    <KeyboardArrowDownOutlinedIcon />
                </div>
            </div>
        </div>
    )
}

export default Topbar

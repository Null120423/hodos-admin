import React from "react";
import './sidebar.scss';
import { useNavigate } from "react-router-dom";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalDiningOutlinedIcon from '@mui/icons-material/LocalDiningOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
function Sidebar() {
    const navigate = useNavigate();
    const handleNavigate = (path) => {
        navigate(path);
    }
    return (
        <div className="sidebar-container">
            <div className="header-sidebar">
                <div className="cirlce"></div>
                <h2>Admin Hodos.</h2>
            </div>
            <div className="menu-sidebar">
                <div className=" menu menu-dashboard" onClick={() => handleNavigate('/dashboard')}>
                    <DashboardOutlinedIcon />
                    <p>Dashboard</p>
                </div>
                <div className=" menu menu-users" onClick={() => handleNavigate('/user')}>
                    <PersonOutlinedIcon />
                    <p>Users</p>
                </div>
                <div className=" menu menu-location" onClick={() => handleNavigate('/location')}>
                    <LocationOnOutlinedIcon />
                    <p>Location</p>
                </div>
                <div className=" menu menu-food" onClick={() => handleNavigate('/food')}>
                    <LocalDiningOutlinedIcon />
                    <p>Food</p>
                </div>
                <div className=" menu menu-resources" onClick={() => handleNavigate('/resources')}>
                    <ArticleOutlinedIcon />
                    <p>Resources</p>
                </div>
                <div className=" menu menu-settings" onClick={() => handleNavigate('/setting')}>
                    <SettingsOutlinedIcon />
                    <p>Settings</p>
                </div>
            </div>
        </div>
    );
}

export default Sidebar; 
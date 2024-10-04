import CogIcon from '@rsuite/icons/legacy/Cog';
import React from 'react';
import { Nav, Navbar } from 'rsuite';

const CustomNavbar = ({ onSelect, activeKey, ...props }) => {
  return (
    <Navbar {...props} className='p-4'>
      <Navbar.Brand href="#">RSUITE</Navbar.Brand>
      <Nav onSelect={onSelect} activeKey={activeKey}>
        <Nav.Item eventKey="1">Home</Nav.Item>
        <Nav.Item eventKey="2">News</Nav.Item>
        <Nav.Item eventKey="3">Products</Nav.Item>
        <Nav.Menu title="About">
          <Nav.Item eventKey="4">Company</Nav.Item>
          <Nav.Item eventKey="5">Team</Nav.Item>
          <Nav.Item eventKey="6">Contact</Nav.Item>
        </Nav.Menu>
      </Nav>
      <Nav pullRight>
        <Nav.Item icon={<CogIcon />}>Settings</Nav.Item>
      </Nav>
    </Navbar>
  );
};

const TopBar = () => {
  const [activeKey, setActiveKey] = React.useState(null);

  return (
    <>
    <div className='h-20'></div>
     <div className='fixed left-0 right-0 top-0 z-50'>
       <CustomNavbar activeKey={activeKey} onSelect={setActiveKey} />
     </div></>
  );
};

export default TopBar

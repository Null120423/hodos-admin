import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import GroupIcon from '@rsuite/icons/legacy/Group';
import React, { useEffect } from 'react';
import { redirect } from 'react-router-dom';
import { Nav, Sidenav } from 'rsuite';
import { ADMIN_ROUTES } from '../../routes/endpoint';
import { usePathname } from '../../routes/hooks/use-pathname';
import { useRouter } from '../../routes/hooks/use-router';

const SidebarItem = [
  {
    name: 'Dashboard',
    icon: <DashboardIcon />,
    key: ADMIN_ROUTES.DASHBOARD
  },
  {
    name: 'Foods',
    icon: <GroupIcon />,
    key: ADMIN_ROUTES.FOOD_MANAGER
  },
  {
    name: 'Locations',
    icon: <GroupIcon />,
    key: ADMIN_ROUTES.LOCATION_MANAGER
  },
  {
    name: 'Settings',
    icon: <GearCircleIcon />,
    key: ADMIN_ROUTES.SETTING,
    subMenu: [
      {
        name: 'Application',
        key: ADMIN_ROUTES.SETTING + '/application'
      },
      {
        name: 'Channel',
        key: ADMIN_ROUTES.SETTING + '/channel'
      },
      {
        name: 'Version',
        key: ADMIN_ROUTES.SETTING + '/version'
      },
      {
        name: 'Custom Action',
        key: ADMIN_ROUTES.SETTING + '/custom-action',
      }
    ]
  }
];

function Sidebar() {
  const [expanded, setExpanded] = React.useState(true);
  const [activeKey, setActiveKey] = React.useState('1');
  const router = useRouter()
  const pathname = usePathname();


useEffect(() => {
  switch (pathname) {
    case ADMIN_ROUTES.DASHBOARD:
      setActiveKey(ADMIN_ROUTES.DASHBOARD);
      break;
    case ADMIN_ROUTES.FOOD_MANAGER:
      setActiveKey(ADMIN_ROUTES.FOOD_MANAGER);
      break;
    case ADMIN_ROUTES.LOCATION_MANAGER:
      setActiveKey(ADMIN_ROUTES.LOCATION_MANAGER);
      break;
    case ADMIN_ROUTES.SETTING + '/application':
      setActiveKey(ADMIN_ROUTES.SETTING + '/application');
      break;
    case ADMIN_ROUTES.SETTING + '/channel':
      setActiveKey(ADMIN_ROUTES.SETTING + '/channel');
      break;
    case ADMIN_ROUTES.SETTING + '/version':
      setActiveKey(ADMIN_ROUTES.SETTING + '/version');
      break;
    case ADMIN_ROUTES.SETTING + '/custom-action':
      setActiveKey(ADMIN_ROUTES.SETTING + '/custom-action');
      break;
    default:
       setActiveKey(ADMIN_ROUTES.DASHBOARD);
      break
  }
}, [pathname])


  const renderNavItems = (items) => {
    return items.map(item => {
      if (item.subMenu) {
        return (
          <Nav.Menu
          onClick={() => {
            redirect
router.push(item.key)
          }}
            key={item.key}
            eventKey={item.key}
            title={item.name}
            icon={item.icon}
          >
            {renderNavItems(item.subMenu)}
          </Nav.Menu>
        );
      }
      return (
        <Nav.Item onClick={() => {
                router.push(item.key)
        }} key={item.key} eventKey={item.key} icon={item.icon}>
          {item.name}
        </Nav.Item>
      );
    });
  };

  return (
    <Sidenav  expanded={expanded} className='h-screen'>
      <Sidenav.Body>
        <Nav activeKey={activeKey} onSelect={setActiveKey}>
          {renderNavItems(SidebarItem)}
        </Nav>
      </Sidenav.Body>
      <Sidenav.Toggle onToggle={expanded => setExpanded(expanded)} />
    </Sidenav>
  );
}

export default Sidebar;
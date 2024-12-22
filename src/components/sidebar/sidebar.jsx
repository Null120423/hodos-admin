import CodeIcon from '@rsuite/icons/Code';
import GearIcon from '@rsuite/icons/Gear';
import GridIcon from '@rsuite/icons/Grid';
import LocationIcon from '@rsuite/icons/Location';
import TextImageIcon from '@rsuite/icons/TextImage';
import WarningRoundIcon from '@rsuite/icons/WarningRound';
import React, { Fragment, useEffect } from 'react';
import { Nav, Sidenav } from 'rsuite';
import { useSidebar } from '../../contexts/sidebar.context';
import { ADMIN_ROUTES } from '../../routes/endpoint';
import { usePathname } from '../../routes/hooks/use-pathname';
import { useRouter } from '../../routes/hooks/use-router';
export const SIDEBAR_WIDTH = '20rem';

const SidebarItem = [
  {
    name: 'Dashboard',
    icon: <GridIcon />,
    key: ADMIN_ROUTES.DASHBOARD,
  },
  {
    name: 'Locations',
    icon: <LocationIcon />,
    key: ADMIN_ROUTES.LOCATION_MANAGER,
  },
  {
    name: 'Blogs',
    icon: <TextImageIcon />,
    key: ADMIN_ROUTES.BLOG_MANAGER,
  },
];

const SettingSidebarItem = [
  {
    name: 'Settings',
    icon: <GearIcon />,
    key: ADMIN_ROUTES.SETTING,
    subMenu: [
      {
        name: 'Overview',
        key: ADMIN_ROUTES.SETTING,
      },
      {
        name: 'Access control',
        key: ADMIN_ROUTES.SETTING + '/access-control',
      },
    ],
  },
];

const LogSidebars = [
  {
    name: 'Build logs',
    icon: <CodeIcon />,
    key: ADMIN_ROUTES.BUILD_LOGS,
  },
   {
    name: 'Bug logs',
    icon: <WarningRoundIcon />,
    key: ADMIN_ROUTES.ERROR_LOGS,
  },
];

function Sidebar() {
  const { expanded, setExpanded } = useSidebar();
  const [activeKey, setActiveKey] = React.useState('1');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    switch (pathname) {
      case ADMIN_ROUTES.DASHBOARD:
        setActiveKey(ADMIN_ROUTES.DASHBOARD);
        break;
      case ADMIN_ROUTES.LOCATION_MANAGER:
        setActiveKey(ADMIN_ROUTES.LOCATION_MANAGER);
        break;
      case ADMIN_ROUTES.SETTING:
        setActiveKey(ADMIN_ROUTES.SETTING);
        break;
      case ADMIN_ROUTES.SETTING + '/access-control':
        setActiveKey(ADMIN_ROUTES.SETTING + '/access-control');
        break;

      default:
        setActiveKey(pathname);
        break;
    }

    if(pathname.includes(ADMIN_ROUTES.BLOG_MANAGER)){
      setActiveKey(ADMIN_ROUTES.BLOG_MANAGER);
    }
  }, [pathname]);

  const renderNavItems = (items, isJustActiveText = false) => {
    return items.map((item) => {
      if (item.subMenu) {
        return (
          <Nav.Menu
            onClick={() => {
              router.push(item.key);
            }}
            key={item.key}
            eventKey={item.key}
            title={item.name}
            icon={item.icon}
          >
            {activeKey === item.key && (
              <div className='absolute left-0 top-0 h-12 w-[5px] rounded-r-md bg-blue-500'></div>
            )}
            {renderNavItems(item.subMenu, true)}
          </Nav.Menu>
        );
      }
      return (
        <Fragment key={item.key}>
          <Nav.Item
            className='w-full relative'
            onClick={(e) => {
              e.stopPropagation();
              router.push(item.key);
            }}
            eventKey={item.key}
            icon={item.icon}
          >
            {activeKey === item.key && !isJustActiveText && (
              <div className='absolute left-0 top-0 h-full w-[5px] rounded-r-md bg-blue-500'></div>
            )}
            {item.name}
          </Nav.Item>
        </Fragment>
      );
    });
  };

  return (
    <Sidenav expanded={expanded} className={`${expanded && 'shadow-xl w-[15rem]'} h-screen  `}>
      <Sidenav.Header className='min-h-20'>
        {expanded && <div className='p-4 text-center font-bold text-2xl text-pretty'>HODOS</div>}
      </Sidenav.Header>
      <Sidenav.Body>
        <h1 className={`font-semibold ${expanded ? 'text-lg pl-4 ': 'text-sm pl-2 '} mb-2`}>Generals</h1>
        <Nav activeKey={activeKey} >{renderNavItems(SidebarItem)}</Nav>
         <h1 className={`font-semibold ${expanded ? 'text-lg pl-4 ': 'text-sm pl-2 '} mb-2`}>Logs</h1>
        <Nav activeKey={activeKey} >{renderNavItems(LogSidebars)}</Nav>
        <h1 className={`font-semibold ${expanded ? 'text-lg pl-4 ': 'text-sm pl-2 '} mb-2`}>Settings</h1>
        <Nav activeKey={activeKey} >{renderNavItems(SettingSidebarItem)}</Nav>
      </Sidenav.Body>
      <Sidenav.Toggle onToggle={() => setExpanded(!expanded)} />
    </Sidenav>
  );
}

export default Sidebar;

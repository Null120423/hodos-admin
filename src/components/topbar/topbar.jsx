import SearchIcon from '@rsuite/icons/Search';
import React, { Fragment } from 'react';
import { Avatar, Button, Popover, Whisper } from 'rsuite';
import BellIcon from '../../assets/svg/bell-icon';
import CmdIcon from '../../assets/svg/cmd-icon';
import SettingIcon from '../../assets/svg/setting-icon';
import { useAuth } from '../../contexts/auth.context';

const USER_MENU = [
  {
    name: 'Profile',
    icon: <Avatar src='https://i.pravatar.cc/150?u=2' circle />,
    key: 'profile',
  },
  {
    name: 'Setting',
    icon: <SettingIcon />,
    key: 'setting',
  },
  {
    name: 'Notification',
    icon: <BellIcon />,
    key: 'notification',
  },
  {
    name: 'Logout',
    icon: <CmdIcon />,
    key: 'logout',
  },
];

const PopoverWithLoader = React.forwardRef((props, ref) => {
  const {logout} = useAuth()
  return (
    <Popover ref={ref} {...props}>
      <div className='flex flex-col'>
        {USER_MENU.map((item, index) => {
          return (
            <Fragment key={index}>
              {index === 1 && <div className='mb-2 border-b mt-2 border-black/10'></div>}
              <div
              onClick={index === USER_MENU.length - 1 ? logout : () => {}}
                className={`max-h-[3rem] pl-2  flex rounded-lg cursor-pointer hover:bg-black/10 justify-start items-center gap-2 w-full min-w-[10rem] text-left`}
              >
                {item.icon}
                <h1 className='text-md'>{item.name}</h1>
              </div>
              {index === USER_MENU.length - 2 && <div className='border-b mt-2 mb-2 border-black/10'></div>}
            </Fragment>
          );
        })}
      </div>
    </Popover>
  );
});

const TopBar = () => {
  return (
    <>
      <div
        className={`sticky shadow-md w-full rounded-lg left-0 flex justify-between items-center right-0 top-0 z-50 p-6 bg-white/10 backdrop-blur-3xl `}
      >
        <h1 className='text-2xl font-bold'>Overview</h1>
        <div className='flex justify-end items-center gap-2'>
          <Button className='h-[2.3rem] p-2'>
            <div className='flex items-center h-full justify-center gap-2'>
              <SearchIcon />
              <div className='bg-white h-[1.6rem] p-1 rounded-lg flex justify-center items-center gap-[2px]'>
                <CmdIcon />
                <h1>K</h1>
              </div>
            </div>
          </Button>
          <Button>
            <SettingIcon />
          </Button>
          <Button>
            <BellIcon />
          </Button>

          <Whisper
            trigger='click'
            placement={'autoVerticalEnd'}
            controlId={`control-id-autoVerticalEnd`}
            speaker={<PopoverWithLoader />}
          >
            <Button appearance='subtle' className='p-0 rounded-full'>
              <Avatar src='https://i.pravatar.cc/150?u=2' circle />
            </Button>
          </Whisper>
        </div>
      </div>
    </>
  );
};

export default TopBar;

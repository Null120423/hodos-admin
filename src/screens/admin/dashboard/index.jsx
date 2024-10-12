import { useEffect, useState } from 'react';
import { Tabs } from 'rsuite';
import FoodDashboardIcon from '../../../assets/svg/foods-dashboard-icon';
import LocationDashboardIcon from '../../../assets/svg/location-dashboard-icon';
import ImageGif from '../../../assets/welcome_animated.gif';
import { useLoading } from '../../../contexts/loading-global';
import useDashBoardData from '../../../service/hooks/admin/dahsboard/useDashboardData';
import LstItem from './components/lst-item';
import './dashboard.scss';

function DashboardScreen() {
  const { startLoading, stopLoading } = useLoading();
  const { data, isLoading } = useDashBoardData();

  useEffect(() => {
    if (isLoading) {
      startLoading();
    } else {
      stopLoading();
    }
  }, [isLoading, startLoading, stopLoading]);

  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    setDashboardData([
      {
        name: 'Foods',
        total: data?.foodData?.total,
        icon: <FoodDashboardIcon />,
      },
      {
        name: 'Locations',
        total: data?.locationData?.total,
        icon: <LocationDashboardIcon />,
      },
    ]);
  }, [data]);
  return (
        <div className='home-container w-full mt-20'>
      <div className='content'>
        <div className='home-main'>
          <div className='welcome'>
            <div className='information'>
              <h2 className='text-3xl font-extrabold'>
                Welcome back, <span className='text-animated'>Daniel Hodos... </span>
              </h2>
              <p>Here you can manage all your data and make changes to the website</p>
            </div>
            <img src={ImageGif} alt='Loading...' />
          </div>
          <div className='flex gap-10 justify-start items-center mt-5 mb-5 p-4'>
            {dashboardData?.map((item, index) => {
              return (
                <div
                  key={index}
                  className='hover:bg-white/50 cursor-pointer hover:shadow-2xl transition-all flex items-center justify-center gap-4 p-4 rounded-2xl bg-white backdrop-blur-md w-[14rem]'
                >
                  <div className='card-icon'>{item.icon}</div>
                  <div className='card-info'>
                    <h1 className='text-xl text-black/50'>{item.name}</h1>
                    <h2 className='text-3xl font-extrabold'>{item.total}</h2>
                  </div>
                </div>
              );
            })}
          </div>
          <Tabs defaultActiveKey='1' appearance='pills'>
            <Tabs.Tab eventKey='1' title='Foods'>
              <LstItem data={data?.foodData?.lst} />
            </Tabs.Tab>
            <Tabs.Tab eventKey='2' title='Locations'>
              <LstItem data={data?.locationData?.lst} />
            </Tabs.Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default DashboardScreen;

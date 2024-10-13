import { Navigate } from 'react-router-dom';
import Sidebar from '../components/sidebar/sidebar';
import TopBar from '../components/topbar/topbar';
import { useAuth } from '../contexts/auth.context';
import { AUTH_ROUTES } from '../routes/endpoint';

const DashboardLayout = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to={AUTH_ROUTES.LOGIN} />;
  }
  return (
    <div className='h-screen w-screen overflow-hidden bg-[#F5F7FA] '>
      <div className='flex w-full'>
        <div className='flex flex-col '>
          <Sidebar />
        </div>
        <div className='relative h-screen overflow-x-hidden overflow-y-auto w-full p-4 '>
          <TopBar />
          <div className='w-full mt-10'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

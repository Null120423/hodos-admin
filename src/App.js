// import { ToastContainer } from 'react-toastify';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './containers/dashboard/dashboard';
import Food from './containers/food/food';
import Location from './containers/location/location';
import Resources from './containers/resources/resources';
import Setting from './containers/setting/setting';
import User from './containers/user/user';
import './App.scss';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/food" element={<Food />} />
          <Route path="/user" element={<User />} />
          <Route path="/location" element={<Location />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </Router> 
    </>
  );
}

export default App;

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import 'rsuite/dist/rsuite.min.css';
import DashboardScreen from "./screens/admin/dashboard/dashboard";


function App() {
  return (
     <Router>
        <Routes>
          <Route path="/" element={<DashboardScreen/>} />
          {/* <Route path="/login" element={<LoginScreen />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/food" element={<Food />} />
          <Route path="/user" element={<User />} />
          <Route path="/location" element={<Location />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/setting" element={<Setting />} /> */}
        </Routes>
      </Router>
  )
}
export default App


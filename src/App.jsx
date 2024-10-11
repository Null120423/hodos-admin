import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import 'rsuite/dist/rsuite.min.css';
import { ADMIN_ROUTES, AUTH_ROUTES } from "./routes/endpoint";
import DashboardScreen from "./screens/admin/dashboard/index.";
import FoodScreen from "./screens/admin/food";
import LocationScreen from "./screens/admin/location";
import SettingScreen from "./screens/admin/setting";
import LoginScreen from "./screens/auth/login";
import { QueryClientProvider } from "react-query";
import { QueryClient } from "@tanstack/react-query";

/// define auth routes in here
/// define public routes in here
/// define private routes in here 
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path={AUTH_ROUTES.LOGIN} element={<LoginScreen />} />
          <Route path={'/'} element={<DashboardScreen />} />
          <Route path={ADMIN_ROUTES.SETTING} element={<SettingScreen />} />
          <Route path={ADMIN_ROUTES.FOOD_MANAGER} element={<FoodScreen />} />
          <Route path={ADMIN_ROUTES.LOCATION_MANAGER} element={<LocationScreen />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}
export default App


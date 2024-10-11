import MainLayout from '../../../layouts/layout';
import LocationTableManagement from './components/location-table';
import LocationCreate from './components/location-create';
const LocationScreen = () => {
  return (
    <MainLayout>
      <LocationCreate />
      <LocationTableManagement />
    </MainLayout>
  );
};
export default LocationScreen;

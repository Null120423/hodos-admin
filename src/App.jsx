import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'rsuite/dist/rsuite.min.css';
import LoadingView from './components/loading-view';
import { AppRouter } from './routes';
/// define auth routes in here
/// define public routes in here
/// define private routes in here

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingView />}>
        <AppRouter />
      </Suspense>
    </BrowserRouter>
  );
}
export default App;

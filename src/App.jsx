import Cookies from 'js-cookie';
import { Suspense, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'rsuite/dist/rsuite.min.css';
import LoadingView from './components/loading-view';
import { useAuth } from './contexts/auth.context';
import { AppRouter } from './routes';


function App() {
  const {login} = useAuth()

  useEffect(() => {
    const user = Cookies.get('user')
    if(user) {
      login(user)
      // setUser(JSON.parse(user))
    }
  },[])
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingView />}>
        <AppRouter />
      </Suspense>
    </BrowserRouter>
  );
}
export default App;

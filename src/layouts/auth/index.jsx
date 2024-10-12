import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth.context';
import { ADMIN_ROUTES } from '../../routes/endpoint';

function AuthLayout({ children }) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={ADMIN_ROUTES.DASHBOARD} />;
  }

  return children;
}

export default AuthLayout;
